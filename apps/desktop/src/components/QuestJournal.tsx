import React, { useState } from 'react';
import { Quest, CompletedQuest } from '../quests';
import './QuestJournal.css';

interface QuestJournalProps {
  quests: Quest[];
  history: CompletedQuest[];
  onClaimReward: (questId: string) => void;
  onNewQuest: () => void;
  onRerollQuest: (questId: string) => void;
  onClose: () => void;
}

const QuestJournal: React.FC<QuestJournalProps> = ({ 
  quests, 
  history, 
  onClaimReward, 
  onNewQuest, 
  onRerollQuest, 
  onClose 
}) => {
  const [activeTab, setActiveTab] = useState<'active' | 'history'>('active');

  return (
    <div className="quest-journal-overlay">
      <div className="quest-journal-content">
        <div className="quest-journal-header">
          <h2>Quest Journal</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="quest-tabs">
          <button 
            className={`tab-btn ${activeTab === 'active' ? 'active' : ''}`}
            onClick={() => setActiveTab('active')}
          >
            Active Quests ({quests.length})
          </button>
          <button 
            className={`tab-btn ${activeTab === 'history' ? 'active' : ''}`}
            onClick={() => setActiveTab('history')}
          >
            History ({history.length})
          </button>
        </div>

        {activeTab === 'active' ? (
          <div className="quests-list">
            {quests.length === 0 ? (
              <div className="no-quests">
                <p>No active quests at the moment.</p>
                <button className="get-quest-btn" onClick={onNewQuest}>Get New Quest</button>
              </div>
            ) : (
              quests.map(quest => {
                const progress = Math.min((quest.currentValue / quest.targetValue) * 100, 100);
                
                return (
                  <div key={quest.id} className={`quest-item ${quest.completed ? 'completed' : ''}`}>
                    <div className="quest-item-info">
                      <div className="quest-item-title">
                        {quest.title}
                        {quest.completed && <span className="done-badge">READY</span>}
                      </div>
                      <div className="quest-item-desc">{quest.description}</div>
                    </div>

                    <div className="quest-item-progress">
                      <div className="progress-bar-container">
                        <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
                      </div>
                      <div className="progress-text">
                        {Math.floor(quest.currentValue)} / {quest.targetValue}
                      </div>
                    </div>

                    <div className="quest-item-footer">
                      <div className="quest-rewards">
                        💰 {quest.rewardCoins} | ⭐ {quest.rewardXP} XP
                      </div>
                      <div className="quest-actions">
                        {!quest.completed && (
                          <button 
                            className="reroll-btn" 
                            onClick={() => onRerollQuest(quest.id)}
                            title="Reroll quest for 20 coins"
                          >
                            🔄 Reroll (20 💰)
                          </button>
                        )}
                        {quest.completed ? (
                          <button className="claim-btn" onClick={() => onClaimReward(quest.id)}>
                            Claim
                          </button>
                        ) : (
                          <div className="in-progress">In Progress...</div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
            
            {quests.length > 0 && quests.length < 3 && (
              <button className="add-quest-btn" onClick={onNewQuest}>
                + Get Another Quest
              </button>
            )}
          </div>
        ) : (
          <div className="history-list">
            {history.length === 0 ? (
              <div className="no-history">
                <p>No completed quests yet. Start moving!</p>
              </div>
            ) : (
              history.map(quest => (
                <div key={quest.id} className="history-item">
                  <div className="history-item-header">
                    <span className="history-item-title">{quest.title}</span>
                    <span className="history-item-date">
                      {new Date(quest.completedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="history-item-desc">{quest.description}</div>
                  <div className="history-item-rewards">
                    Earned: 💰 {quest.rewardCoins} | ⭐ {quest.rewardXP} XP
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestJournal;
