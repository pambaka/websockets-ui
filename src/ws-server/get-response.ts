import { REQUEST_TYPE } from "../const";
import { WsRequest } from "../types";
import getCreateRoomResponse from "./get-create-room-response";
import getRegResponse from "./get-reg-response";

const getResponse = (request: WsRequest, name?: string) => {
    try {
        const response = {
            [REQUEST_TYPE.reg]: ({ request }: { request: WsRequest }) => getRegResponse(request),
            [REQUEST_TYPE.createRoom]: ({ name }: { name?: string }) => getCreateRoomResponse(name),
        };

        return response[request.type]({ request, name });
    } catch (error) {
        if (error instanceof TypeError) console.error(`${request.type} request type is not supported`);
        else if (error instanceof Error) console.error(error.message);
    }
};

export default getResponse;
