import { REQUEST_TYPE, RESPONSE_TYPE } from "../const";

export interface User {
    name: string;
    password: string;
    index?: number;
}

export type RoomUser = Required<Omit<User, "password">>;

export interface Room {
    roomId: number;
    roomUsers: RoomUser[];
}

interface WsMessage {
    data: string;
    id: 0;
}
export interface WsResponse extends WsMessage {
    type: (typeof RESPONSE_TYPE)[keyof typeof RESPONSE_TYPE];
}

export interface WsRequest extends WsMessage {
    type: (typeof REQUEST_TYPE)[keyof typeof REQUEST_TYPE];
}
