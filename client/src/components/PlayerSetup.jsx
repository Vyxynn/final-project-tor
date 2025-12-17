import { useState } from "react";
import Leaderboard from "./Leaderboard";

export default function PlayerSetup({ onPlayerSet }) {
  // STATES //
  const [name, setName] = useState(""); // PLAYER NAME INPUTTED //
  const [loading, setLoading] = useState(false); // IN PROGRESS API CALL //
  const [error, setError] = useState(""); // ERROR MESSAGES //
  const [existingPlayer, setExistingPlayer] = useState(null); // EXISTING PLAYERS //

  // SUBMITTING PLAYER USER //
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    // PREVENTS WHITESPACE // 
    if (!name.trim()) {
      setError("Please enter your name");
      return;
    }

    // IT'S OKAY TO LOAD //
    setLoading(true);

    try {
      // EXISTING PLAYER //
      if (existingPlayer) {
        localStorage.setItem("playerId", existingPlayer.id);
        localStorage.setItem("playerName", existingPlayer.name);

        onPlayerSet(existingPlayer);
      }

      // POST USER TO DB //
      const response = await fetch("http://localhost:3000/api/players", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // NO WHITESPACE WITH LETTERS!!! //
        body: JSON.stringify({ name: name.trim() }),
      });

      const data = await response.json();

      if (data.success) {
        // SETS IN LS (WORKS!) //
        localStorage.setItem("playerId", data.player.id);
        localStorage.setItem("playerName", data.player.name);

        // SETS THE ACTIVE PLAYER, ORIGIN IN GAME.JSX //
        onPlayerSet(data.player);

        console.log("✓ Player created:", data.player);
      } else {
        setError(data.error || "Failed to create player");
      }
    } catch (err) {
      // IT'S NOT OKAY TO KEEP GOING //
      console.error("Error creating player:", err);
      setError("Could not connect to server. Make sure backend is running.");
    } finally {
      // WE'RE DONE //
      setLoading(false);
    }
  };

  // CHECK IF PLAYER EXISTS -- will auto go to this and check because async -- written above so that the form can reach it //
  const checkExistingPlayer = async (name) => {
    try {
      const response = await fetch(`http://localhost:3000/api/players/name/${name}`);
      const data = await response.json();

      if (data.success) {
        // SETS ALL EXISTING DATA  IN DB // 
        setExistingPlayer(data.player);
      } else {
        setExistingPlayer(null);
      }
    } catch (err) {
      setExistingPlayer(null);
    }
  };

  // PLAYER SUBMISSION CARD //
  return (
    <div className="player-setup">
      <div className="player-setup-card">
        <h2>Welcome to Tic-Tac-Toe!</h2>
        <p className="subtitle">Enter your name to start playing</p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="player-form">
          <div className="form-group">
            <label htmlFor="playerName">Player Name</label>
            <input
              id="playerName"
              type="text"
              placeholder="Enter your name..."
              value={name}
              onChange={(e) => {
                if (e.target.value.trim().length > 2) {
                  checkExistingPlayer(e.target.value.trim());
                } 
                setName(e.target.value);
              }}
              disabled={loading}
              className="player-input"
              autoFocus
            />
            {existingPlayer && (
              <div className="existing-player-info">
                <p>👋 Welcome back, {existingPlayer.name}!</p>
                <p className="stats">
                  Wins: {existingPlayer.wins} |
                  Losses: {existingPlayer.losses} |
                  Ties: {existingPlayer.ties}
                </p>
                <p className="info-text">Click Start Game to continue</p>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading || !name.trim()}
            className="btn btn-primary"
          >
            {loading ? "Creating Player..." : "Start Game"}
          </button>
        </form>

        <div className="help-text">
          <p>Play against yourself or a friend!</p>
          <p>Your wins and losses will be TRACKED!</p>
        </div>
      </div>
      <Leaderboard />
    </div>
  );
}