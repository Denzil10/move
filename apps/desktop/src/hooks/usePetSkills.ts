import { useLocalStorage } from "./useLocalStorage";
import { SKILLS, Skill } from "../skills";

export function usePetSkills() {
  const [unlockedSkills, setUnlockedSkills] = useLocalStorage<string[]>("move-pet-unlocked-skills", []);

  const unlockSkill = (skillId: string, currentLevel: number, currentCoins: number): { success: boolean; error?: string } => {
    const skill = SKILLS.find(s => s.id === skillId);
    if (!skill) return { success: false, error: "Skill not found" };

    if (unlockedSkills.includes(skillId)) {
      return { success: false, error: "Skill already unlocked" };
    }

    if (currentLevel < skill.requiredLevel) {
      return { success: false, error: `Requires Level ${skill.requiredLevel}` };
    }

    if (currentCoins < skill.cost) {
      return { success: false, error: `Requires ${skill.cost} Pet Coins` };
    }

    if (skill.prerequisites) {
      const missingPrereq = skill.prerequisites.find(p => !unlockedSkills.includes(p));
      if (missingPrereq) {
        const prereqName = SKILLS.find(s => s.id === missingPrereq)?.name || missingPrereq;
        return { success: false, error: `Requires ${prereqName}` };
      }
    }

    setUnlockedSkills(prev => [...prev, skillId]);
    return { success: true };
  };

  const getSkillMultiplier = (type: Skill['effect']['type']): number => {
    const relevantSkills = SKILLS.filter(s => s.effect.type === type && unlockedSkills.includes(s.id));
    return relevantSkills.reduce((acc, s) => acc + s.effect.value, 0);
  };

  return {
    unlockedSkills,
    unlockSkill,
    getSkillMultiplier
  };
}
