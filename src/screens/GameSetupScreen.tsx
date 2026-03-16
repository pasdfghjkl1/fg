import { useMemo, useState } from 'react';
import ScreenLayout from '../components/ScreenLayout';
import {
  createNewGameState,
  gameLengthOptions,
  getDefaultGameSetupInput,
  getTargetEndAge,
  normalizePlayerNames,
  validateGameSetup,
} from '../data/gameSetup';
import type { GameState } from '../types/game';
import type { GameSetupInput } from '../types/setup';

type GameSetupScreenProps = {
  onBack: () => void;
  onGameCreated: (state: GameState) => void;
};

export default function GameSetupScreen({ onBack, onGameCreated }: GameSetupScreenProps) {
  const [setupInput, setSetupInput] = useState<GameSetupInput>(getDefaultGameSetupInput());
  const [errors, setErrors] = useState<string[]>([]);

  const targetEndAge = useMemo(
    () => getTargetEndAge(setupInput.gameLength),
    [setupInput.gameLength],
  );

  const playerNames = useMemo(
    () => normalizePlayerNames(setupInput.playerNames, setupInput.playerCount),
    [setupInput.playerCount, setupInput.playerNames],
  );

  const updatePlayerCount = (nextPlayerCount: number) => {
    setSetupInput((current) => ({
      ...current,
      playerCount: nextPlayerCount,
      playerNames: Array.from({ length: nextPlayerCount }, (_, index) => {
        const existing = current.playerNames[index]?.trim();
        return existing && existing.length > 0 ? existing : `Player ${index + 1}`;
      }),
    }));
  };

  const updatePlayerName = (index: number, value: string) => {
    setSetupInput((current) => {
      const nextNames = [...current.playerNames];
      nextNames[index] = value;

      return {
        ...current,
        playerNames: nextNames,
      };
    });
  };

  const handleCreateGame = () => {
    const result = validateGameSetup(setupInput);

    if (!result.isValid) {
      setErrors(result.errors);
      return;
    }

    const gameState = createNewGameState(setupInput);
    setErrors([]);
    onGameCreated(gameState);
  };

  return (
    <ScreenLayout title="Game Setup" subtitle="Configure players and match length before starting.">
      <div className="card stack">
        <label className="field">
          <span>Number of players (2–6)</span>
          <input
            type="number"
            min={2}
            max={6}
            value={setupInput.playerCount}
            onChange={(event) => {
              const parsed = Number.parseInt(event.target.value, 10);
              const clamped = Number.isNaN(parsed) ? 2 : Math.max(2, Math.min(6, parsed));
              updatePlayerCount(clamped);
            }}
          />
        </label>

        <div className="stack">
          <span>Player names</span>
          <div className="setup-grid">
            {playerNames.map((name, index) => (
              <label className="field" key={`player-name-${index + 1}`}>
                <span>Player {index + 1}</span>
                <input
                  type="text"
                  value={name}
                  maxLength={24}
                  onChange={(event) => updatePlayerName(index, event.target.value)}
                />
              </label>
            ))}
          </div>
        </div>

        <label className="field">
          <span>Game length</span>
          <select
            value={setupInput.gameLength}
            onChange={(event) =>
              setSetupInput((current) => ({
                ...current,
                gameLength: event.target.value as GameSetupInput['gameLength'],
              }))
            }
          >
            {gameLengthOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <p className="muted">Starting age: 25 • Target end age: {targetEndAge}</p>

        {errors.length > 0 ? (
          <ul className="errors">
            {errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        ) : null}

        <div className="actions">
          <button className="secondary" onClick={onBack}>
            Back
          </button>
          <button onClick={handleCreateGame}>Create New Game</button>
        </div>
      </div>
    </ScreenLayout>
  );
}
