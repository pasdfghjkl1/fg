export type Id = string;

export type AssetCategory =
  | 'realEstate'
  | 'stocks'
  | 'business'
  | 'education'
  | 'vehicle'
  | 'other';

export type TurnPhase =
  | 'startOfTurn'
  | 'finance'
  | 'event'
  | 'action'
  | 'endTurn';

export type GameLength = 'short' | 'standard' | 'long';

export interface Profession {
  id: Id;
  name: string;
  baseSalary: number;
  startingCash: number;
  baseFixedExpenses: number;
  stressModifier: number;
  freeTimeModifier: number;
  description?: string;
}

export interface Asset {
  id: Id;
  name: string;
  category: AssetCategory;
  purchaseCost: number;
  monthlyIncome: number;
  maintenanceCost: number;
  riskLevel: 1 | 2 | 3 | 4 | 5;
  description?: string;
}

export interface Debt {
  id: Id;
  name: string;
  principalRemaining: number;
  interestRateAnnual: number;
  minimumPayment: number;
}

export interface LifeEvent {
  id: Id;
  title: string;
  description: string;
  ageMin?: number;
  ageMax?: number;
  cashDelta?: number;
  stressDelta?: number;
  freeTimeDelta?: number;
}

export interface ScoreBreakdown {
  netWorthScore: number;
  incomeQualityScore: number;
  portfolioQualityScore: number;
  freeTimeScore: number;
  stressScore: number;
  totalScore: number;
}

export interface EndgameResult {
  playerId: Id;
  rank: number;
  finalNetWorth: number;
  score: ScoreBreakdown;
}

export interface LogEntry {
  id: Id;
  turnNumber: number;
  playerId?: Id;
  phase: TurnPhase;
  message: string;
  timestampIso: string;
}

export interface GameSettings {
  gameLength: GameLength;
  startingAge: number;
  endingAge: number;
  playerOrderRandomized: boolean;
}

export interface Player {
  id: Id;
  name: string;
  age: number;
  professionId: Profession['id'];
  cash: number;
  salaryIncome: number;
  passiveIncome: number;
  fixedExpenses: number;
  debts: Debt[];
  stress: number;
  freeTime: number;
  assetIds: Asset['id'][];
}

export interface GameState {
  id: Id;
  settings: GameSettings;
  turnNumber: number;
  currentPlayerIndex: number;
  currentPhase: TurnPhase;
  players: Player[];
  availableProfessions: Profession[];
  availableAssets: Asset[];
  availableLifeEvents: LifeEvent[];
  log: LogEntry[];
  endgameResults?: EndgameResult[];
}
