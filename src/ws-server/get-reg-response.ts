import { MESSAGE_TYPE } from "../const";
import { WsMessage } from "../types";

const getRegResponse: (request: WsMessage, index: string) => WsMessage | undefined = (request, index) => {
    try {
        const { name } = JSON.parse(request.data);
        const response: WsMessage =  {
            type: MESSAGE_TYPE.reg,
            data: JSON.stringify({
              name,
              index,
              error: false,
              errorText: "",
            }),
            id: 0,
          };

          return response;
    }
    catch (error) {
        if (error instanceof Error) console.log(error.message)
    }
}

export default getRegResponse;
