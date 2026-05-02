import { useEffect, useRef, useState, useCallback } from 'react';

// Returns a movement score between 0 and 100 based on frame differencing
export function useMotionDetection(active: boolean) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const previousFrameRef = useRef<Uint8ClampedArray | null>(null);
  const [motionScore, setMotionScore] = useState(0);

  const startCamera = useCallback(async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      console.warn("getUserMedia is not supported by this browser.");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 320, height: 240, frameRate: 15 },
        audio: false,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (err) {
      console.error("Error accessing the camera: ", err);
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();

      tracks.forEach((track) => {
        track.stop();
      });

      videoRef.current.srcObject = null;
    }
    previousFrameRef.current = null;
  }, []);

  useEffect(() => {
    if (active) {
      startCamera();
    } else {
      stopCamera();
    }

    return () => {
      stopCamera();
    };
  }, [active, startCamera, stopCamera]);

  useEffect(() => {
    let animationFrameId: number;

    const computeMotion = () => {
      if (
        !active ||
        !videoRef.current ||
        !canvasRef.current ||
        videoRef.current.readyState !== videoRef.current.HAVE_ENOUGH_DATA
      ) {
        if (active) {
          animationFrameId = requestAnimationFrame(computeMotion);
        }
        return;
      }

      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });

      if (!ctx) return;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const currentFrame = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const currentData = currentFrame.data;

      if (previousFrameRef.current) {
        const prevData = previousFrameRef.current;
        let diffPixels = 0;
        const threshold = 30; // Pixel color difference threshold

        // Only sample every 4th pixel for performance (stride of 16)
        for (let i = 0; i < currentData.length; i += 16) {
          const rDiff = Math.abs(currentData[i] - prevData[i]);
          const gDiff = Math.abs(currentData[i + 1] - prevData[i + 1]);
          const bDiff = Math.abs(currentData[i + 2] - prevData[i + 2]);

          if (rDiff + gDiff + bDiff > threshold) {
            diffPixels++;
          }
        }

        const totalPixelsSampled = currentData.length / 16;
        const score = (diffPixels / totalPixelsSampled) * 100;
        setMotionScore(Math.min(100, Math.round(score * 5))); // amplify score somewhat
      } else {
        previousFrameRef.current = new Uint8ClampedArray(currentData.length);
      }

      // Save current frame for next tick
      previousFrameRef.current.set(currentData);

      // Run less frequently than requestAnimationFrame to save CPU (e.g., 5-10fps is enough for motion)
      setTimeout(() => {
         animationFrameId = requestAnimationFrame(computeMotion);
      }, 100);
    };

    if (active) {
      computeMotion();
    }

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [active]);

  return { videoRef, canvasRef, motionScore };
}
