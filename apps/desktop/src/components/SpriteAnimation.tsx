import React, { useState, useEffect } from "react";

interface SpriteAnimationProps {
  src: string;
  cols: number;
  cellWidth: number;
  cellHeight: number;
  row: number;
  frameCount: number;
  fps?: number;
  scale?: number;
  className?: string;
}

const SpriteAnimation: React.FC<SpriteAnimationProps> = ({
  src,
  cols,
  cellWidth,
  cellHeight,
  row,
  frameCount,
  fps = 8,
  scale = 1,
  className,
}) => {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    setFrame(0);
    const interval = setInterval(() => {
      setFrame(f => (f + 1) % frameCount);
    }, 1000 / fps);
    return () => clearInterval(interval);
  }, [frameCount, fps, row]);

  const w = Math.round(cellWidth * scale);
  const h = Math.round(cellHeight * scale);

  return (
    <div
      className={className}
      style={{
        width: w,
        height: h,
        backgroundImage: `url(${src})`,
        backgroundSize: `${Math.round(cols * cellWidth * scale)}px auto`,
        backgroundPosition: `-${frame * w}px -${row * h}px`,
        backgroundRepeat: "no-repeat",
        imageRendering: "pixelated",
      }}
    />
  );
};

export default SpriteAnimation;
