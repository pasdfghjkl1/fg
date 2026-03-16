import ScreenLayout from '../components/ScreenLayout';
import { advancePhase, isGameFinished } from '../simulation';
import type { GameState } from '../types/game';

type GameScreenProps = {
  gameState: GameState | null;
  onBackToSetup: () => void;
  onFinishGame: () => void;
  onGameStateChange: (nextGameState: GameState) => void;
};

export default function GameScreen({
  gameState,
  onBackToSetup,
  onFinishGame,
  onGameStateChange,
}: GameScreenProps) {
  if (!gameState) {
    return (
      <ScreenLayout title="Game Screen" subtitle="No active game found.">
        <div className="card stack">
          <p>Please create a new game from setup first.</p>
          <div className="actions">
            <button className="secondary" onClick={onBackToSetup}>
              Back to Setup
            </button>
          </div>
        </div>
      </ScreenLayout>
    );
  }

  const currentPlayer = gameState.players[gameState.currentPlayerIndex];
  const currentProfession = gameState.availableProfessions.find(
    (profession) => profession.id === currentPlayer.professionId,
  );

  const handleEndTurn = () => {
    const nextGameState = advancePhase(gameState);
    onGameStateChange(nextGameState);

    if (isGameFinished(nextGameState)) {
      onFinishGame();
    }
  };

  return (
    <ScreenLayout title="Game Screen" subtitle="Progress turns and rotate active players.">
      <div className="card stack">
        <p>
          <strong>Match:</strong> {gameState.players.length} players • {gameState.settings.gameLength} length •
          Start age {gameState.settings.startingAge} • End age {gameState.settings.endingAge}
        </p>

        <div className="card stack">
          <p>
            <strong>Current Player:</strong> {currentPlayer.name}
          </p>
          <p>
            <strong>Profession:</strong> {currentProfession?.name ?? 'Unknown'}
          </p>
          <p>
            <strong>Age:</strong> {currentPlayer.age}
          </p>
          <p>
            <strong>Turn Number:</strong> {gameState.turnNumber}
          </p>
          <p>
            <strong>Phase:</strong> {gameState.currentPhase}
          </p>
        </div>

        <div className="actions">
          <button className="secondary" onClick={onBackToSetup}>
            Back to Setup
          </button>
          <button onClick={handleEndTurn}>End Turn</button>
        </div>
      </div>
    </ScreenLayout>
  );
}
