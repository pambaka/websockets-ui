import { RESPONSE_TYPE } from "../const";
import Rooms from "../rooms";
import { WsResponse } from "../types";
import { wsConnections } from "./data";

const broadcastUpdateRoomResponse = () => {
    const response: WsResponse = {
        type: RESPONSE_TYPE.updateRoom,
        data: JSON.stringify(Rooms.availableRooms),
        id: 0,
    };

    wsConnections.forEach((connection) => connection.ws.send(JSON.stringify(response)));
};

export default broadcastUpdateRoomResponse;
