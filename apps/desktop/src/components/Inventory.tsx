import React from 'react';
import { Item, ITEMS } from '../items';
import './Inventory.css';

interface InventoryProps {
  inventory: Record<string, number>;
  onUseItem: (itemId: string) => void;
  petCoins: number;
}

const Inventory: React.FC<InventoryProps> = ({ inventory, onUseItem, petCoins }) => {
  const inventoryItems = Object.entries(inventory)
    .filter(([_, count]) => count > 0)
    .map(([id, count]) => {
      const item = ITEMS.find(i => i.id === id);
      return { item, count };
    })
    .filter(entry => entry.item !== undefined) as { item: Item, count: number }[];

  return (
    <div className="inventory-container">
      <h3>Inventory</h3>
      <div className="inventory-coins">
        💰 {petCoins} Pet Coins
      </div>
      
      {inventoryItems.length === 0 ? (
        <p className="empty-inventory">Your inventory is empty. Visit the Pet Store!</p>
      ) : (
        <div className="inventory-grid">
          {inventoryItems.map(({ item, count }) => (
            <div key={item.id} className="inventory-item" title={item.description}>
              <div className="item-icon">{item.icon}</div>
              <div className="item-details">
                <div className="item-name">{item.name}</div>
                <div className="item-count">x{count}</div>
              </div>
              <button 
                className="use-item-btn"
                onClick={() => onUseItem(item.id)}
              >
                Use
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Inventory;
