import { Room, RoomUser } from "./types";
import Users from "./users";

class Rooms {
    private static allRooms: Room[] = [];

    static availableRooms: Room[] = [];

    static createRoom = (name: string) => {
        const currentUser: RoomUser = { name, index: Users.getUserIndex(name) };
        this.allRooms.push({ roomId: this.allRooms.length, roomUsers: [currentUser] });

        this.updateAvailableRooms();
    };

    static addUserToRoom = (roomId: number, name: string) => {
        const roomUsers = this.allRooms[roomId].roomUsers;

        if (roomUsers.length === 1 && roomUsers[0].name !== name) {
            const currentUser: RoomUser = { name, index: Users.getUserIndex(name) };
            roomUsers.push(currentUser);

            this.updateAvailableRooms();
            return roomUsers;
        }

        return null;
    };

    private static updateAvailableRooms = () => {
        this.availableRooms = this.allRooms.filter((room) => room.roomUsers.length === 1);
    };
}

export default Rooms;
