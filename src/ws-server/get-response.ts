import { REQUEST_TYPE } from "../const";
import { AttackStatus, PlayerId, WsRequest } from "../types";
import broadcastUpdateRoomResponse from "./broadcast-update-room-response";
import getRegResponse from "./get-reg-response";
import Rooms from "../rooms";
import Games from "../games";
import sendCreateGameResponse from "./send-create-game-response";
import sendStartGameResponse from "./send-start-game-response";
import sendTurnResponse from "./send-turn-response";
import sendAttackResponse from "./send-attack-response";
import Winners from "../winners";
import broadcastUpdateWinnersResponse from "./broadcast-update-winners-response";
import sendFinishGameResponse from "./send-finish-game-response";
import { getWsEntryIndexByKey, wsConnections } from "./data";
import getUpdateRoomResponse from "./responses/get-update-rooms-response";
import isShipKilled from "./utils/is-ship-killed";
import getEmptyCells from "./utils/get-empty-cells";
import sendAttackAllMissedResponse from "./responses/send-attack-all-missed-response";

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

                const players = Games.getGamePlayers(gameId);

                const opponentField = players[+!indexPlayer].field;
                if (!opponentField) return;

                let status: AttackStatus = "miss";
                // if (opponentField[y][x].isAttacked === true) {
                //     Games.changeTurn(data.gameId);
                //     sendTurnResponse(data.gameId);

                //     return;
                // }

                const cell = opponentField[y][x];

                if (cell.value === 1) {
                    if (isShipKilled(opponentField, cell)) status = "killed";
                    else status = "shot";

                    if (cell.isAttacked === false) {
                        Games.updateCorrectShotsNum(gameId, indexPlayer);
                    }
                }
                cell.isAttacked = true;

                sendAttackResponse(gameId, { x, y }, indexPlayer, status);

                if (status === "killed") {
                    const emptyCells = getEmptyCells(opponentField, x, y);
                    sendAttackAllMissedResponse(gameId, indexPlayer, emptyCells);
                } else if (status === "miss") Games.changeTurn(gameId);

                if (Games.isFinished(gameId, indexPlayer)) {
                    Winners.updateTable(players[indexPlayer].name);
                    broadcastUpdateWinnersResponse();
                    sendFinishGameResponse(gameId, indexPlayer);
                    Games.finishGame(players[indexPlayer].name);
                    return;
                }

                sendTurnResponse(gameId);
            },
        };

        return response[request.type]({ request, name });
    } catch (error) {
        if (error instanceof TypeError) console.error(`${request.type} request type is not supported`);
        else if (error instanceof Error) console.error(error.message);
    }
};

export default getResponse;
