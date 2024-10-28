import { REQUEST_TYPE, RESERVED_NAME } from "../const";
import { PlayerId, WsRequest } from "../types";
import broadcastUpdateRoomResponse from "./broadcast-update-room-response";
import getRegResponse from "./get-reg-response";
import Rooms from "../rooms";
import Games from "../games";
import sendCreateGameResponse from "./send-create-game-response";
import sendStartGameResponse from "./send-start-game-response";
import sendTurnResponse from "./send-turn-response";
import { getWsEntryIndexByKey, wsConnections } from "./data";
import getUpdateRoomResponse from "./responses/get-update-rooms-response";
import handleAttack from "./handle-attack";
import getArrangedShips from "./get-arranged-ships";

const getResponse = (request: WsRequest, name?: string) => {
    try {
        const response = {
            [REQUEST_TYPE.reg]: ({ request }: { request: WsRequest }) => getRegResponse(request),
            [REQUEST_TYPE.createRoom]: ({ name = "" }: { name?: string }) => {
                const isRoomCreated = Rooms.createRoom(name);
                if (isRoomCreated) broadcastUpdateRoomResponse();
                else {
                    const index = getWsEntryIndexByKey("userName", name);
                    const response = getUpdateRoomResponse();
                    wsConnections[index].ws.send(JSON.stringify(response));
                }
            },
            [REQUEST_TYPE.addUserToRoom]: ({ request, name = "" }: { request: WsRequest; name?: string }) => {
                const roomId: string = JSON.parse(request.data).indexRoom;
                const roomUsers = Rooms.addUserToRoom(roomId, name);
                broadcastUpdateRoomResponse();
                if (roomUsers?.length === 2) {
                    const index = Games.createGame([roomUsers[0], roomUsers[1]]);
                    sendCreateGameResponse(index);
                }
            },
            [REQUEST_TYPE.addShips]: ({ request }: { request: WsRequest }) => {
                const data = JSON.parse(request.data);
                const { gameId, ships, indexPlayer: playerId } = data;

                if (Games.shouldStart(gameId, ships, playerId)) {
                    sendStartGameResponse(gameId);
                    Games.setTurn(gameId);
                    sendTurnResponse(gameId);
                }
            },
            [REQUEST_TYPE.attack]: ({ request }: { request: WsRequest }) => {
                const data = JSON.parse(request.data);
                const { gameId, x, y, indexPlayer }: { gameId: string; x: number; y: number; indexPlayer: PlayerId } =
                    data;

                if (data.indexPlayer !== Games.getTurn(gameId)) return;

                handleAttack(gameId, indexPlayer, x, y);
            },
            [REQUEST_TYPE.randomAttack]: ({ request }: { request: WsRequest }) => {
                const { gameId, indexPlayer } = JSON.parse(request.data);

                let x: number = 0;
                let y: number = 0;

                const players = Games.getGamePlayers(gameId);
                const opponentField = players[+!indexPlayer].field;

                do {
                    x = Math.floor(Math.random() * 10);
                    y = Math.floor(Math.random() * 10);
                } while (opponentField && opponentField[y][x].isAttacked);

                handleAttack(gameId, indexPlayer, x, y);
            },
            [REQUEST_TYPE.singlePlay]: ({ name = "" }: { name?: string }) => {
                const gameId = Games.createGame([
                    { name, index: 0 },
                    { name: RESERVED_NAME, index: 1 },
                ]);
                Games.shouldStart(gameId, getArrangedShips(), 1);
                sendCreateGameResponse(gameId);
            },
        };

        return response[request.type]({ request, name });
    } catch (error) {
        if (error instanceof TypeError) console.error(`${request.type} request type is not supported`);
        if (error instanceof Error) console.error(error.message);
    }
};

export default getResponse;
