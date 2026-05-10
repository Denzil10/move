import React from "react";
import { ITEMS } from "../items";
import "./PetShop.css";

interface PetShopProps {
  petCoins: number;
  onBuyItem: (itemId: string) => void;
}

const PetShop: React.FC<PetShopProps> = ({ petCoins, onBuyItem }) => {
  return (
    <div className="pet-shop">
      <h3>Consumables Shop</h3>
      <div className="shop-grid">
        {ITEMS.map(item => (
          <div 
            key={item.id} 
            className="shop-item"
            onClick={() => onBuyItem(item.id)}
          >
            <div className="item-preview">
              <span className="item-icon">{item.icon}</span>
            </div>
            <div className="item-info">
              <div className="item-name">{item.name}</div>
              <div className="item-description">{item.description}</div>
              <div className="item-price">
                <span className={petCoins >= item.price ? "can-afford" : "too-expensive"}>
                  💰 {item.price}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PetShop;
