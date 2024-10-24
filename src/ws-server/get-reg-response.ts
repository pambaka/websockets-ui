import { MESSAGE_TYPE } from "../const";
import { User, WsMessage } from "../types";
import Users from "../users";

const getRegResponse: (request: WsMessage) => WsMessage | undefined = (request) => {
    try {
        const { name, password }: {name: User['name'], password: User['password']} = JSON.parse(request.data);

        let error = false;
        let errorText = '';
        
        const index = Users.getUserIndex(name);
        if (index >= 0 && Users.value[index].password !== password) {
            error = true;
            errorText = 'Invalid password';
        } 

        const response: WsMessage =  {
            type: MESSAGE_TYPE.reg,
            data: JSON.stringify({ name, index, error, errorText }),
            id: 0,
          };

        return response;
    }
    catch (error) {
        if (error instanceof Error) console.error(error.message)
    }
}

export default getRegResponse;
