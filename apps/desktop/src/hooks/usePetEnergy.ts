import { useLocalStorage } from "./useLocalStorage";
import { useEffect, useMemo } from "react";
import { PetState } from "../components/Pet";

export type EnergyCategory = "exhausted" | "tired" | "rested" | "full";

export function usePetEnergy(
  state: PetState,
  isMoving: boolean,
  hasEnergySurge: boolean = false,
  energyModifier: number = 1.0,
  energyTrainingLevel: number = 0,
  backgroundEnergyModifier: number = 1.0
) {
  const [energy, setEnergy] = useLocalStorage("move-pet-energy", 100);

  // Derived energy category
  const energyCategory = useMemo((): EnergyCategory => {
    if (energy < 20) return "exhausted";
    if (energy < 50) return "tired";
    if (energy < 85) return "rested";
    return "full";
  }, [energy]);

  const energyTrainingBoost = 1 - (Math.min(0.5, energyTrainingLevel * 0.05));

  // Energy consumption and recovery logic
  useEffect(() => {
    const interval = setInterval(() => {
      setEnergy(prev => {
        let change = 0;

        // Recovery states
        if (state === "sleeping") {
          change += 2; // Recover ~12% per minute while sleeping (was 10%)
        }
        else if (state === "idle" || state === "thinking") {
          change += 0.4; // Recover ~2.4% per minute (was 2%)
        } 
        // Consumption states
        else if (state === "happy" || state === "floating") {
          change -= (hasEnergySurge ? 0.2 : 0.5) * energyModifier * energyTrainingBoost * backgroundEnergyModifier;
        }
        else if (state === "disturbed" || state === "training") {
          change -= (hasEnergySurge ? 0.05 : 0.2) * energyModifier * energyTrainingBoost * backgroundEnergyModifier;
        }

        // Extra drain while moving
        if (isMoving) {
          change -= (hasEnergySurge ? 0.1 : 0.4) * energyModifier * energyTrainingBoost * backgroundEnergyModifier;
        }

        return Math.min(100, Math.max(0, prev + change));
      });
    }, 10000); // Update every 10 seconds for more responsive dynamics

    return () => clearInterval(interval);
  }, [state, isMoving, setEnergy, hasEnergySurge, energyModifier, energyTrainingBoost, backgroundEnergyModifier]);

  const boostEnergy = (amount: number) => {
    setEnergy(prev => Math.min(100, prev + amount));
  };

  return {
    energy,
    energyCategory,
    boostEnergy,
    setEnergy
  };
}
