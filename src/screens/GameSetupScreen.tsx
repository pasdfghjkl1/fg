import ScreenLayout from '../components/ScreenLayout';

type GameSetupScreenProps = {
  onBack: () => void;
  onContinue: () => void;
};

export default function GameSetupScreen({ onBack, onContinue }: GameSetupScreenProps) {
  return (
    <ScreenLayout title="Game Setup" subtitle="Placeholder setup flow (no real logic yet)">
      <div className="card stack">
        <p>Future setup options will live here (player names, count, initial settings).</p>
        <div className="actions">
          <button className="secondary" onClick={onBack}>
            Back
          </button>
          <button onClick={onContinue}>Continue to Game</button>
        </div>
      </div>
    </ScreenLayout>
  );
}
