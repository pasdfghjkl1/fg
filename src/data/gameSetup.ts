import { sampleAssets } from './assets';
import { sampleLifeEvents } from './lifeEvents';
import { sampleProfessions } from './professions';
import type { GameLength, GameSettings, GameState, Player } from '../types/game';
import type { GameSetupInput, SetupValidationResult } from '../types/setup';

const MIN_PLAYERS = 2;
const MAX_PLAYERS = 6;
const DEFAULT_PLAYER_NAMES = ['Player 1', 'Player 2'];

const gameLengthToEndingAge: Record<GameLength, number> = {
  short: 40,
  standard: 55,
  long: 70,
};

export const gameLengthOptions: Array<{ label: string; value: GameLength }> = [
  { label: 'Quick', value: 'short' },
  { label: 'Standard', value: 'standard' },
  { label: 'Long', value: 'long' },
];

export function getDefaultGameSetupInput(): GameSetupInput {
  return {
    playerCount: MIN_PLAYERS,
    playerNames: [...DEFAULT_PLAYER_NAMES],
    gameLength: 'standard',
  };
}

export function getTargetEndAge(gameLength: GameLength): number {
  return gameLengthToEndingAge[gameLength];
}

export function normalizePlayerNames(names: string[], playerCount: number): string[] {
  return Array.from({ length: playerCount }, (_, index) => {
    const cleaned = names[index]?.trim();
    return cleaned && cleaned.length > 0 ? cleaned : `Player ${index + 1}`;
  });
}

export function validateGameSetup(input: GameSetupInput): SetupValidationResult {
  const errors: string[] = [];

  if (input.playerCount < MIN_PLAYERS || input.playerCount > MAX_PLAYERS) {
    errors.push(`Player count must be between ${MIN_PLAYERS} and ${MAX_PLAYERS}.`);
  }

  const normalizedNames = normalizePlayerNames(input.playerNames, input.playerCount);
  const uniqueNames = new Set(normalizedNames.map((name) => name.toLowerCase()));

  if (uniqueNames.size !== normalizedNames.length) {
    errors.push('Player names must be unique.');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

function createGameSettings(gameLength: GameLength): GameSettings {
  return {
    gameLength,
    startingAge: 25,
    endingAge: getTargetEndAge(gameLength),
    playerOrderRandomized: true,
  };
}

function selectProfessionForPlayer(playerIndex: number) {
  const randomOffset = Math.floor(Math.random() * sampleProfessions.length);
  return sampleProfessions[(playerIndex + randomOffset) % sampleProfessions.length];
}

function createPlayer(id: string, name: string, professionId: string): Player {
  const profession = sampleProfessions.find((item) => item.id === professionId) ?? sampleProfessions[0];

  return {
    id,
    name,
    age: 25,
    professionId: profession.id,
    cash: profession.startingCash,
    salaryIncome: profession.baseSalary,
    passiveIncome: 0,
    fixedExpenses: profession.baseFixedExpenses,
    debts: [
      {
        id: `${id}-debt-student-loan`,
        name: 'Student Loan',
        principalRemaining: 12000,
        interestRateAnnual: 4.2,
        minimumPayment: 220,
      },
    ],
    stress: 5 + profession.stressModifier,
    freeTime: 5 + profession.freeTimeModifier,
    assetIds: [],
  };
}

function shuffle<T>(items: T[]): T[] {
  const shuffled = [...items];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
  }

  return shuffled;
}

export function createNewGameState(input: GameSetupInput): GameState {
  const normalizedNames = normalizePlayerNames(input.playerNames, input.playerCount);
  const playerIds = normalizedNames.map((_, index) => `player-${index + 1}`);
  const randomizedOrder = shuffle(playerIds);

  const players = randomizedOrder.map((playerId, turnIndex) => {
    const originalIndex = playerIds.indexOf(playerId);
    const profession = selectProfessionForPlayer(turnIndex);

    return createPlayer(playerId, normalizedNames[originalIndex], profession.id);
  });

  return {
    id: `game-${Date.now()}`,
    settings: createGameSettings(input.gameLength),
    turnNumber: 1,
    currentPlayerIndex: 0,
    currentPhase: 'startOfTurn',
    players,
    availableProfessions: sampleProfessions,
    availableAssets: sampleAssets,
    availableLifeEvents: sampleLifeEvents,
    log: [
      {
        id: 'log-1',
        turnNumber: 1,
        phase: 'startOfTurn',
        message: `Game created for ${players.length} players (${input.gameLength}).`,
        timestampIso: new Date().toISOString(),
      },
    ],
  };
}
