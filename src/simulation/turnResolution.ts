import type { Debt, Player } from '../types/game';
import { calculateFreeTime, calculateStress, clamp, FREE_TIME_MAX, FREE_TIME_MIN, roundCurrency, STRESS_MAX, STRESS_MIN } from './formulas';

const MONTHS_PER_YEAR = 12;

export interface YearlyImpact {
  cashDelta?: number;
  stressDelta?: number;
  freeTimeDelta?: number;
}

export interface DebtPaymentResult {
  debts: Debt[];
  totalDebtPayment: number;
  totalInterestAccrued: number;
}

export interface YearResolutionWarnings {
  cashBelowZero: boolean;
  stressCritical: boolean;
}

export interface YearResolutionResult {
  player: Player;
  warnings: YearResolutionWarnings;
  breakdown: {
    incomeApplied: number;
    fixedExpensesApplied: number;
    debtPaymentsApplied: number;
    debtInterestApplied: number;
    eventCashImpactApplied: number;
    assetCashImpactApplied: number;
  };
}

export function applyIncome(player: Player): Player {
  const totalIncome = player.salaryIncome + player.passiveIncome;
  return {
    ...player,
    cash: roundCurrency(player.cash + totalIncome),
  };
}

export function applyFixedExpenses(player: Player): Player {
  return {
    ...player,
    cash: roundCurrency(player.cash - player.fixedExpenses),
  };
}

export function applyDebtPayments(debts: Debt[], availableCash: number): DebtPaymentResult {
  let remainingCash = availableCash;
  let totalDebtPayment = 0;
  let totalInterestAccrued = 0;

  const updatedDebts = debts.map((debt) => {
    const principalBeforeInterest = Math.max(0, debt.principalRemaining);
    const interestAccrued = roundCurrency((principalBeforeInterest * debt.interestRateAnnual) / 100);
    const principalAfterInterest = principalBeforeInterest + interestAccrued;

    const scheduledPaymentAnnual = roundCurrency(debt.minimumPayment * MONTHS_PER_YEAR);
    const scheduledPayment = Math.min(scheduledPaymentAnnual, principalAfterInterest);
    const paidAmount = Math.max(0, Math.min(scheduledPayment, remainingCash));

    remainingCash = roundCurrency(remainingCash - paidAmount);
    totalDebtPayment = roundCurrency(totalDebtPayment + paidAmount);
    totalInterestAccrued = roundCurrency(totalInterestAccrued + interestAccrued);

    return {
      ...debt,
      principalRemaining: roundCurrency(Math.max(0, principalAfterInterest - paidAmount)),
    };
  });

  return {
    debts: updatedDebts,
    totalDebtPayment,
    totalInterestAccrued,
  };
}

export function applyCashImpact(player: Player, cashDelta: number): Player {
  return {
    ...player,
    cash: roundCurrency(player.cash + cashDelta),
  };
}

export function applyYearlyTurn(
  player: Player,
  eventImpact: YearlyImpact = {},
  assetImpact: YearlyImpact = {},
): YearResolutionResult {
  const incomeApplied = player.salaryIncome + player.passiveIncome;

  const agedPlayer: Player = {
    ...player,
    age: player.age + 1,
  };

  const postIncome = applyIncome(agedPlayer);
  const postExpenses = applyFixedExpenses(postIncome);

  const debtPaymentResult = applyDebtPayments(postExpenses.debts, postExpenses.cash);
  const postDebt: Player = {
    ...postExpenses,
    debts: debtPaymentResult.debts,
    cash: roundCurrency(postExpenses.cash - debtPaymentResult.totalDebtPayment),
  };

  const eventCashImpact = eventImpact.cashDelta ?? 0;
  const assetCashImpact = assetImpact.cashDelta ?? 0;

  const postEventCash = applyCashImpact(postDebt, eventCashImpact);
  const postAssetCash = applyCashImpact(postEventCash, assetCashImpact);

  const stressWithImpacts =
    postAssetCash.stress +
    (eventImpact.stressDelta ?? 0) +
    (assetImpact.stressDelta ?? 0);

  const freeTimeWithImpacts =
    postAssetCash.freeTime +
    (eventImpact.freeTimeDelta ?? 0) +
    (assetImpact.freeTimeDelta ?? 0);

  const postDirectImpacts: Player = {
    ...postAssetCash,
    stress: clamp(stressWithImpacts, STRESS_MIN, STRESS_MAX),
    freeTime: clamp(freeTimeWithImpacts, FREE_TIME_MIN, FREE_TIME_MAX),
  };

  const resolvedPlayer: Player = {
    ...postDirectImpacts,
    stress: calculateStress(postDirectImpacts),
    freeTime: calculateFreeTime(postDirectImpacts),
  };

  const warnings: YearResolutionWarnings = {
    cashBelowZero: resolvedPlayer.cash < 0,
    stressCritical: resolvedPlayer.stress >= 9,
  };

  return {
    player: resolvedPlayer,
    warnings,
    breakdown: {
      incomeApplied: roundCurrency(incomeApplied),
      fixedExpensesApplied: roundCurrency(postIncome.fixedExpenses),
      debtPaymentsApplied: debtPaymentResult.totalDebtPayment,
      debtInterestApplied: debtPaymentResult.totalInterestAccrued,
      eventCashImpactApplied: roundCurrency(eventCashImpact),
      assetCashImpactApplied: roundCurrency(assetCashImpact),
    },
  };
}
