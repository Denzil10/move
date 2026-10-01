import React from 'react';
import { SKILLS, Skill } from '../skills';
import './SkillTree.css';

interface SkillTreeProps {
  unlockedSkills: string[];
  currentLevel: number;
  currentCoins: number;
  onUnlock: (skillId: string) => void;
  onClose: () => void;
}

const SkillTree: React.FC<SkillTreeProps> = ({
  unlockedSkills,
  currentLevel,
  currentCoins,
  onUnlock,
  onClose
}) => {
  const isUnlocked = (id: string) => unlockedSkills.includes(id);
  const canUnlock = (skill: Skill) => {
    if (isUnlocked(skill.id)) return false;
    if (currentLevel < skill.requiredLevel) return false;
    if (currentCoins < skill.cost) return false;
    if (skill.prerequisites && !skill.prerequisites.every(p => unlockedSkills.includes(p))) return false;
    return true;
  };

  return (
    <div className="skill-tree-overlay">
      <div className="skill-tree-content">
        <div className="skill-tree-header">
          <h2>Pet Skill Tree 🌳</h2>
          <div className="skill-tree-stats">
            <span>Level {currentLevel}</span>
            <span>{currentCoins} 💰</span>
          </div>
          <button className="close-button" onClick={onClose} aria-label="Close">×</button>
        </div>

        <div className="skills-grid">
          {SKILLS.map(skill => {
            const unlocked = isUnlocked(skill.id);
            const available = canUnlock(skill);
            const levelLocked = currentLevel < skill.requiredLevel;
            const coinLocked = currentCoins < skill.cost;

            return (
              <div 
                key={skill.id} 
                className={`skill-card ${unlocked ? 'unlocked' : ''} ${available ? 'available' : 'locked'}`}
              >
                <div className="skill-icon">{skill.icon}</div>
                <div className="skill-info">
                  <h3>{skill.name}</h3>
                  <p>{skill.description}</p>
                  {!unlocked && (
                    <div className="skill-requirements">
                      <span className={levelLocked ? 'req-failed' : 'req-passed'}>
                        Lvl {skill.requiredLevel}
                      </span>
                      <span className={coinLocked ? 'req-failed' : 'req-passed'}>
                        {skill.cost} 💰
                      </span>
                      {skill.prerequisites && (
                        <div className="prereqs">
                          {skill.prerequisites.map(p => {
                            const pName = SKILLS.find(s => s.id === p)?.name || p;
                            return (
                              <span key={p} className={unlockedSkills.includes(p) ? 'req-passed' : 'req-failed'}>
                                Needs {pName}
                              </span>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}
                  {available && (
                    <button className="unlock-button" onClick={() => onUnlock(skill.id)}>
                      Unlock Skill
                    </button>
                  )}
                  {unlocked && <div className="unlocked-tag">ACTIVE</div>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SkillTree;
