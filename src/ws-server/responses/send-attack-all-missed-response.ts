import { RESPONSE_TYPE } from "../../const";
import { PlayerId, WsResponse } from "../../types";
import sendResponseToGamePlayers from "../send-response-to-game-players";

const sendAttackAllMissedResponse = (
    gameId: string,
    currentPlayer: PlayerId,
    emptyCells: { x: number; y: number }[],
) => {
    emptyCells.forEach((cell) => {
        const response: WsResponse = {
            type: RESPONSE_TYPE.attack,
            data: JSON.stringify({ position: cell, currentPlayer, status: "miss" }),
            id: 0,
        };
        sendResponseToGamePlayers(gameId, response);
    });
};

export default sendAttackAllMissedResponse;
