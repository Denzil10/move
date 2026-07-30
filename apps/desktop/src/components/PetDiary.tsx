import React, { useState } from "react";
import "./PetDiary.css";

export interface DiaryEntry {
  id: string;
  date: string;
  text: string;
  mood: string;
  level: number;
}

interface PetDiaryProps {
  entries: DiaryEntry[];
  onAddEntry: (text: string, mood: string) => void;
  onDeleteEntry: (id: string) => void;
  currentMood: string;
  currentLevel: number;
}

const PetDiary: React.FC<PetDiaryProps> = ({ 
  entries, 
  onAddEntry, 
  onDeleteEntry,
  currentMood,
  currentLevel
}) => {
  const [newEntryText, setNewEntryText] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newEntryText.trim()) {
      onAddEntry(newEntryText.trim(), currentMood);
      setNewEntryText("");
      setIsAdding(false);
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(undefined, { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="pet-diary">
      <div className="diary-header">
        <h3>Pet Diary</h3>
        {!isAdding && (
          <button className="add-entry-btn" onClick={() => setIsAdding(true)}>
            + New Entry
          </button>
        )}
      </div>

      {isAdding && (
        <form className="add-entry-form" onSubmit={handleSubmit}>
          <textarea
            autoFocus
            placeholder="How's your pet doing today? Any special moments?"
            value={newEntryText}
            onChange={(e) => setNewEntryText(e.target.value)}
          />
          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={() => setIsAdding(false)}>
              Cancel
            </button>
            <button type="submit" className="save-btn" disabled={!newEntryText.trim()}>
              Save Memory
            </button>
          </div>
        </form>
      )}

      <div className="entries-list">
        {entries.length === 0 ? (
          <p className="no-entries">No memories recorded yet. Start your journey!</p>
        ) : (
          entries.map((entry) => (
            <div key={entry.id} className="diary-entry">
              <div className="entry-header">
                <span className="entry-date">{formatDate(entry.date)}</span>
                <span className="entry-level">Lv. {entry.level}</span>
                <span className="entry-mood-icon">{entry.mood === "joyful" ? "😊" : entry.mood === "content" ? "🙂" : entry.mood === "grumpy" ? "😠" : "😐"}</span>
                <span className="current-level-hint">(You: Lv. {currentLevel})</span>
                <button 
                  className="delete-entry-btn" 
                  onClick={() => onDeleteEntry(entry.id)}
                  title="Delete entry" aria-label="Delete entry"
                >
                  &times;
                </button>
              </div>
              <div className="entry-text">{entry.text}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PetDiary;
