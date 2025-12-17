// client/src/components/Game/Game.jsx
import { useState, useEffect, useRef } from "react";
import Board from "./Board";
import GameStatus from "./GameStatus";
import PlayerSetup from "../PlayerSetup";
import {
  checkForWin,
  isValidMove,
  applyMove,
  switchPlayer,
  createInitialGameState,
} from "../../utils/gameLogic";

export default function Game() {
  const [gameState, setGameState] = useState(createInitialGameState());
  const [player, setPlayer] = useState(null);
  const hasUpdatedStatsRef = useRef(false);

  const { board, currentPlayer, gameOver, winner, winningCombo } = gameState;

  const handleCellClick = (position) => {
    if (gameOver) return;

    const validation = isValidMove(board, position);
    if (!validation.valid) {
      console.log("Invalid move:", validation.reason);
      return;
    }
    const newBoard = applyMove(board, position, currentPlayer);
    const result = checkForWin(newBoard);
    setGameState({
      board: newBoard,
      currentPlayer: result.winner
        ? currentPlayer
        : switchPlayer(currentPlayer),
      gameOver: result.winner !== null,
      winner: result.winner,
      winningCombo: result.winningCombo,
    });
  };

  const handleLogOut = () => {
    localStorage.clear();
    return window.location.reload();
  };

  const handleReset = () => {
    setGameState(createInitialGameState());
    hasUpdatedStatsRef.current = false;
  };

  useEffect(() => {
    if (!gameOver || !player || hasUpdatedStatsRef.current) {
      return;
    }

    const updateStats = async () => {
      hasUpdatedStatsRef.current = true;

      try {
        let result;
        if (winner === "DRAW") {
          result = "tie";
        } else if (winner === "X") {
          result = "win";
        } else {
          result = "loss";
        }

        const response = await fetch(
          `http://localhost:3000/api/players/${player.id}/stats`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ result }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          setPlayer(data.player);
          console.log("Stats updated:", data.player);
        }
      } catch (error) {
        console.error("Failed to update stats:", error);
        hasUpdatedStatsRef.current = false;
      }
    };

    updateStats();
  }, [gameOver, winner, player]);

  if (!player) {
    return <PlayerSetup onPlayerSet={setPlayer} />;
  }

  return (
    <>
      <div className="game-container">
        <h1>Tic-Tac-Toe</h1>
        <div className="player-info">
          <p>Welcome, {player.name}!</p>
          <p className="stats">
            Wins: {player.wins} | Losses: {player.losses} | Ties: {player.ties}
          </p>
        </div>
        <GameStatus
          currentPlayer={currentPlayer}
          winner={winner}
          gameOver={gameOver}
        />
        <Board
          board={board}
          onCellClick={handleCellClick}
          winningCombo={winningCombo}
        />
        <button className={`reset-button`} onClick={handleReset}>
          New Game
        </button>

        <button onClick={handleLogOut}>Log Out</button>
      </div>
    </>
  );
}
