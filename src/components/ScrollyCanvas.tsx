"use client";

import { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, MotionValue } from "framer-motion";

const FRAME_COUNT = 75; // 0 to 74

interface ScrollyCanvasProps {
  scrollYProgress: MotionValue<number>;
}

export default function ScrollyCanvas({ scrollYProgress }: ScrollyCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Preload images
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 0; i < FRAME_COUNT; i++) {
        const img = new Image();
        const frameIndex = i.toString().padStart(2, "0");
        img.src = `/sequence/frame_${frameIndex}_delay-3.3s.webp`;
        
        img.onload = () => {
          loadedCount++;
          if (loadedCount === FRAME_COUNT) {
            setImagesLoaded(true);
          }
        };
        // Even if an image fails to load, we assign it so indices match
        loadedImages[i] = img;
    }
    
    setImages(loadedImages);
  }, []);

  // Function to draw image holding object-fit: cover logic and cropping bottom watermark
  const drawImage = (img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || !img) return;

    // Set internal canvas resolution to match display size
    const { width, height } = canvas.getBoundingClientRect();
    canvas.width = width;
    canvas.height = height;

    // Crop the bottom 8% of the source image to remove the watermark
    const watermarkCropRatio = 0.08;
    const sx = 0;
    const sy = 0;
    const sWidth = img.width;
    const sHeight = img.height * (1 - watermarkCropRatio);

    const canvasRatio = canvas.width / canvas.height;
    const croppedImgRatio = sWidth / sHeight;
    
    let drawWidth, drawHeight, offsetX = 0, offsetY = 0;

    if (canvasRatio > croppedImgRatio) {
      // Canvas is wider than cropped image
      drawWidth = canvas.width;
      drawHeight = canvas.width / croppedImgRatio;
      offsetY = (canvas.height - drawHeight) / 2;
    } else {
      // Canvas is taller than cropped image (or equal)
      drawHeight = canvas.height;
      drawWidth = canvas.height * croppedImgRatio;
      offsetX = (canvas.width - drawWidth) / 2;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, sx, sy, sWidth, sHeight, offsetX, offsetY, drawWidth, drawHeight);
  };

  // Draw initial frame once loaded
  useEffect(() => {
    if (imagesLoaded && images.length > 0) {
      drawImage(images[0]);
    }
  }, [imagesLoaded, images]);

  // Redraw image on scroll progress or window resize
  useMotionValueEvent(scrollYProgress, "change", (latest: number) => {
    if (!imagesLoaded) return;
    
    // Map 0-1 to 0-(FRAME_COUNT-1)
    let frameIndex = Math.floor(latest * (FRAME_COUNT - 1));
    // clamp just in case
    frameIndex = Math.max(0, Math.min(frameIndex, FRAME_COUNT - 1));
    
    if (images[frameIndex]) {
      requestAnimationFrame(() => drawImage(images[frameIndex]));
    }
  });

  // Redraw on resize
  useEffect(() => {
    const handleResize = () => {
      let frameIndex = Math.floor(scrollYProgress.get() * (FRAME_COUNT - 1));
      frameIndex = Math.max(0, Math.min(frameIndex, FRAME_COUNT - 1));
      if (images[frameIndex]) {
        requestAnimationFrame(() => drawImage(images[frameIndex]));
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [imagesLoaded, images, scrollYProgress]);

  return (
    <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#121212]">
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover"
      />
      {!imagesLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#121212] z-50 text-white/50 animate-pulse">
          Loading Experience...
        </div>
      )}
    </div>
  );
}
