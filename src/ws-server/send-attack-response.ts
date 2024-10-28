import { RESPONSE_TYPE } from "../const";
import { AttackStatus, PlayerId, WsResponse } from "../types";
import sendResponseToGamePlayers from "./send-response-to-game-players";

const sendAttackResponse = (
    gameId: string,
    position: { x: number; y: number },
    currentPlayer: PlayerId,
    status: AttackStatus,
) => {
    const response: WsResponse = {
        type: RESPONSE_TYPE.attack,
        data: JSON.stringify({ position, currentPlayer, status }),
        id: 0,
    };

    sendResponseToGamePlayers(gameId, response);
};

export default sendAttackResponse;
