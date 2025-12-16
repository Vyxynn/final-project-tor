# Backend API Documentation

## Base UR


## Endpoints

### 1. Create Player
**POST** `/api/players`

**Request:**
```json
{
  "name": "Ryan"
}
```

**Response:**
```json
{
  "success": true,
  "player": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Ryan",
    "wins": 0,
    "losses": 0,
    "ties": 0,
    "totalGames": 0,
    "createdAt": 1702310400000
  }
}
```
### 2. Get All Players
**GET** `/api/players`

**Response:**
```json
{
  "success": true,
  "players": [
    {
      "id": "...",
      "name": "Ryan",
      "wins": 5,
      "losses": 2,
      "ties": 1,
      "totalGames": 8,
      "createdAt": 1702310400000
    }
  ],
  "count": 1
}
```



### 3.Get Player by ID
**GET** `/api/players/:id`

**Response:**
```json
{
  "success": true,
  "player": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Ryan",
    "wins": 5,
    "losses": 2,
    "ties": 1,
    "totalGames": 8,
    "createdAt": 1702310400000
  }
}
```

### 4. Get Player by Name
**GET** `/api/players/name/:name`

**Response:**
```json
{
  "success": true,
  "player": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Ryan",
    "wins": 5,
    "losses": 2,
    "ties": 1,
    "totalGames": 8,
    "createdAt": 1702310400000
  }
}
```
### Update Player Stats
**POST** `/api/player/:id/stats`

**Request:**
```json
{
  "result": "win"
}
```

**Response:**
```json
{
  "success": true,
  "player": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Ryan",
    "wins": 6,
    "losses": 2,
    "ties": 1,
    "totalGames": 9,
    "createdAt": 1702310400000
  },
  "message": "Player stats updated: win"
}
```

## Get Leaderboard
**Get** `/api/leaderboard?limit=10`

**Response:**
```json
{
  "success": true,
  "leaderboard": [
    {
      "id": "...",
      "name": "Ryan",
      "wins": 15,
      "losses": 5,
      "ties": 2,
      "totalGames": 22,
      "winRate": "68.2"
    }
  ],
  "count": 1
}
```