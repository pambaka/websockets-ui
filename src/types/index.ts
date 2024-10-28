import { REQUEST_TYPE, RESPONSE_TYPE } from "../const";

export interface User {
    name: string;
    password: string;
    index?: number;
}

export type RoomUser = Required<Omit<User, "password">>;

export interface Room {
    roomId: string;
    roomUsers: RoomUser[];
}
export interface Ship {
    position: { x: number; y: number };
    direction: boolean;
    length: number;
    type: "small" | "medium" | "large" | "huge";
}

export type PlayerId = 0 | 1;

export interface Game {
    gameId: string;
    gameUsers: {
        name: string;
        index: PlayerId;
        ships?: Ship[];
        field?: { value: 0 | 1; isAttacked: boolean }[][];
        correctShotsNum?: number;
    }[];
    turn?: PlayerId;
}

export type AttackStatus = "miss" | "shot" | "killed";

export interface Winner {
    name: string;
    wins: number;
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
