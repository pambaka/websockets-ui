import { RESPONSE_TYPE } from "../const";
import { User, WsRequest, WsResponse } from "../types";
import Users from "../users";

const getRegResponse: (request: WsRequest) => WsResponse | undefined = (request) => {
    try {
        const { name, password }: { name: User["name"]; password: User["password"] } = JSON.parse(request.data);

        Users.add({ name, password });
        const index = Users.getUserIndex(name);

        const response: WsResponse = {
            type: RESPONSE_TYPE.reg,
            data: JSON.stringify({ name, index, error: false, errorText: "" }),
            id: 0,
        };

        return response;
    } catch (error) {
        if (error instanceof Error) console.error(error.message);
    }
};

export default getRegResponse;
