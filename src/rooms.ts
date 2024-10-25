import { Room, RoomUser } from "./types";
import Users from "./users";

class Rooms {
    static value: Room[] = [];

    static createRoom = (name: string) => {
        const currentUser: RoomUser = { name, index: Users.getUserIndex(name) };

        this.value.push({ roomId: this.value.length, roomUsers: [currentUser] });
    };
}

export default Rooms;
