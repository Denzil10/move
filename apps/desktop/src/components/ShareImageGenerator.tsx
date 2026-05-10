import React, { useRef, useEffect, useState } from 'react';

interface ShareImageGeneratorProps {
  petName: string;
  petLevel: number;
  speciesIcon: string;
  petColor: string;
  totalMovements: number;
  totalCalories: number;
  streak: number;
  careStreak: number;
  onClose: () => void;
}

const ShareImageGenerator: React.FC<ShareImageGeneratorProps> = ({
  petName,
  petLevel,
  speciesIcon,
  petColor,
  totalMovements,
  totalCalories,
  streak,
  careStreak,
  onClose
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions (standard social share size 1200x630 or 1080x1080)
    // Let's go with 800x800 for a nice square card
    canvas.width = 800;
    canvas.height = 800;

    // 1. Draw Background
    const gradient = ctx.createLinearGradient(0, 0, 0, 800);
    gradient.addColorStop(0, '#2c3e50');
    gradient.addColorStop(1, '#000000');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 800, 800);

    // Add some "movement" lines in the background
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 2;
    for (let i = 0; i < 20; i++) {
      ctx.beginPath();
      ctx.moveTo(Math.random() * 800, 0);
      ctx.lineTo(Math.random() * 800, 800);
      ctx.stroke();
    }

    // 2. Draw Card Body
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.beginPath();
    ctx.roundRect(50, 50, 700, 700, 40);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 4;
    ctx.stroke();

    // 3. Draw Pet
    const centerX = 400;
    const centerY = 300;
    const petSize = 180;

    // Glow
    const glow = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, petSize * 1.5);
    glow.addColorStop(0, `${petColor}66`);
    glow.addColorStop(1, 'transparent');
    ctx.fillStyle = glow;
    ctx.fillRect(centerX - petSize * 2, centerY - petSize * 2, petSize * 4, petSize * 4);

    // Pet Body (border-radius: 50% 50% 40% 40%)
    ctx.fillStyle = petColor;
    ctx.beginPath();
    // Simplified version: slightly squashed circle for body
    ctx.ellipse(centerX, centerY + 20, petSize, petSize * 0.9, 0, 0, Math.PI * 2);
    ctx.fill();

    // Pet Species Icon
    ctx.font = '80px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.fillText(speciesIcon, centerX, centerY + 20);

    // Eyes
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(centerX - 40, centerY - 10, 15, 0, Math.PI * 2);
    ctx.arc(centerX + 40, centerY - 10, 15, 0, Math.PI * 2);
    ctx.fill();
    
    // Eye shines
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(centerX - 45, centerY - 15, 5, 0, Math.PI * 2);
    ctx.arc(centerX + 35, centerY - 15, 5, 0, Math.PI * 2);
    ctx.fill();

    // 4. Draw Stats
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    
    // Pet Name & Level
    ctx.font = 'bold 50px Inter, system-ui, sans-serif';
    ctx.fillText(`${petName} (Lv. ${petLevel})`, centerX, 550);

    // Stats Grid
    ctx.font = '30px Inter, system-ui, sans-serif';
    ctx.fillStyle = '#bdc3c7';
    ctx.fillText('Move Pet Progress', centerX, 600);

    const statY = 680;
    ctx.font = 'bold 32px Inter, system-ui, sans-serif';
    ctx.fillStyle = '#f1c40f';
    ctx.fillText(`${totalMovements}`, 150, statY);
    ctx.fillText(`${totalCalories}`, 320, statY);
    ctx.fillText(`${streak}`, 490, statY);
    ctx.fillStyle = '#ff4081';
    ctx.fillText(`${careStreak}`, 650, statY);

    ctx.font = '14px Inter, system-ui, sans-serif';
    ctx.fillStyle = '#ecf0f1';
    ctx.fillText('TOTAL MOVES', 150, statY + 30);
    ctx.fillText('CALORIES', 320, statY + 30);
    ctx.fillText('STREAK', 490, statY + 30);
    ctx.fillText('CARE STREAK', 650, statY + 30);

    // 5. Footer / Branding
    ctx.font = '24px Inter, system-ui, sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.fillText('🐾 Join me on Move Pet', centerX, 760);

    // Export to image
    setGeneratedImage(canvas.toDataURL('image/png'));
  }, [petName, petLevel, speciesIcon, petColor, totalMovements, totalCalories, streak, careStreak]);

  const downloadImage = () => {
    if (!generatedImage) return;
    const link = document.createElement('a');
    link.download = `${petName}-achievement.png`;
    link.href = generatedImage;
    link.click();
  };

  const shareToSocial = async () => {
    if (!generatedImage) return;
    
    // Convert data URL to blob
    const res = await fetch(generatedImage);
    const blob = await res.blob();
    const file = new File([blob], `${petName}-achievement.png`, { type: 'image/png' });

    if (navigator.share && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({
          files: [file],
          title: 'Move Pet Progress',
          text: `Check out my progress with ${petName} on Move Pet! 🐾`,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      // Fallback: copy text and prompt download
      navigator.clipboard.writeText(`🎉 I've reached Level ${petLevel} on Move Pet! 🐾\nJoin me in staying active! #MovePet`);
      downloadImage();
      alert("Image downloaded and progress text copied to clipboard! (Your browser doesn't support direct file sharing)");
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0,0,0,0.85)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10000,
      color: 'white',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <div style={{
        maxWidth: '90%',
        maxHeight: '80%',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <canvas ref={canvasRef} style={{
          maxWidth: '100%',
          maxHeight: '100%',
          borderRadius: '20px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
          display: generatedImage ? 'none' : 'block'
        }} />
        
        {generatedImage && (
          <img src={generatedImage} alt="Pet Achievement" style={{
            maxWidth: '100%',
            maxHeight: '100%',
            borderRadius: '20px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
          }} />
        )}

        <div style={{
          marginTop: '20px',
          display: 'flex',
          gap: '15px'
        }}>
          <button onClick={downloadImage} style={{
            padding: '12px 24px',
            borderRadius: '10px',
            border: 'none',
            backgroundColor: '#2ecc71',
            color: 'white',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}>
            💾 Download Image
          </button>
          <button onClick={shareToSocial} style={{
            padding: '12px 24px',
            borderRadius: '10px',
            border: 'none',
            backgroundColor: '#3498db',
            color: 'white',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}>
            📤 Share
          </button>
          <button onClick={onClose} style={{
            padding: '12px 24px',
            borderRadius: '10px',
            border: 'none',
            backgroundColor: '#e74c3c',
            color: 'white',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}>
            ✕ Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareImageGenerator;