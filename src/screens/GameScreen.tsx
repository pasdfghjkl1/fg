import ScreenLayout from '../components/ScreenLayout';
import { getTargetEndAge } from '../data/gameSetup';
import { sampleProfessions } from '../data/professions';
import type { GameState } from '../types/game';

type GameScreenProps = {
  gameState: GameState | null;
  onBackToSetup: () => void;
  onFinishGame: () => void;
};

export default function GameScreen({ gameState, onBackToSetup, onFinishGame }: GameScreenProps) {
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

  return (
    <ScreenLayout title="Game Screen" subtitle="Session initialized and ready for turn-loop stages.">
      <div className="card stack">
        <p>
          <strong>Match:</strong> {gameState.players.length} players • {gameState.settings.gameLength} length
          • Start age {gameState.settings.startingAge} • End age{' '}
          {getTargetEndAge(gameState.settings.gameLength)}
        </p>

        <div className="setup-grid">
          {gameState.players.map((player) => {
            const profession = sampleProfessions.find((item) => item.id === player.professionId);

            return (
              <div key={player.id} className="card stack">
                <p>
                  <strong>{player.name}</strong>
                </p>
                <p>Profession: {profession?.name ?? 'Unknown'}</p>
                <p>
                  Starting cash: ${player.cash} • Salary: ${player.salaryIncome}
                </p>
              </div>
            );
          })}
        </div>

        <div className="actions">
          <button className="secondary" onClick={onBackToSetup}>
            Back to Setup
          </button>
          <button onClick={onFinishGame}>Go to Endgame Summary</button>
        </div>
      </div>
    </ScreenLayout>
  );
}
