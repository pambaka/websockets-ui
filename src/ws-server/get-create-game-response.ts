import { RESPONSE_TYPE } from "../const";
import { WsResponse } from "../types";

const getCreateGameResponse = (idGame: string, idPlayer: number) => {
    const response: WsResponse = {
        type: RESPONSE_TYPE.createGame,
        data: JSON.stringify({ idGame, idPlayer }),
        id: 0,
    };

    return response;
};

export default getCreateGameResponse;
