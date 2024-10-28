import WebSocket, { WebSocketServer } from "ws";
import { WsRequest } from "../types";
import { REQUEST_TYPE } from "../const";
import getResponse from "./get-response";
import crypto from "node:crypto";
import { getWsEntryIndexByKey, wsConnections } from "./data";
import broadcastUpdateRoomResponse from "./broadcast-update-room-response";
import Rooms from "../rooms";
import Games from "../games";
import getFinishGameResponse from "./get-finish-game-response";
import broadcastUpdateWinnersResponse from "./broadcast-update-winners-response";
import Winners from "../winners";

const runWsServer = (port: number) => {
    const wsServer = new WebSocketServer({ port });

    wsServer.on("connection", (ws: WebSocket) => {
        const connectionId = crypto.randomUUID();

        ws.on("message", (msg) => {
            try {
                const request: WsRequest = JSON.parse(msg.toString());

                if (request.type === REQUEST_TYPE.reg) {
                    wsConnections.push({ connectionId, userName: JSON.parse(request.data).name, ws });
                }

                const index = getWsEntryIndexByKey("connectionId", connectionId);
                const name = wsConnections[index].userName;

                let response = getResponse(request, name);
                if (response) {
                    ws.send(JSON.stringify(response));
                    if (response.type === REQUEST_TYPE.reg) {
                        broadcastUpdateRoomResponse();
                        broadcastUpdateWinnersResponse();
                    }
                }
            } catch (error) {
                if (error instanceof Error) console.error(error.message);
            }
        });

        ws.on("close", () => {
            const index = getWsEntryIndexByKey("connectionId", connectionId);
            if (index === -1) return;

            const name = wsConnections[index].userName;

            const isRemoved = Rooms.removeUserFromRooms(name);
            if (isRemoved) broadcastUpdateRoomResponse();

            const winner = Games.finishGameByName(name);

            if (winner) {
                Winners.updateTable(winner.name);
                const response = getFinishGameResponse(winner.index);
                wsConnections[getWsEntryIndexByKey("userName", winner.name)].ws.send(JSON.stringify(response));
                broadcastUpdateWinnersResponse();
            }

            wsConnections.splice(index, 1);
        });
    });
};

export default runWsServer;
