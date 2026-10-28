import React, { useEffect, useRef, useState } from 'react';

const DEFAULT_VIDEO_URL =
  '/assets/aistudio/First-person_POV_smooth_camera_movement_20261027174718_3189c9f5.mp4';

interface ScrollVideoBackgroundProps {
  videoUrl?: string;
}

// Maps normalized scroll progress [0, 1] to video timestamp
// Starts at 1.6s (doors wide open, stepping into studio looking directly at iMac)
// By p = 0.22 (scrolling through Hero into Capability), arrives at the computer screen (4.5s)
// From p = 0.22 to 1.0 (Services, Gap, Work, Blogs, and Footer), scrubs through active wireframing & web editing
function getTimeForProgress(p: number, duration: number): number {
  const START_TIME = 1.6;
  const SCREEN_ARRIVE_TIME = 4.5;
  const END_TIME = Math.max(duration - 0.05, 9.9);
  const clamped = Math.min(Math.max(p, 0), 1);

  if (clamped <= 0.22) {
    // Quick glide through open doors straight to the computer screen
    return START_TIME + (clamped / 0.22) * (SCREEN_ARRIVE_TIME - START_TIME);
  } else {
    // Extended deep dive on the computer screen showing wireframes and active web editing
    return SCREEN_ARRIVE_TIME + ((clamped - 0.22) / 0.78) * (END_TIME - SCREEN_ARRIVE_TIME);
  }
}

export const ScrollVideoBackground: React.FC<ScrollVideoBackgroundProps> = ({
  videoUrl = DEFAULT_VIDEO_URL,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [hasDecodedFrame, setHasDecodedFrame] = useState(false);
  const [isCanvasReady, setIsCanvasReady] = useState(false);

  // Animation & scrub state in refs to avoid re-rendering loop
  const smoothedProgressRef = useRef(0);
  const targetProgressRef = useRef(0);
  const cachedFramesRef = useRef<ImageBitmap[]>([]);
  const isExtractingRef = useRef(false);
  const durationRef = useRef(10);

  useEffect(() => {
    // Reset frame cache if videoUrl changes
    cachedFramesRef.current = [];
    setIsCanvasReady(false);
    setHasDecodedFrame(false);

    const video = videoRef.current;
    if (!video) return;

    const handleLoadedData = () => {
      durationRef.current = video.duration || 10;
      setHasDecodedFrame(true);

      // Start offscreen frame caching after 200ms yield
      setTimeout(() => {
        extractFrames(videoUrl);
      }, 200);
    };

    video.addEventListener('loadeddata', handleLoadedData);
    if (video.readyState >= 2) {
      handleLoadedData();
    }

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
    };
  }, [videoUrl]);

  // Frame extraction for silky smooth scrub without video decoder seek thrashing
  const extractFrames = async (src: string) => {
    if (isExtractingRef.current || cachedFramesRef.current.length > 0) return;
    isExtractingRef.current = true;

    try {
      const offscreenVideo = document.createElement('video');
      offscreenVideo.src = src;
      offscreenVideo.muted = true;
      offscreenVideo.playsInline = true;
      offscreenVideo.preload = 'auto';
      if (src.startsWith('http://') || src.startsWith('https://')) {
        offscreenVideo.crossOrigin = 'anonymous';
      }

      await new Promise<void>((resolve, reject) => {
        offscreenVideo.onloadedmetadata = () => resolve();
        offscreenVideo.onerror = () => reject();
      });

      const duration = offscreenVideo.duration || 10;
      durationRef.current = duration;
      // 90 frames along our custom curve
      const totalFrames = 90;
      const extracted: ImageBitmap[] = [];

      const tempCanvas = document.createElement('canvas');
      const targetWidth = Math.min(offscreenVideo.videoWidth || 960, 960);
      const aspect = (offscreenVideo.videoHeight || 540) / (offscreenVideo.videoWidth || 960);
      tempCanvas.width = targetWidth;
      tempCanvas.height = Math.round(targetWidth * aspect);
      const ctx = tempCanvas.getContext('2d');

      if (!ctx) return;

      for (let i = 0; i < totalFrames; i++) {
        const normP = i / (totalFrames - 1);
        const time = getTimeForProgress(normP, duration);
        offscreenVideo.currentTime = time;

        await new Promise<void>((resolve) => {
          offscreenVideo.onseeked = () => resolve();
        });

        ctx.drawImage(offscreenVideo, 0, 0, tempCanvas.width, tempCanvas.height);
        if ('createImageBitmap' in window) {
          const bitmap = await createImageBitmap(tempCanvas);
          extracted.push(bitmap);
        }
      }

      if (extracted.length > 0) {
        cachedFramesRef.current = extracted;
        setIsCanvasReady(true);
      }
    } catch {
      // Fallback: seek fallback operates reliably directly on video
      setIsCanvasReady(false);
    } finally {
      isExtractingRef.current = false;
    }
  };

  // Scroll listener: progress = scrollY / (scrollHeight - innerHeight)
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const maxScroll = Math.max(docHeight - winHeight, 1);
      const progress = Math.min(Math.max(scrollY / maxScroll, 0), 1);
      targetProgressRef.current = progress;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    let animationFrameId: number;

    const renderLoop = () => {
      // Lerp smoothing: smoothed += (target - smoothed) * 0.12
      const target = targetProgressRef.current;
      const current = smoothedProgressRef.current;
      const delta = target - current;

      if (Math.abs(delta) > 0.0001) {
        smoothedProgressRef.current = current + delta * 0.12;
      } else {
        smoothedProgressRef.current = target;
      }

      const smoothed = smoothedProgressRef.current;
      const canvas = canvasRef.current;

      if (canvas) {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const displayWidth = window.innerWidth;
        const displayHeight = window.innerHeight;

        if (canvas.width !== displayWidth * dpr || canvas.height !== displayHeight * dpr) {
          canvas.width = displayWidth * dpr;
          canvas.height = displayHeight * dpr;
        }

        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.save();
          ctx.scale(dpr, dpr);

          const frames = cachedFramesRef.current;
          if (frames.length > 0) {
            const frameIndex = Math.min(
              frames.length - 1,
              Math.max(0, Math.floor(smoothed * (frames.length - 1)))
            );
            const frame = frames[frameIndex];

            // Object-cover math
            const fw = frame.width;
            const fh = frame.height;
            const scale = Math.max(displayWidth / fw, displayHeight / fh);
            const renderW = fw * scale;
            const renderH = fh * scale;
            const offsetX = (displayWidth - renderW) / 2;
            const offsetY = (displayHeight - renderH) / 2;

            ctx.clearRect(0, 0, displayWidth, displayHeight);
            ctx.drawImage(frame, offsetX, offsetY, renderW, renderH);

            // NO heavy dark vignette! The video is displayed crisp and bright
          } else {
            // Fallback: draw directly from the video if seeking
            const video = videoRef.current;
            if (video && video.readyState >= 2) {
              const vw = video.videoWidth || 1280;
              const vh = video.videoHeight || 720;
              const scale = Math.max(displayWidth / vw, displayHeight / vh);
              const renderW = vw * scale;
              const renderH = vh * scale;
              const offsetX = (displayWidth - renderW) / 2;
              const offsetY = (displayHeight - renderH) / 2;

              ctx.clearRect(0, 0, displayWidth, displayHeight);
              ctx.drawImage(video, offsetX, offsetY, renderW, renderH);
            }
          }

          ctx.restore();
        }
      }

      // If frame cache is not ready, scrub video element directly (delta > 0.04s)
      const video = videoRef.current;
      if (video && cachedFramesRef.current.length === 0 && durationRef.current > 0) {
        const targetTime = getTimeForProgress(smoothed, durationRef.current);
        if (Math.abs(video.currentTime - targetTime) > 0.04) {
          video.currentTime = targetTime;
        }
      }

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    animationFrameId = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#0a0a0a]"
      aria-hidden="true"
    >
      {/* Layer 1: Poster still (subtle dark gradient while loading) */}
      <div
        className={`absolute inset-0 bg-[#0a0a0a] transition-opacity duration-500 ${
          hasDecodedFrame ? 'opacity-0' : 'opacity-100'
        }`}
      />

      {/* Layer 2: Video (visible only while video has decoded frame and canvas is not ready) */}
      <video
        ref={videoRef}
        src={videoUrl}
        muted
        playsInline
        preload="auto"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
          hasDecodedFrame && !isCanvasReady ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Layer 3: Canvas (draws scrubbed frames with lerp interpolation) */}
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
          isCanvasReady ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Balanced 1-2 shades darker overlay for crisp WCAG text legibility while keeping the video clear */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/50 pointer-events-none" />
    </div>
  );
};
