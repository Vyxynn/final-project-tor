# PlayerSetup Component Documentation

## Overview
The PlayerSetup component handles player registration and login flow.

## Props

### `onPlayerSet`
- **Type:** `function`
- **Required:** Yes
- **Description:** Callback function called when player is successfully created
- **Parameters:** `player` object with `{ id, name, wins, losses, ties, totalGames, createdAt }`

## Usage

```jsx
import PlayerSetup from './components/PlayerSetup';

function App() {
  const [player, setPlayer] = useState(null);

  return (
    <>
      {!player && <PlayerSetup onPlayerSet={setPlayer} />}
      {player && <Game player={player} />}
    </>
  );
}