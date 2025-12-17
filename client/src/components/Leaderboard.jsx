import { useState, useEffect } from "react";

export default function Leaderboard() {
    const [leaderboard, setLeaderboard] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchLeaderboard();
    }, []);

    const fetchLeaderboard = async () => {
        try {
            const response = await fetch(
                "http://localhost:3000/api/leaderboard?limit=10"
            );
            const data = await response.json();

            if (data.success) {
                setLeaderboard(data.leaderboard);
            } else {
                setError("Failed to load leaderboard");
            }
        } catch (err) {
            setError("Could not connect to server");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="leaderboard">
            <h2>Leaderboard</h2>
            {leaderboard.length === 0 ? (
                <p>No players to be found....</p>
            ) : (
                <table className="leaderboard-table">
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Player</th>
                            <th>Wins</th>
                            <th>Losses</th>
                            <th>Ties</th>
                            <th>Total</th>
                            <th>Win Rate</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaderboard.map((player, index) => (
                            <tr key={player.id}>
                                <td className="rank">{index + 1}</td>
                                <td className="player-name">{player.name}</td>
                                <td className="wins">{player.wins}</td>
                                <td className="losses">{player.losses}</td>
                                <td className="ties">{player.ties}</td>
                                <td className="total">{player.totalGames}</td>
                                <td className="win-rate">{player.winRate}%</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}