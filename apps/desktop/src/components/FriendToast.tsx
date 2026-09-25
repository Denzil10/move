import React from "react";
import { PetFriend } from "../hooks/usePetFriends";
import "./VictoryToast.css"; // Reuse VictoryToast styles for consistency

interface FriendToastProps {
  friend: PetFriend;
  onClose: () => void;
}

const FriendToast: React.FC<FriendToastProps> = ({ friend, onClose }) => {
  return (
    <div className="victory-toast gift-toast" style={{ borderColor: friend.color }}>
      <div className="victory-icon" style={{ fontSize: "2rem" }}>{friend.icon}</div>
      <div className="victory-content">
        <h3>New Friend!</h3>
        <p>You met <strong>{friend.name}</strong> ({friend.species})!</p>
        <p className="gift-toast-buff">
          Effect: +{Math.round((friend.buffValue - 1) * 100)}% {friend.buffType} for {friend.durationMinutes}m
        </p>
      </div>
      <button className="victory-close" aria-label="Close" onClick={onClose} style={{ top: '10px', right: '10px' }}>×</button>
    </div>
  );
};

export default FriendToast;
