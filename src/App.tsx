import { useMemo, useState } from 'react';
import MainMenuScreen from './screens/MainMenuScreen';
import GameSetupScreen from './screens/GameSetupScreen';
import GameScreen from './screens/GameScreen';
import EndgameSummaryScreen from './screens/EndgameSummaryScreen';
import type { AppScreen } from './types/navigation';
import type { GameState } from './types/game';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('mainMenu');
  const [gameState, setGameState] = useState<GameState | null>(null);

  const content = useMemo(() => {
    switch (currentScreen) {
      case 'mainMenu':
        return <MainMenuScreen onStartGame={() => setCurrentScreen('gameSetup')} />;
      case 'gameSetup':
        return (
          <GameSetupScreen
            onBack={() => setCurrentScreen('mainMenu')}
            onGameCreated={(nextGameState) => {
              setGameState(nextGameState);
              setCurrentScreen('game');
            }}
          />
        );
      case 'game':
        return (
          <GameScreen
            gameState={gameState}
            onBackToSetup={() => setCurrentScreen('gameSetup')}
            onFinishGame={() => setCurrentScreen('endgameSummary')}
          />
        );
      case 'endgameSummary':
        return <EndgameSummaryScreen onMainMenu={() => setCurrentScreen('mainMenu')} />;
      default:
        return null;
    }
  }, [currentScreen, gameState]);

  return <div className="app-shell">{content}</div>;
}
