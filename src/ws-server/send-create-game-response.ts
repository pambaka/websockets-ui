import Games from "../games";
import { Game } from "../types";
import { getWsEntryIndexByKey, wsConnections } from "./data";
import getCreateGameResponse from "./get-create-game-response";

const sendCreateGameResponse = (gameId: string) => {
    const index = Games.value.map((game) => game.gameId).indexOf(gameId);
    if (index === -1) return;

    const game: Game = Games.value[index];

    for (let i = 0; i < 2; i += 1) {
        const user = game.gameUsers[i];
        const index = getWsEntryIndexByKey("userName", user.name);
        wsConnections[index].ws.send(JSON.stringify(getCreateGameResponse(gameId, i)));
    }
};

export default sendCreateGameResponse;
