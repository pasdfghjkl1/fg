import type { GameLength } from './game';

export interface GameSetupInput {
  playerCount: number;
  playerNames: string[];
  gameLength: GameLength;
}

export interface SetupValidationResult {
  isValid: boolean;
  errors: string[];
}
