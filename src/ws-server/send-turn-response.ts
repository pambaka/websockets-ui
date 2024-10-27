import { RESPONSE_TYPE } from "../const";
import Games from "../games";
import { WsResponse } from "../types";
import { getWsEntryIndexByKey, wsConnections } from "./data";

const sendTurnResponse = (gameId: string) => {
    const turn = Games.getTurn(gameId);

    const response: WsResponse = {
        type: RESPONSE_TYPE.turn,
        data: JSON.stringify({ currentPlayer: turn }),
        id: 0,
    };

    const players = Games.getGamePlayers(gameId);

    players.forEach((player) => {
        const index = getWsEntryIndexByKey("userName", player.name);
        wsConnections[index].ws.send(JSON.stringify(response));
    });
};

export default sendTurnResponse;
