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
}

export default Games;
