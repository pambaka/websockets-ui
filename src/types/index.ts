import { MESSAGE_TYPE } from "../const";

export interface User {
    name: string;
    password: string;
    index?: number;
}

export interface WsMessage {
    type: keyof typeof MESSAGE_TYPE;
    data: string;
    id: 0;
}
