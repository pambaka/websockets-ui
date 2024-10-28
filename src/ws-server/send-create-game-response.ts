import { RESERVED_NAME } from "../const";
import Games from "../games";
import { getWsEntryIndexByKey, wsConnections } from "./data";
import getCreateGameResponse from "./get-create-game-response";

const sendCreateGameResponse = (gameId: string) => {
    const players = Games.getGamePlayers(gameId);

    players.forEach((player) => {
        if (player.name !== RESERVED_NAME) {
            const index = getWsEntryIndexByKey("userName", player.name);
            wsConnections[index].ws.send(JSON.stringify(getCreateGameResponse(gameId, player.index)));
        }
    });
};

export default sendCreateGameResponse;
