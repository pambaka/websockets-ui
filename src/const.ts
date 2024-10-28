export const REQUEST_TYPE = {
    reg: "reg",
    createRoom: "create_room",
    addUserToRoom: "add_user_to_room",
    addShips: "add_ships",
    attack: "attack",
    randomAttack: "randomAttack",
    singlePlay: "single_play",
} as const;

export const RESPONSE_TYPE = {
    reg: "reg",
    updateRoom: "update_room",
    createGame: "create_game",
    finishGame: "finish",
    updataWinners: "update_winners",
    startGame: "start_game",
    turn: "turn",
    attack: "attack",
} as const;

export const RESERVED_NAME = "kotik";
