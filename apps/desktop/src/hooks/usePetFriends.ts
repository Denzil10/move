import { useState, useEffect } from "react";

export interface PetFriend {
  id: string;
  name: string;
  species: string;
  icon: string;
  color: string;
  buffType: "xp" | "coins" | "energy" | "mood";
  buffValue: number;
  durationMinutes: number;
  thought: string;
}

export const PET_FRIENDS: PetFriend[] = [
  {
    id: "sparky",
    name: "Sparky",
    species: "Electric Eel",
    icon: "⚡",
    color: "#f1c40f",
    buffType: "energy",
    buffValue: 1.5,
    durationMinutes: 30,
    thought: "I'm so energized after meeting Sparky!"
  },
  {
    id: "bubbles",
    name: "Bubbles",
    species: "Sea Turtle",
    icon: "🐢",
    color: "#3498db",
    buffType: "mood",
    buffValue: 1.2,
    durationMinutes: 60,
    thought: "Bubbles taught me how to stay calm and happy."
  },
  {
    id: "flame",
    name: "Flame",
    species: "Fire Fox",
    icon: "🔥",
    color: "#e67e22",
    buffType: "xp",
    buffValue: 1.3,
    durationMinutes: 45,
    thought: "Flame's passion is contagious! I'm learning so fast!"
  },
  {
    id: "lucky",
    name: "Lucky",
    species: "Golden Cat",
    icon: "🐱",
    color: "#f1c40f",
    buffType: "coins",
    buffValue: 1.5,
    durationMinutes: 15,
    thought: "Lucky brought me some good fortune!"
  }
];

export const usePetFriends = () => {
  const [activeFriend, setActiveFriend] = useState<PetFriend | null>(null);
  const [friendExpiry, setFriendExpiry] = useState<number | null>(null);

  useEffect(() => {
    const savedFriend = localStorage.getItem("move-pet-active-friend");
    const savedExpiry = localStorage.getItem("move-pet-friend-expiry");
    
    if (savedFriend && savedExpiry) {
      const expiry = parseInt(savedExpiry);
      if (Date.now() < expiry) {
        setActiveFriend(JSON.parse(savedFriend));
        setFriendExpiry(expiry);
      } else {
        localStorage.removeItem("move-pet-active-friend");
        localStorage.removeItem("move-pet-friend-expiry");
      }
    }
  }, []);

  useEffect(() => {
    if (friendExpiry) {
      const timeout = setTimeout(() => {
        setActiveFriend(null);
        setFriendExpiry(null);
        localStorage.removeItem("move-pet-active-friend");
        localStorage.removeItem("move-pet-friend-expiry");
      }, friendExpiry - Date.now());
      return () => clearTimeout(timeout);
    }
  }, [friendExpiry]);

  const meetFriend = () => {
    const friend = PET_FRIENDS[Math.floor(Math.random() * PET_FRIENDS.length)];
    const expiry = Date.now() + friend.durationMinutes * 60 * 1000;
    
    setActiveFriend(friend);
    setFriendExpiry(expiry);
    
    localStorage.setItem("move-pet-active-friend", JSON.stringify(friend));
    localStorage.setItem("move-pet-friend-expiry", expiry.toString());
    
    return friend;
  };

  return { activeFriend, meetFriend };
};
