import WebSocket from "ws";

export const wsConnectionUsers: { connectionId: string; name: string }[] = [];

export const wsConnections: { connectionId: string; ws: WebSocket }[] = [];
