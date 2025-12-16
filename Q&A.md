```js
Full-Stack Tic-Tac-Toe: Essential Review Questions

Frontend - React & Client (7 Questions) - Rikky
Q1: Why do we use board.map() to return Cells instead of manually creating 9 Cell components?
Q2: How do individual Cells have access to the Game state when they are clicked? Explain the data flow from Cell → Board → Game.
Q3: What does onPlayerSet refer to and where does it come from? Trace this prop from PlayerSetup through to its origin.
Q4: What do the square brackets [] indicate as the second argument of the useEffect hook? What happens if you include dependencies vs. leave it empty?
Q5: What happens when we use a ternary operator inside of a JSX return statement and what are the use cases? Give an example from the project.
Q6: In <Cell onClick={() => onCellClick(index)} />, why do we need the arrow function instead of just onClick={onCellClick(index)}?
Q7: Why do we store the player ID and name in localStorage instead of just keeping them in React state? What happens when you refresh the page?

Backend - Express & API (7 Questions) - Vi
Q8: Why do we need the CORS package in this project? What error would you see without it?
Q9: What is the significance of req.params and when is it used? Give an example from the project where we use req.params vs req.body.
Q10: How do we pass parameters dynamically to our routes? Explain the difference between /api/players/:id (route definition) and fetch('/api/players/abc-123') (client request).
Q11: What does app.use(express.json()) do? What happens if you forget it and try to access req.body?
Q12: Why do we use different HTTP methods (GET, POST, PUT, DELETE) instead of just POST for everything? Give examples of when each should be used.
Q13: Why do we use res.status(201) for creating a player instead of res.status(200)? What's the difference between status codes 200, 201, 204, 400, 404, and 500?
Q14: Why do we use limit=10 when fetching from api/leaderboard instead of fetching all players?

Database - SQLite (6 Questions) - Talan
Q15: What is the significance of using question marks ? in our db.prepare() statements? Why not just use string interpolation like `SELECT * FROM players WHERE id = '${playerId}'`?
Q16: What is the difference between .get() and .all() at the end of a db.prepare() statement? When should you use each one?
Q17: Why do we send an object with specific player properties from the getPlayer function instead of just returning player directly from the database?
Q18: In the leaderboard query, explain the formula (wins * 1.0 / total_games). Why multiply by 1.0? What happens without it?
Q19: Why do we use UUIDs (uuidv4()) for player IDs instead of auto-incrementing integers (1, 2, 3...)? Give at least two advantages.
Q20: In the ORDER BY clause: ORDER BY wins DESC, (wins * 1.0 / total_games) DESC, why do we sort by TWO things? What problem does this solve?
```
