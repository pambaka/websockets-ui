import { RESPONSE_TYPE } from "../../const";
import Rooms from "../../rooms";
import { WsResponse } from "../../types";

const getUpdateRoomResponse = () => {
    const response: WsResponse = {
        type: RESPONSE_TYPE.updateRoom,
        data: JSON.stringify(Rooms.availableRooms),
        id: 0,
    };

    return response;
};

export default getUpdateRoomResponse;
