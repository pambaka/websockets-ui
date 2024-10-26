export const REQUEST_TYPE = {
    reg: "reg",
    createRoom: "create_room",
    addUserToRoom: "add_user_to_room",
} as const;

export const RESPONSE_TYPE = {
    reg: "reg",
    updateRoom: "update_room",
    createGame: "create_game",
    finishGame: "finish",
    updataWinners: "update_winners",
} as const;
