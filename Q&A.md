
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

CORS is needed in order to let the client and server run on different ports while staying connected. (Client is 5173 and Server is 3000). Without it, you would get a big error that the browser puts out in order to block the req/res cycle. yay security!

Cross-Origin Request Blocked: The Same Origin Policy disallows reading the remote resource at http://localhost:3000/api/players (Reason: CORS header 'Access-Control-Allow-Origin' missing)

Q9: What is the significance of req.params and when is it used? Give an example from the project where we use req.params vs req.body.

Req.params needs to exist in order to grab specific values of an object from an API call. Req.body is used to gather all key/value pairs from a call. 

// FROM SERVER.JS // 
```js
app.get("/api/players/:id", (req, res) => {
  try {
    const player = getPlayer(req.params.id);
    // GATHERS THE ID OF A SPECIFIC PLAYER THAT'S BEING PLAYED //

    if (player.error) {
      return res.status(player.status).json({
        success: false,
        error: player.error,
      });
    }

    res.json({
      success: true,
      player,
    });
  } catch (error) {
    console.error("Error getting player:", error);
    res.status(500).json({
      success: false,
      error: "Failed to get player",
    });
  }
});
```

```js
app.post("/api/players/:id/stats", (req, res) => {
  try {
    const { result } = req.body;

    if (!result || !["win", "loss", "tie"].includes(result)) {
      return res.status(400).json({
        success: false,
        error: "Result must be 'win', 'loss', or 'tie'",
      });
    }
```

Q10: How do we pass parameters dynamically to our routes? Explain the difference between /api/players/:id (route definition) and fetch('/api/players/abc-123') (client request).

You can pass parameters dynamically to routes using the colon : followed by what you want to be passed. The :id means you can pass any id from the client to the server in order to fetch a specific value from the database. If not found, it will error out.

Q11: What does app.use(express.json()) do? What happens if you forget it and try to access req.body?

Express.json() allows the server to parse through raw JSON and make it into an easier to read as a JSON object, usable with req.body. Without it, req.body will either be empty or undefined.

Q12: Why do we use different HTTP methods (GET, POST, PUT, DELETE) instead of just POST for everything? Give examples of when each should be used.

POST is for putting a value into the DB -> adding a player
GET is for accessing everything that already exists inside the DB -> seeing if player exists
PUT is for updating/replacing a value that already exists in the DB -> changing player name
DELETE is for getting rid of a value in the DB -> getting rid of player and stats

Q13: Why do we use res.status(201) for creating a player instead of res.status(200)? What's the difference between status codes 200, 201, 204, 400, 404, and 500?

201 is SPECFICALLY for when a value is created/added successfully, while 200 just means that the request was successful (doesn't specify what happens, just that it did happen)

204 is for when the request was successful but there is no content to send in response

400 is Bad Request, for when the user messes up and inputs an incorrect value.

404 means that an endpoint, value, or assest is unable to be found, most likely due to the user trying to search and enter one that doesn't actually exist.

500 is a server error that has nothing to do with the user, server just crashes.

Q14: Why do we use limit=10 when fetching from api/leaderboard instead of fetching all players?

It would be easier to read, most people don't really care about ALL of players, especially if there are hundreds of them. 

## Database - SQLite (6 Questions) - **Talan**
Q15: What is the significance of using question marks ? in our db.prepare() statements? Why not just use string interpolation like `SELECT * FROM players WHERE id = '${playerId}'`?
Q16: What is the difference between .get() and .all() at the end of a db.prepare() statement? When should you use each one?
Q17: Why do we send an object with specific player properties from the getPlayer function instead of just returning player directly from the database?
Q18: In the leaderboard query, explain the formula (wins * 1.0 / total_games). Why multiply by 1.0? What happens without it?
Q19: Why do we use UUIDs (uuidv4()) for player IDs instead of auto-incrementing integers (1, 2, 3...)? Give at least two advantages.
Q20: In the ORDER BY clause: ORDER BY wins DESC, (wins * 1.0 / total_games) DESC, why do we sort by TWO things? What problem does this solve?

