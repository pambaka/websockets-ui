import { Game, RoomUser, Ship } from "./types";
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

    static shouldStart = (gameId: string, ships: Ship[], playerId: number) => {
        const index = this.getGameIndexById(gameId);
        const game = this.value[index];

        game.gameUsers[playerId].ships = ships;

        if (game.gameUsers.every((user) => !!user.ships)) return true;

        return false;
    };

    private static getGameIndexById = (gameId: string) => {
        return this.value.map((game) => game.gameId).indexOf(gameId);
    };

    static getGamePlayers = (gameId: string) => {
        const index = this.getGameIndexById(gameId);
        return this.value[index].gameUsers;
    };
}

export default Games;
