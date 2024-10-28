import { Ship } from "../types";

const getArrangedShips: () => Ship[] = () => {
    // TODO generate ships randomly
    const shipsStr =
        '[{"position":{"x":4,"y":2},"direction":false,"type":"huge","length":4},{"position":{"x":2,"y":6},"direction":false,"type":"large","length":3},{"position":{"x":7,"y":6},"direction":true,"type":"large","length":3},{"position":{"x":3,"y":8},"direction":false,"type":"medium","length":2},{"position":{"x":0,"y":5},"direction":true,"type":"medium","length":2},{"position":{"x":0,"y":2},"direction":false,"type":"medium","length":2},{"position":{"x":8,"y":0},"direction":true,"type":"small","length":1},{"position":{"x":1,"y":0},"direction":true,"type":"small","length":1},{"position":{"x":3,"y":0},"direction":true,"type":"small","length":1},{"position":{"x":2,"y":4},"direction":true,"type":"small","length":1}]';
    const ships = JSON.parse(shipsStr);
    return ships;
};

export default getArrangedShips;
