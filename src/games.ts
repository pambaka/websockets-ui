import { Game, RoomUser } from "./types";
import crypto from "node:crypto";

class Games {
    static value: Game[] = [];

    static createGame = (roomUsers: [RoomUser, RoomUser]) => {
        const index = crypto.randomUUID();

        this.value.push({
            gameId: index,
            gameUsers: [
                { name: roomUsers[0].name, index: 0 },
                { name: roomUsers[1].name, index: 1 },
            ],
        });

        return index;
    };

    static finishGame = (name: string) => {
        const games = this.value.filter((game) => game.gameUsers.some((user) => user.name === name));
        if (games.length === 0) return null;

        const index = this.value.map((game) => game.gameId).indexOf(games[0].gameId);

        if (index === -1) return null;

        const gameUsers = games[index].gameUsers;
        const winner = gameUsers.filter((user) => user.name !== name)[0];

        this.value.splice(index, 1);

        return winner;
    };
}

export default Games;
