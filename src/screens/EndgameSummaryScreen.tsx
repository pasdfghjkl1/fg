import ScreenLayout from '../components/ScreenLayout';

type EndgameSummaryScreenProps = {
  onMainMenu: () => void;
};

export default function EndgameSummaryScreen({ onMainMenu }: EndgameSummaryScreenProps) {
  return (
    <ScreenLayout title="Endgame Summary" subtitle="Final scoring breakdown placeholder">
      <div className="card stack">
        <p>Summary details will be added once scoring systems are implemented.</p>
        <div className="actions">
          <button onClick={onMainMenu}>Return to Main Menu</button>
        </div>
      </div>
    </ScreenLayout>
  );
}
