import { RESPONSE_TYPE } from "../const";
import Games from "../games";
import { WsResponse } from "../types";
import sendResponseToGamePlayers from "./send-response-to-game-players";

const sendTurnResponse = (gameId: string) => {
    const turn = Games.getTurn(gameId);

    const response: WsResponse = {
        type: RESPONSE_TYPE.turn,
        data: JSON.stringify({ currentPlayer: turn }),
        id: 0,
    };

    sendResponseToGamePlayers(gameId, response);
};

export default sendTurnResponse;
