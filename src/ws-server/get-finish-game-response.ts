import { RESPONSE_TYPE } from "../const";
import { RoomUser } from "../types";

const getFinishGameResponse = (winner: RoomUser) => {
    const response = {
        type: RESPONSE_TYPE.finishGame,
        data: JSON.stringify({ winPlayer: winner.index }),
        id: 0,
    };

    return response;
};

export default getFinishGameResponse;
