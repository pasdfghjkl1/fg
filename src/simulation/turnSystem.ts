import type { GameState, Player, TurnPhase } from '../types/game';
import { applyYearlyTurn } from './turnResolution';

const TURN_PHASES: TurnPhase[] = ['startOfTurn', 'finance', 'event', 'action', 'endTurn'];

function getNextPhase(currentPhase: TurnPhase): TurnPhase {
  const currentIndex = TURN_PHASES.indexOf(currentPhase);

  if (currentIndex < 0 || currentIndex === TURN_PHASES.length - 1) {
    return TURN_PHASES[0];
  }

  return TURN_PHASES[currentIndex + 1];
}

function appendLog(gameState: GameState, message: string): GameState {
  return {
    ...gameState,
    log: [
      ...gameState.log,
      {
        id: `log-${gameState.log.length + 1}`,
        turnNumber: gameState.turnNumber,
        playerId: gameState.players[gameState.currentPlayerIndex]?.id,
        phase: gameState.currentPhase,
        message,
        timestampIso: new Date().toISOString(),
      },
    ],
  };
}

export function advanceRound(gameState: GameState): GameState {
  const updatedPlayers: Player[] = gameState.players.map((player) => applyYearlyTurn(player).player);

  return {
    ...gameState,
    players: updatedPlayers,
  };
}

export function advanceTurn(gameState: GameState): GameState {
  const isLastPlayerInRound = gameState.currentPlayerIndex === gameState.players.length - 1;

  if (isLastPlayerInRound) {
    const roundAdvancedState = advanceRound(gameState);

    return appendLog(
      {
        ...roundAdvancedState,
        currentPlayerIndex: 0,
        currentPhase: TURN_PHASES[0],
        turnNumber: gameState.turnNumber + 1,
      },
      'Round complete. All players advanced by one year.',
    );
  }

  return appendLog(
    {
      ...gameState,
      currentPlayerIndex: gameState.currentPlayerIndex + 1,
      currentPhase: TURN_PHASES[0],
      turnNumber: gameState.turnNumber + 1,
    },
    'Turn passed to next player.',
  );
}

export function advancePhase(gameState: GameState): GameState {
  if (gameState.currentPhase === 'endTurn') {
    return advanceTurn(gameState);
  }

  const nextPhase = getNextPhase(gameState.currentPhase);

  return appendLog(
    {
      ...gameState,
      currentPhase: nextPhase,
    },
    `Phase advanced to ${nextPhase}.`,
  );
}

export function isGameFinished(gameState: GameState): boolean {
  return gameState.players.every((player) => player.age >= gameState.settings.endingAge);
}
