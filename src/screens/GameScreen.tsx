import ScreenLayout from '../components/ScreenLayout';

type GameScreenProps = {
  onBackToSetup: () => void;
  onFinishGame: () => void;
};

export default function GameScreen({ onBackToSetup, onFinishGame }: GameScreenProps) {
  return (
    <ScreenLayout title="Game Screen" subtitle="Turn loop and game systems will be added in later stages">
      <div className="card stack">
        <p>Gameplay area placeholder.</p>
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
