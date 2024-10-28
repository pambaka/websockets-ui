import { RESERVED_NAME, RESPONSE_TYPE } from "../const";
import Games from "../games";
import { WsResponse } from "../types";
import { getWsEntryIndexByKey, wsConnections } from "./data";

const sendStartGameResponse = (gameId: string) => {
    const players = Games.getGamePlayers(gameId);

    players.forEach((player) => {
        const response: WsResponse = {
            type: RESPONSE_TYPE.startGame,
            data: JSON.stringify({ ships: player.ships, currentPlayerIndex: player.index }),
            id: 0,
        };

        if (player.name !== RESERVED_NAME)
            wsConnections[getWsEntryIndexByKey("userName", player.name)].ws.send(JSON.stringify(response));
    });
};

export default sendStartGameResponse;
