import { useState, useEffect, useRef } from "react";

/**
 * Hook to detect motion from the webcam using simple frame differencing.
 * @param threshold The percentage of changed pixels required to trigger isMoving.
 * @param sampleRate How often to sample frames (in ms).
 */
export const useMotionDetection = (threshold = 2, sampleRate = 100, deviceId?: string) => {
  const [motionScore, setMotionScore] = useState(0);
  const [isMoving, setIsMoving] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const prevFrameRef = useRef<ImageData | null>(null);

  useEffect(() => {
    const video = document.createElement("video");
    video.autoplay = true;
    video.playsInline = true;
    videoRef.current = video;

    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 48;
    canvasRef.current = canvas;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });

    let intervalId: number;

    const detectMotion = () => {
      if (video.readyState === video.HAVE_ENOUGH_DATA && ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const currentFrame = ctx.getImageData(0, 0, canvas.width, canvas.height);

        if (prevFrameRef.current) {
          let diffCount = 0;
          const data = currentFrame.data;
          const prevData = prevFrameRef.current.data;

          for (let i = 0; i < data.length; i += 4) {
            const rDiff = Math.abs(data[i] - prevData[i]);
            const gDiff = Math.abs(data[i + 1] - prevData[i + 1]);
            const bDiff = Math.abs(data[i + 2] - prevData[i + 2]);
            
            if (rDiff + gDiff + bDiff > 40) {
              diffCount++;
            }
          }
          
          const score = (diffCount / (canvas.width * canvas.height)) * 100;
          setMotionScore(Number(score.toFixed(2)));
          setIsMoving(score > threshold);
        }

        prevFrameRef.current = currentFrame;
      }
    };

    const constraints: MediaStreamConstraints = {
      video: deviceId ? { deviceId: { exact: deviceId } } : true
    };

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        setHasPermission(true);
        video.srcObject = stream;
        intervalId = window.setInterval(detectMotion, sampleRate);
      })
      .catch((err) => {
        console.error("Error accessing webcam:", err);
        setHasPermission(false);
      });

    return () => {
      if (intervalId) clearInterval(intervalId);
      if (video.srcObject) {
        const stream = video.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [threshold, sampleRate, deviceId]);

  return { motionScore, isMoving, hasPermission };
};
