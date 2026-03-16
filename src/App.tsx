import { useMemo, useState } from 'react';
import MainMenuScreen from './screens/MainMenuScreen';
import GameSetupScreen from './screens/GameSetupScreen';
import GameScreen from './screens/GameScreen';
import EndgameSummaryScreen from './screens/EndgameSummaryScreen';
import type { AppScreen } from './types/navigation';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('mainMenu');

  const content = useMemo(() => {
    switch (currentScreen) {
      case 'mainMenu':
        return <MainMenuScreen onStartGame={() => setCurrentScreen('gameSetup')} />;
      case 'gameSetup':
        return (
          <GameSetupScreen
            onBack={() => setCurrentScreen('mainMenu')}
            onContinue={() => setCurrentScreen('game')}
          />
        );
      case 'game':
        return (
          <GameScreen
            onBackToSetup={() => setCurrentScreen('gameSetup')}
            onFinishGame={() => setCurrentScreen('endgameSummary')}
          />
        );
      case 'endgameSummary':
        return <EndgameSummaryScreen onMainMenu={() => setCurrentScreen('mainMenu')} />;
      default:
        return null;
    }
  }, [currentScreen]);

  return <div className="app-shell">{content}</div>;
}
