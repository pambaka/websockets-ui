import { RESPONSE_TYPE } from "../const";
import { WsResponse } from "../types";
import Winners from "../winners";
import { wsConnections } from "./data";

const broadcastUpdateWinnersResponse = () => {
    const response: WsResponse = {
        type: RESPONSE_TYPE.updataWinners,
        data: JSON.stringify(Winners.table),
        id: 0,
    };

    wsConnections.forEach((connection) => connection.ws.send(JSON.stringify(response)));
};

export default broadcastUpdateWinnersResponse;
