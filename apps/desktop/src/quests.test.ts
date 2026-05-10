import { describe, it, expect } from 'vitest';
import { QUEST_TEMPLATES, generateRandomQuest } from './quests';

describe('Quests', () => {
  it('should have all target types accounted for in templates', () => {
    const targetTypes = new Set(QUEST_TEMPLATES.map(t => t.targetType));
    expect(targetTypes.has('movement')).toBe(true);
    expect(targetTypes.has('calories')).toBe(true);
    expect(targetTypes.has('time')).toBe(true);
    expect(targetTypes.has('interactions')).toBe(true);
    expect(targetTypes.has('items')).toBe(true);
    expect(targetTypes.has('shopping')).toBe(true);
    expect(targetTypes.has('sleep')).toBe(true);
    expect(targetTypes.has('chat')).toBe(true);
  });

  it('should generate a random quest with expected properties', () => {
    const quest = generateRandomQuest();
    expect(quest.id).toBeDefined();
    expect(quest.title).toBeDefined();
    expect(quest.description).toBeDefined();
    expect(quest.targetValue).toBeGreaterThan(0);
    expect(quest.currentValue).toBe(0);
    expect(quest.completed).toBe(false);
    expect(quest.claimed).toBe(false);
  });

  it('should not generate a quest from existing template IDs if possible', () => {
    const allIds = QUEST_TEMPLATES.map(t => t.id);
    const existingIds = allIds.slice(0, allIds.length - 1);
    const quest = generateRandomQuest(existingIds);
    expect(quest.templateId).toBe(allIds[allIds.length - 1]);
  });
});
