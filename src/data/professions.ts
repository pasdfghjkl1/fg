import type { Profession } from '../types/game';

export const sampleProfessions: Profession[] = [
  {
    id: 'profession-teacher',
    name: 'Teacher',
    baseSalary: 3800,
    startingCash: 3000,
    baseFixedExpenses: 2200,
    stressModifier: 0,
    freeTimeModifier: 1,
    description: 'Steady salary and predictable growth with moderate lifestyle costs.',
  },
  {
    id: 'profession-software-engineer',
    name: 'Software Engineer',
    baseSalary: 6200,
    startingCash: 4500,
    baseFixedExpenses: 2900,
    stressModifier: 1,
    freeTimeModifier: -1,
    description: 'High income potential with higher stress and tighter time budget.',
  },
  {
    id: 'profession-nurse',
    name: 'Nurse',
    baseSalary: 4800,
    startingCash: 3500,
    baseFixedExpenses: 2500,
    stressModifier: 1,
    freeTimeModifier: 0,
    description: 'Reliable profession with good growth and average expenses.',
  },
  {
    id: 'profession-small-business-owner',
    name: 'Small Business Owner',
    baseSalary: 5200,
    startingCash: 2500,
    baseFixedExpenses: 3000,
    stressModifier: 2,
    freeTimeModifier: -2,
    description: 'Flexible upside, but with time pressure and higher cost baseline.',
  },
];
