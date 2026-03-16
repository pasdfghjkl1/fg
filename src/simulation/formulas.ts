import type { Debt, Player } from '../types/game';

export const STRESS_MIN = 0;
export const STRESS_MAX = 10;
export const FREE_TIME_MIN = 0;
export const FREE_TIME_MAX = 10;

export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

export function roundCurrency(value: number): number {
  return Math.round(value * 100) / 100;
}

export function calculateTotalDebtPrincipal(debts: Debt[]): number {
  return debts.reduce((sum, debt) => sum + Math.max(0, debt.principalRemaining), 0);
}

export function calculateDebtToIncomeRatio(totalDebtPrincipal: number, annualIncome: number): number {
  if (annualIncome <= 0) {
    return totalDebtPrincipal > 0 ? 1 : 0;
  }

  return totalDebtPrincipal / annualIncome;
}

export function calculateLiquidityRatio(cash: number, annualFixedExpenses: number): number {
  if (annualFixedExpenses <= 0) {
    return cash > 0 ? 1 : 0;
  }

  return cash / annualFixedExpenses;
}

export function calculateStress(player: Pick<Player, 'stress' | 'cash' | 'salaryIncome' | 'passiveIncome' | 'fixedExpenses' | 'debts'>): number {
  const annualIncome = Math.max(0, player.salaryIncome + player.passiveIncome);
  const totalDebtPrincipal = calculateTotalDebtPrincipal(player.debts);
  const debtToIncomeRatio = calculateDebtToIncomeRatio(totalDebtPrincipal, annualIncome);
  const liquidityRatio = calculateLiquidityRatio(player.cash, player.fixedExpenses);

  let nextStress = player.stress;

  if (debtToIncomeRatio > 1.5) nextStress += 1.5;
  else if (debtToIncomeRatio > 1.0) nextStress += 1;
  else if (debtToIncomeRatio > 0.5) nextStress += 0.5;

  if (liquidityRatio < 0) nextStress += 2;
  else if (liquidityRatio < 0.25) nextStress += 1;
  else if (liquidityRatio < 0.5) nextStress += 0.5;

  if (player.cash < 0) nextStress += 1;

  return clamp(nextStress, STRESS_MIN, STRESS_MAX);
}

export function calculateFreeTime(player: Pick<Player, 'freeTime' | 'salaryIncome' | 'passiveIncome'>): number {
  const annualIncome = Math.max(0, player.salaryIncome + player.passiveIncome);
  const passiveShare = annualIncome > 0 ? player.passiveIncome / annualIncome : 0;

  let nextFreeTime = player.freeTime;

  if (passiveShare >= 0.7) nextFreeTime += 1.5;
  else if (passiveShare >= 0.4) nextFreeTime += 1;
  else if (passiveShare >= 0.2) nextFreeTime += 0.5;

  if (passiveShare < 0.1) nextFreeTime -= 0.75;

  return clamp(nextFreeTime, FREE_TIME_MIN, FREE_TIME_MAX);
}
