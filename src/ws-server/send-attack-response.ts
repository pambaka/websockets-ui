import { RESPONSE_TYPE } from "../const";
import Games from "../games";
import { AttackStatus, WsResponse } from "../types";
import { getWsEntryIndexByKey, wsConnections } from "./data";

const sendAttackResponse = (
    gameId: string,
    position: { x: number; y: number },
    currentPlayer: 0 | 1,
    status: AttackStatus,
) => {
    const response: WsResponse = {
        type: RESPONSE_TYPE.attack,
        data: JSON.stringify({ position, currentPlayer, status }),
        id: 0,
    };

    const players = Games.getGamePlayers(gameId);
    players.forEach((player) => {
        const index = getWsEntryIndexByKey("userName", player.name);
        wsConnections[index].ws.send(JSON.stringify(response));
    });
};

export default sendAttackResponse;
