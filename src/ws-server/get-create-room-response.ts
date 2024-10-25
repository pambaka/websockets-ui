import Rooms from "../rooms";
import { RESPONSE_TYPE } from "../const";
import { WsResponse } from "../types";

const getCreateRoomResponse = (name: string = "") => {
    Rooms.createRoom(name);

    const response: WsResponse = {
        type: RESPONSE_TYPE.updateRoom,
        data: JSON.stringify(Rooms.value),
        id: 0,
    };

    return response;
};

export default getCreateRoomResponse;
