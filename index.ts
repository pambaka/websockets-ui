import { WebSocket, WebSocketServer } from "ws";
import { httpServer } from "./src/http_server/index";
import { User, WsMessage } from "./src/types";
import { MESSAGE_TYPE } from "./src/const";
import getRegResponse from "./src/ws-server/get-reg-response";
import Users from "./src/users";

const HTTP_PORT = 8181;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

const WS_PORT = 3000;

const wsServer = new WebSocketServer({ port: WS_PORT });
wsServer.on("connection", (ws: WebSocket) => {
    ws.on("message", (msg) => {
        try {
            const request: WsMessage = JSON.parse(msg.toString());

            let response: WsMessage | undefined;

            switch (request.type) {
                case MESSAGE_TYPE.reg:
                    const { name, password }: { name: User["name"]; password: User["password"] } = JSON.parse(
                        request.data,
                    );

                    const index = Users.getUserIndex(name);
                    if (index === -1) Users.add({ name, password });

                    response = getRegResponse(request);
                    break;
                default:
                    break;
            }

            ws.send(JSON.stringify(response));
        } catch (error) {
            if (error instanceof Error) console.error(error.message);
        }
    });
});
