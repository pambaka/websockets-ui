import { FieldCell } from "../../types";

const isShipKilled = (field: FieldCell[][], cell: FieldCell) => {
    if (!cell.next && !cell.prev) return true;

    const isShipPartShot = (field: FieldCell[][], cell: FieldCell, direction: "next" | "prev") => {
        if (cell.value === 0 || !cell.isAttacked) return false;
        if (cell.value === 1 && cell.isAttacked && !cell[direction]) return true;

        return isShipPartShot(field, field[cell[direction]!.y][cell[direction]!.x], direction);
    };

    if (cell.next && !cell.prev) {
        return isShipPartShot(field, field[cell.next.y][cell.next.x], "next");
    } else if (!cell.next && cell.prev) {
        return isShipPartShot(field, field[cell.prev.y][cell.prev.x], "prev");
    } else if (cell.next && cell.prev) {
        const isNextPartShot = isShipPartShot(field, field[cell.next.y][cell.next.x], "next");
        const isPrevPartShot = isShipPartShot(field, field[cell.prev.y][cell.prev.x], "prev");
        if (isNextPartShot && isPrevPartShot) return true;
        return false;
    }

    return false;
};

export default isShipKilled;
