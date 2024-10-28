import { PlayerId } from "../types";
import getFinishGameResponse from "./get-finish-game-response";
import sendResponseToGamePlayers from "./send-response-to-game-players";

const sendFinishGameResponse = (gameId: string, winnerId: PlayerId) => {
    const response = getFinishGameResponse(winnerId);

    sendResponseToGamePlayers(gameId, response);
};

export default sendFinishGameResponse;
