// server/src/services/playerService.js

import { v4 as uuidv4 } from "uuid";
import db from "../config/database.js";

export function createPlayer(name, age) {
    const playerId = uuidv4();
    const createdAt = Date.now();

    try {
        db.prepare(
            `
            INSERT INTO players (id, name, age, created_at)
            VALUES (?, ?, ?, ?)
            `
        ).run(playerId, name, age, createdAt);
        return {
            id: playerId,
            name: name,
            age: age,
            createdAt: createdAt,
        };
    } catch (err) {
        if (err.message.includes("UNIQUE constraint failed")) {
            return {
                error: "Player name exists",
                status: 409,
            };
        }
        throw err;
    }
}

export function getPlayers() {
    return db.prepare(`SELECT * FROM players`).all();
}

export function getPlayer(id) {
    try {
        const player = db.prepare(`SELECT * FROM players WHERE id = ?`).get(id);
        if (!player) {
            return {
                error: "Player not found",
                status: 404,
            };
        }
        return player;
    } catch (err) {
        return {
            error: err.message,
            status: 500,
        };
    }
}
