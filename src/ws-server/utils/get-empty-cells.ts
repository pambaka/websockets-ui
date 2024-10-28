import { FieldCell } from "../../types";

const getEmptyCells = (field: FieldCell[][], x: number, y: number) => {
    const emptyCellsSet = new Set<string>();
    const shipCells = new Set<string>();

    const fillEmptyCellsSet = (field: FieldCell[][], x: number, y: number) => {
        for (let i = y - 1; i <= y + 1; i += 1) {
            for (let j = x - 1; j <= x + 1; j += 1) {
                if (i >= 0 && i <= 9 && j >= 0 && j <= 9) {
                    if (field[i][j].value === 0) emptyCellsSet.add(`${j},${i}`);
                    else if (field[i][j].value === 1 && !shipCells.has(`${j},${i}`)) {
                        shipCells.add(`${j},${i}`);

                        fillEmptyCellsSet(field, j, i);
                    }
                }
            }
        }
    };

    fillEmptyCellsSet(field, x, y);

    let emptyCells = Array.from(emptyCellsSet);

    return emptyCells.map((str) => ({ x: +str.split(",")[0], y: +str.split(",")[1] }));
};

export default getEmptyCells;
