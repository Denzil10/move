import { describe, it, expect } from 'vitest';
import { MOVEMENT_PROMPTS, getRandomPrompt } from './prompts';

describe('prompts', () => {
  it('should have a list of prompts', () => {
    expect(MOVEMENT_PROMPTS.length).toBeGreaterThan(0);
  });

  it('should return a random prompt', () => {
    const prompt = getRandomPrompt();
    expect(prompt).toBeDefined();
    expect(MOVEMENT_PROMPTS).toContain(prompt);
  });

  it('each prompt should have required fields', () => {
    MOVEMENT_PROMPTS.forEach(prompt => {
      expect(prompt.id).toBeDefined();
      expect(prompt.text).toBeDefined();
      expect(prompt.description).toBeDefined();
      expect(prompt.category).toBeDefined();
      expect(prompt.baseDuration).toBeGreaterThan(0);
    });
  });
});
