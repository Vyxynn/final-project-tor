// src/server.js
import express from "express";
import "dotenv/config";
import {
    createPlayer,
    getPlayers,
    getPlayer,
} from "./services/playerService.js";
const app = express();
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || "development";
app.use(express.json());

// Get routes
app.get("/", (req, res) => {
    res.status(200).send("Welcome Home!");
});
app.get("/about", (req, res) => {
    res.status(200).send("My name is Ryan");
});

app.get("/error", (req, res) => {
    throw new Error("error from /error route");
});

app.get("/api/players", (req, res) => {
    const players = getPlayers();
    res.json({
        success: true,
        players: players,
    });
});

app.get("/api/players/:id", (req, res) => {
    const player = getPlayer(req.params.id);

    if (player.error) {
        res.status(player.status).json({
            success: false,
            error: player.error,
        });
    }

    res.status(200).json({
        success: true,
        player: player,
    });
});

// Post routes
app.post("/api/players", (req, res) => {
    try {
        const { name, age } = req.body;
        const trimmedName = name?.trim();
        if (!name) {
            return res.status(400).json({
                success: false,
                error: "Name is required",
            });
        }
        const player = createPlayer(trimmedName, age);
        if (player.error) {
            return res.status(player.status).json({
                success: false,
                error: player.error,
            });
        }

        res.status(201).json({
            success: true,
            name: trimmedName,
            age: age,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message,
        });
    }
});

app.use((req, res) => {
    res.status(404).send("The page you're looking for does not exist");
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        error: "Internal Server Error! Error!",
        msg: err.message,
    });
});

app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
});
