import ScreenLayout from '../components/ScreenLayout';

type MainMenuScreenProps = {
  onStartGame: () => void;
};

export default function MainMenuScreen({ onStartGame }: MainMenuScreenProps) {
  return (
    <ScreenLayout
      title="Main Menu"
      subtitle="Local hot-seat multiplayer • 2–6 players • Desktop-first"
    >
      <div className="card">
        <p>This is the MVP shell. Start a new game to continue.</p>
        <button onClick={onStartGame}>Start New Game</button>
      </div>
    </ScreenLayout>
  );
}
