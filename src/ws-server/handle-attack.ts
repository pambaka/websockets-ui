import { RESERVED_NAME } from "../const";
import Games from "../games";
import { AttackStatus, PlayerId } from "../types";
import Winners from "../winners";
import broadcastUpdateWinnersResponse from "./broadcast-update-winners-response";
import sendAttackAllMissedResponse from "./responses/send-attack-all-missed-response";
import sendAttackResponse from "./send-attack-response";
import sendFinishGameResponse from "./send-finish-game-response";
import sendTurnResponse from "./send-turn-response";
import getEmptyCells from "./utils/get-empty-cells";
import isShipKilled from "./utils/is-ship-killed";

const handleAttack = (gameId: string, indexPlayer: PlayerId, x: number, y: number) => {
    const players = Games.getGamePlayers(gameId);

    const opponentField = players[+!indexPlayer].field;
    if (!opponentField) return;

    let status: AttackStatus = "miss";
    // if (opponentField[y][x].isAttacked === true) {
    //     Games.changeTurn(data.gameId);
    //     sendTurnResponse(data.gameId);

    //     return;
    // }

    const cell = opponentField[y][x];

    if (cell.value === 1) {
        if (isShipKilled(opponentField, cell)) status = "killed";
        else status = "shot";

        if (cell.isAttacked === false) {
            Games.updateCorrectShotsNum(gameId, indexPlayer);
        }
    }
    cell.isAttacked = true;

    sendAttackResponse(gameId, { x, y }, indexPlayer, status);

    if (status === "killed") {
        const emptyCells = getEmptyCells(opponentField, x, y);
        emptyCells.forEach((cell) => (opponentField[cell.y][cell.x].isAttacked = true));

        sendAttackAllMissedResponse(gameId, indexPlayer, emptyCells);
    } else if (status === "miss") Games.changeTurn(gameId);

    if (players[indexPlayer].name === RESERVED_NAME && (status === "shot" || status === "killed")) fireBotAttack();

    if (Games.isFinished(gameId, indexPlayer)) {
        if (players[indexPlayer].name !== RESERVED_NAME) {
            Winners.updateTable(players[indexPlayer].name);
            broadcastUpdateWinnersResponse();
        }
        sendFinishGameResponse(gameId, indexPlayer);
        Games.finishGame(gameId);
        return;
    }

    sendTurnResponse(gameId);

    function fireBotAttack() {
        const opponentField = players[0].field;
        let x = 0;
        let y = 0;
        do {
            x = Math.floor(Math.random() * 10);
            y = Math.floor(Math.random() * 10);
        } while (opponentField && opponentField[y][x].isAttacked);

        handleAttack(gameId, 1, x, y);
    }

    if (players[+!indexPlayer].name === RESERVED_NAME && indexPlayer !== Games.getTurn(gameId)) {
        fireBotAttack();
    }
};

export default handleAttack;
