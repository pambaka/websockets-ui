import { RESPONSE_TYPE } from "../const";
import { PlayerId, WsResponse } from "../types";

const getFinishGameResponse = (winnerId: PlayerId) => {
    const response: WsResponse = {
        type: RESPONSE_TYPE.finishGame,
        data: JSON.stringify({ winPlayer: winnerId }),
        id: 0,
    };

    return response;
};

export default getFinishGameResponse;
