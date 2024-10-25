import { RESPONSE_TYPE } from "../const";
import { User, WsRequest, WsResponse } from "../types";
import Users from "../users";

const getRegResponse: (request: WsRequest) => WsResponse | undefined = (request) => {
    try {
        const { name, password }: { name: User["name"]; password: User["password"] } = JSON.parse(request.data);

        let error = false;
        let errorText = "";

        let index = Users.getUserIndex(name);

        if (index >= 0 && Users.value[index].password !== password) {
            error = true;
            errorText = "Invalid password";
        } else if (index === -1) {
            Users.add({ name, password });
            index = Users.getUserIndex(name);
        }

        const response: WsResponse = {
            type: RESPONSE_TYPE.reg,
            data: JSON.stringify({ name, index, error, errorText }),
            id: 0,
        };

        return response;
    } catch (error) {
        if (error instanceof Error) console.error(error.message);
    }
};

export default getRegResponse;
