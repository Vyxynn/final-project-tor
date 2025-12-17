
# Full-Stack Tic-Tac-Toe: Essential Review Questions

## Frontend - React & Client (7 Questions) - **Rikky**
Q1: Why do we use board.map() to return Cells instead of manually creating 9 Cell components?

We use board.map() so the UI is generated directly from the board state, which avoids hardcoding components and ensures the UI automatically updates when the state changes.

Q2: How do individual Cells have access to the Game state when they are clicked? Explain the data flow from Cell → Board → Game.

Cells do not access the Game state directly; the Game passes data and callback functions down through Board, and when a Cell is clicked, the event bubbles back up to Game where the state is updated.

Q3: What does onPlayerSet refer to and where does it come from? Trace this prop from PlayerSetup through to its origin.

onPlayerSet is a callback function that originates from the setPlayer state updater in Game.jsx and is passed into PlayerSetup so the child component can update the parent’s state.

Q4: What do the square brackets [] indicate as the second argument of the useEffect hook? What happens if you include dependencies vs. leave it empty?

The square brackets define when the effect runs: including dependencies causes the effect to rerun when those values change, while an empty array runs the effect only once on initial render.

Q5: What happens when we use a ternary operator inside of a JSX return statement and what are the use cases? Give an example from the project.

A ternary operator allows conditional logic directly inside JSX to decide what gets rendered, such as switching between the active player display and the game-over message in GameStatus.

Q6: In ``<Cell onClick={() => onCellClick(index)} />``, why do we need the arrow function instead of just ``onClick={onCellClick(index)}``?

The arrow function ensures onCellClick(index) is only executed when the cell is clicked, rather than immediately during render.

Q7: Why do we store the player ID and name in localStorage instead of just keeping them in React state? What happens when you refresh the page?

Player data is stored in localStorage so it persists across page refreshes, whereas React state would reset and lose the player information when the page reloads.

## Backend - Express & API (7 Questions) - **Vi**
Q8: Why do we need the CORS package in this project? What error would you see without it?
Q9: What is the significance of req.params and when is it used? Give an example from the project where we use req.params vs req.body.
Q10: How do we pass parameters dynamically to our routes? Explain the difference between /api/players/:id (route definition) and fetch('/api/players/abc-123') (client request).
Q11: What does app.use(express.json()) do? What happens if you forget it and try to access req.body?
Q12: Why do we use different HTTP methods (GET, POST, PUT, DELETE) instead of just POST for everything? Give examples of when each should be used.
Q13: Why do we use res.status(201) for creating a player instead of res.status(200)? What's the difference between status codes 200, 201, 204, 400, 404, and 500?
Q14: Why do we use limit=10 when fetching from api/leaderboard instead of fetching all players?

## Database - SQLite (6 Questions) - **Talan**
Q15: What is the significance of using question marks ? in our db.prepare() statements? Why not just use string interpolation like `SELECT * FROM players WHERE id = '${playerId}'`?
Q16: What is the difference between .get() and .all() at the end of a db.prepare() statement? When should you use each one?
Q17: Why do we send an object with specific player properties from the getPlayer function instead of just returning player directly from the database?
Q18: In the leaderboard query, explain the formula (wins * 1.0 / total_games). Why multiply by 1.0? What happens without it?
Q19: Why do we use UUIDs (uuidv4()) for player IDs instead of auto-incrementing integers (1, 2, 3...)? Give at least two advantages.
Q20: In the ORDER BY clause: ORDER BY wins DESC, (wins * 1.0 / total_games) DESC, why do we sort by TWO things? What problem does this solve?

