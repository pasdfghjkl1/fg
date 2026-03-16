import type { LifeEvent } from '../types/game';

export const sampleLifeEvents: LifeEvent[] = [
  {
    id: 'event-home-repair',
    title: 'Unexpected Home Repair',
    description: 'A major appliance broke and must be replaced immediately.',
    cashDelta: -1200,
    stressDelta: 1,
    freeTimeDelta: -1,
  },
  {
    id: 'event-performance-bonus',
    title: 'Performance Bonus',
    description: 'Strong performance at work earns you a one-time bonus.',
    cashDelta: 1800,
    stressDelta: 0,
    freeTimeDelta: 0,
  },
  {
    id: 'event-family-vacation',
    title: 'Family Vacation',
    description: 'You take a break and spend quality time with loved ones.',
    cashDelta: -900,
    stressDelta: -2,
    freeTimeDelta: 2,
  },
  {
    id: 'event-career-networking',
    title: 'Career Networking Opportunity',
    description: 'You invest time and money in networking that may pay off later.',
    cashDelta: -500,
    stressDelta: 1,
    freeTimeDelta: -1,
  },
];
