import React, { useEffect, useState } from 'react';
import './VictoryToast.css'; // Reusing styles for consistency

interface GiftToastProps {
  itemName: string;
  itemIcon: string;
  onClose: () => void;
}

const GiftToast: React.FC<GiftToastProps> = ({ itemName, itemIcon, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 500); // Wait for fade out
    }, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  if (!visible) return null;

  return (
    <div className="victory-toast gift-toast">
      <div className="victory-icon">{itemIcon}</div>
      <div className="victory-content">
        <h3>Gift Found!</h3>
        <p>You found a <strong>{itemName}</strong> while moving!</p>
      </div>
    </div>
  );
};

export default GiftToast;
