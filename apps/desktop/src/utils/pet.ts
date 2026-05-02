export interface AnimationState {
  frames: number[][];
  frameRate: number;
}

export interface PetConfig {
  name: string;
  version: string;
  animations: Record<string, AnimationState>;
}

export async function fetchPetConfig(petId: string = 'default'): Promise<PetConfig> {
  const response = await fetch(`/pets/${petId}/pet.json`);
  if (!response.ok) {
    throw new Error(`Failed to load config for pet ${petId}`);
  }
  return response.json();
}
