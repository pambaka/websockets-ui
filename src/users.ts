import { User } from "./types";

class Users {
    static value: User[] = [];

    static add = (user: User) => {
        this.value.push(user);
    }
}

export default Users;