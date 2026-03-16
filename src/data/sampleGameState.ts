import { sampleAssets } from './assets';
import { sampleLifeEvents } from './lifeEvents';
import { sampleProfessions } from './professions';
import type { GameLength, GameSettings, GameState, Player } from '../types/game';

const gameLengthToEndingAge: Record<GameLength, number> = {
  short: 45,
  standard: 55,
  long: 65,
};

export function createDefaultGameSettings(gameLength: GameLength = 'standard'): GameSettings {
  return {
    gameLength,
    startingAge: 25,
    endingAge: gameLengthToEndingAge[gameLength],
    playerOrderRandomized: false,
  };
}

export function createSamplePlayer(id: string, name: string, professionId: string): Player {
  const profession = sampleProfessions.find((item) => item.id === professionId);

  if (!profession) {
    throw new Error(`Profession with id "${professionId}" not found.`);
  }

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

export function createSampleGameState(): GameState {
  const players: Player[] = [
    createSamplePlayer('player-1', 'Alex', 'profession-teacher'),
    createSamplePlayer('player-2', 'Jordan', 'profession-software-engineer'),
  ];

  return {
    id: 'game-sample-001',
    settings: createDefaultGameSettings('standard'),
    turnNumber: 1,
    currentPlayerIndex: 0,
    currentPhase: 'startOfTurn',
    players,
    availableProfessions: [...sampleProfessions],
    availableAssets: [...sampleAssets],
    availableLifeEvents: [...sampleLifeEvents],
    log: [
      {
        id: 'log-1',
        turnNumber: 1,
        phase: 'startOfTurn',
        message: 'Game initialized with sample players.',
        timestampIso: new Date('2026-01-01T10:00:00.000Z').toISOString(),
      },
    ],
  };
}
