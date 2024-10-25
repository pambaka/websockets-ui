import WebSocket, { WebSocketServer } from "ws";
import { WsRequest } from "../types";
import { REQUEST_TYPE } from "../const";
import getResponse from "./get-response";
import crypto from "node:crypto";

const wsConnectionUsers: { connectionId: string; name: string }[] = [];

const runWsServer = (port: number) => {
    const wsServer = new WebSocketServer({ port });

    wsServer.on("connection", (ws: WebSocket) => {
        const connectionId = crypto.randomUUID();

        ws.on("message", (msg) => {
            try {
                const request: WsRequest = JSON.parse(msg.toString());

                if (request.type === REQUEST_TYPE.reg) {
                    wsConnectionUsers.push({ connectionId, name: JSON.parse(request.data).name });
                }

                const index = wsConnectionUsers.map((entry) => entry.connectionId).indexOf(connectionId);
                const name = wsConnectionUsers[index].name;

                let response = getResponse(request, name);
                if (response) ws.send(JSON.stringify(response));
            } catch (error) {
                if (error instanceof Error) console.error(error.message);
            }
        });
    });
};

export default runWsServer;
