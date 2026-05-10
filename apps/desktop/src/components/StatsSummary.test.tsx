import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import StatsSummary from './StatsSummary';
import { PERSONALITIES } from '../personalities';

describe('StatsSummary', () => {
  const defaultProps = {
    petName: 'Buddy',
    petLevel: 5,
    totalCalories: 250,
    petCoins: 100,
    dailyMovements: 3,
    dailyStreakGoal: 5,
    careStreak: 3,
    dailyCalories: 20,
    totalMovements: 25,
    weeklyData: [
      { day: 'Sun', moves: 6, calories: 60 },
      { day: 'Mon', moves: 2, calories: 20 },
      { day: 'Tue', moves: 0, calories: 0 },
      { day: 'Wed', moves: 0, calories: 0 },
      { day: 'Thu', moves: 0, calories: 0 },
      { day: 'Fri', moves: 0, calories: 0 },
      { day: 'Sat', moves: 0, calories: 0 },
    ],
    appUsage: {},
    hunger: 80,
    hydration: 100,
    moodCategory: 'neutral' as const,
    energy: 100,
    energyCategory: 'full' as const,
    personalityData: PERSONALITIES[0],
    friendshipData: {
      value: 50,
      level: 3 as 1 | 2 | 3 | 4 | 5,
      title: "Close Friend",
      nextLevelValue: 75,
      multiplier: 1.1
    },
    happiness: 50,
    feedPet: vi.fn(),
    drinkWater: vi.fn(),
    toggleRest: vi.fn(),
    isResting: false,
    sleepScheduleEnabled: false,
    bedtime: "22:00",
    wakeTime: "07:00",
    trainingLevels: { energy: 0, xp: 0, coins: 0, hunger: 0 },
    activeTraining: null,
    cancelTraining: vi.fn(),
    openJournal: vi.fn(),
    openQuests: vi.fn(),
    openSkillTree: vi.fn(),
    openBreathing: vi.fn(),
    openAppUsageReport: vi.fn(),
    shareProgress: vi.fn(),
    isPaused: false,
    togglePause: vi.fn(),
    quietHoursActive: false
  };

  it('renders pet level and XP', () => {
    render(<StatsSummary {...defaultProps} />);
    expect(screen.getByText(/Buddy \(Level 5\)/)).toBeDefined();
    expect(screen.getByText(/XP: 0 \/ 50/)).toBeDefined();
    });

    it('renders and toggles pause tracking', () => {
    const togglePause = vi.fn();
    render(<StatsSummary {...defaultProps} togglePause={togglePause} />);

    const pauseBtn = screen.getByText('⏸️ Pause');
    expect(pauseBtn).toBeDefined();

    fireEvent.click(pauseBtn);
    expect(togglePause).toHaveBeenCalled();
    });

    it('renders resume button when paused', () => {
    render(<StatsSummary {...defaultProps} isPaused={true} />);
    expect(screen.getByText('▶️ Resume')).toBeDefined();
    });

  it('renders daily goal progress', () => {
    render(<StatsSummary {...defaultProps} />);
    expect(screen.getByText('Moves: 3 / 5')).toBeDefined();
  });

  it('renders all time stats', () => {
    render(<StatsSummary {...defaultProps} />);
    expect(screen.getByText('25')).toBeDefined(); // Total moves
    expect(screen.getByText('250')).toBeDefined(); // Total calories
  });

  it('renders streak dots and highlights active ones', () => {
    const { container } = render(<StatsSummary {...defaultProps} />);
    const activeDots = container.querySelectorAll('.streak-dot.active');
    expect(activeDots.length).toBe(1); // Only Sun (6 moves) >= goal (5)
  });

  it('calls feedPet when Feed button is clicked', () => {
    render(<StatsSummary {...defaultProps} />);
    const feedBtn = screen.getByText('🍖 Feed');
    fireEvent.click(feedBtn);
    expect(defaultProps.feedPet).toHaveBeenCalled();
  });

  it('calls openQuests when Pet Quests button is clicked', () => {
    render(<StatsSummary {...defaultProps} />);
    const questsBtn = screen.getByText(/Pet Quests/);
    fireEvent.click(questsBtn);
    expect(defaultProps.openQuests).toHaveBeenCalled();
  });
});
