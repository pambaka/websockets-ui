import { wsConnections } from "./data";
import getUpdateRoomResponse from "./responses/get-update-rooms-response";

const broadcastUpdateRoomResponse = () => {
    const response = getUpdateRoomResponse();

    wsConnections.forEach((connection) => connection.ws.send(JSON.stringify(response)));
};

export default broadcastUpdateRoomResponse;
