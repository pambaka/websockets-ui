import Games from "../games";
import { WsResponse } from "../types";
import { getWsEntryIndexByKey, wsConnections } from "./data";

const sendResponseToGamePlayers = (gameId: string, response: WsResponse) => {
    const players = Games.getGamePlayers(gameId);

    players.forEach((player) => {
        const index = getWsEntryIndexByKey("userName", player.name);
        wsConnections[index].ws.send(JSON.stringify(response));
    });
};

export default sendResponseToGamePlayers;
