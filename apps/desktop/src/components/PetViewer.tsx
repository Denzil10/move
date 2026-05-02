import { useEffect, useRef, useState } from 'react';
import { GameState } from '../hooks/useGameState';
import { PetConfig, fetchPetConfig } from '../utils/pet';

interface PetViewerProps {
  state: GameState;
  petId?: string;
}

export function PetViewer({ state, petId = 'default' }: PetViewerProps) {
  const [config, setConfig] = useState<PetConfig | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const frameIndexRef = useRef(0);
  const lastDrawTimeRef = useRef(0);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    async function loadPet() {
      try {
        const petConfig = await fetchPetConfig(petId);
        setConfig(petConfig);

        const img = new Image();
        img.src = `/pets/${petId}/spritesheet.webp`;
        img.onload = () => {
            imageRef.current = img;
        };
      } catch (err) {
        console.error("Failed to load pet:", err);
      }
    }
    loadPet();
  }, [petId]);

  useEffect(() => {
    if (!config || !imageRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Default to idle if the state animation doesn't exist
    const animation = config.animations[state] || config.animations['idle'];
    if (!animation || animation.frames.length === 0) return;

    const frameRateMs = 1000 / animation.frameRate;

    const drawFrame = (timestamp: number) => {
      if (timestamp - lastDrawTimeRef.current >= frameRateMs) {
        const frameData = animation.frames[frameIndexRef.current];
        if (frameData && frameData.length >= 4) {
            const [x, y, w, h] = frameData;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            // Draw centered
            const dx = (canvas.width - w) / 2;
            const dy = (canvas.height - h) / 2;

            ctx.drawImage(imageRef.current!, x, y, w, h, dx, dy, w, h);

            frameIndexRef.current = (frameIndexRef.current + 1) % animation.frames.length;
            lastDrawTimeRef.current = timestamp;
        }
      }
      animationRef.current = requestAnimationFrame(drawFrame);
    };

    // Reset frame index on state change
    frameIndexRef.current = 0;
    lastDrawTimeRef.current = performance.now();
    animationRef.current = requestAnimationFrame(drawFrame);

    return () => {
        cancelAnimationFrame(animationRef.current);
    }
  }, [state, config]);

  // If idle, hide the pet entirely
  if (state === 'idle') {
      return null;
  }

  return (
    <div className="relative pointer-events-none">
       <canvas
          ref={canvasRef}
          width={150}
          height={150}
          className="w-[150px] h-[150px]"
       />
    </div>
  );
}
