import { httpServer } from "./src/http_server/index";
import runWsServer from "./src/ws-server/run-ws-server";

const HTTP_PORT = 8181;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

const WS_PORT = 3000;

runWsServer(WS_PORT);
