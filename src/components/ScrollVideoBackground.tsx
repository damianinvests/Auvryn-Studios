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
      // Mobile browsers have tighter memory/decoder budgets. Fewer smaller frames
      // preserve the scroll-driven effect without allocating a desktop-sized frame cache.
      const isMobile = window.matchMedia('(max-width: 767px), (pointer: coarse)').matches;
      const saveData = Boolean((navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData);
      const totalFrames = saveData ? 20 : isMobile ? 32 : 72;
      const extracted: ImageBitmap[] = [];

      const tempCanvas = document.createElement('canvas');
      const sourceWidth = offscreenVideo.videoWidth || 960;
      const targetWidth = Math.min(sourceWidth, saveData ? 400 : isMobile ? 560 : 960);
      const aspect = (offscreenVideo.videoHeight || 540) / sourceWidth;
      tempCanvas.width = targetWidth;
      tempCanvas.height = Math.round(targetWidth * aspect);
      const ctx = tempCanvas.getContext('2d');

      if (!ctx) return;

      for (let i = 0; i < totalFrames; i++) {
        const normP = i / (totalFrames - 1);
        const time = getTimeForProgress(normP, duration);
        // Register the listener before seeking; setting currentTime first can miss
        // the seeked event on Safari/iOS and leave extraction waiting forever.
        await new Promise<void>((resolve) => {
          let settled = false;
          const finish = () => {
            if (settled) return;
            settled = true;
            window.clearTimeout(timeoutId);
            offscreenVideo.removeEventListener('seeked', finish);
            resolve();
          };
          const timeoutId = window.setTimeout(finish, 1800);
          offscreenVideo.addEventListener('seeked', finish, { once: true });
          offscreenVideo.currentTime = Math.min(time, Math.max(duration - 0.05, 0));
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
        // Wake the renderer if it has gone idle while the frame cache was building.
        window.dispatchEvent(new Event('auvryn:frames-ready'));
      }
    } catch {
      // Fallback: seek fallback operates reliably directly on video
      setIsCanvasReady(false);
    } finally {
      isExtractingRef.current = false;
    }
  };

  // Scroll progress is sampled passively, then rendered only while moving.
  // This avoids an always-running canvas loop on mobile devices.
  useEffect(() => {
    let animationFrameId: number | null = null;
    let disposed = false;

    const scheduleRender = () => {
      if (disposed || animationFrameId !== null) return;
      animationFrameId = window.requestAnimationFrame(renderFrame);
    };

    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const docHeight = document.documentElement.scrollHeight;
      // visualViewport helps keep progress stable as mobile browser chrome expands/collapses.
      const viewportHeight = window.visualViewport?.height ?? window.innerHeight;
      const maxScroll = Math.max(docHeight - viewportHeight, 1);
      targetProgressRef.current = Math.min(Math.max(scrollY / maxScroll, 0), 1);
      scheduleRender();
    };

    const renderFrame = () => {
      animationFrameId = null;
      if (disposed) return;

      const target = targetProgressRef.current;
      const current = smoothedProgressRef.current;
      const isMobile = window.matchMedia('(max-width: 767px), (pointer: coarse)').matches;
      // Reduce perceived lag on touch screens so the image tracks thumb scrolling more closely.
      const smoothing = isMobile ? 0.24 : 0.12;
      const delta = target - current;
      smoothedProgressRef.current =
        Math.abs(delta) > 0.0001 ? current + delta * smoothing : target;

      const smoothed = smoothedProgressRef.current;
      const canvas = canvasRef.current;
      const video = videoRef.current;

      if (canvas) {
        const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.25 : 1.75);
        const displayWidth = window.innerWidth;
        const displayHeight = window.visualViewport?.height ?? window.innerHeight;
        const pixelWidth = Math.max(1, Math.round(displayWidth * dpr));
        const pixelHeight = Math.max(1, Math.round(displayHeight * dpr));

        if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
          canvas.width = pixelWidth;
          canvas.height = pixelHeight;
        }

        const ctx = canvas.getContext('2d', { alpha: false });
        if (ctx) {
          ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
          const frames = cachedFramesRef.current;
          let source: CanvasImageSource | null = null;
          let sourceWidth = 0;
          let sourceHeight = 0;

          if (frames.length > 0) {
            const frameIndex = Math.min(
              frames.length - 1,
              Math.max(0, Math.round(smoothed * (frames.length - 1)))
            );
            const frame = frames[frameIndex];
            source = frame;
            sourceWidth = frame.width;
            sourceHeight = frame.height;
          } else if (video && video.readyState >= 2) {
            source = video;
            sourceWidth = video.videoWidth || 1280;
            sourceHeight = video.videoHeight || 720;
          }

          if (source && sourceWidth > 0 && sourceHeight > 0) {
            const scale = Math.max(displayWidth / sourceWidth, displayHeight / sourceHeight);
            const renderW = sourceWidth * scale;
            const renderH = sourceHeight * scale;
            ctx.clearRect(0, 0, displayWidth, displayHeight);
            ctx.drawImage(source, (displayWidth - renderW) / 2, (displayHeight - renderH) / 2, renderW, renderH);
          }
        }
      }

      // Fallback while the cache is preparing. Throttle seeks to avoid hammering
      // mobile video decoders; cached frames take over as soon as they're ready.
      if (video && cachedFramesRef.current.length === 0 && durationRef.current > 0) {
        const targetTime = getTimeForProgress(smoothed, durationRef.current);
        if (Math.abs(video.currentTime - targetTime) > (isMobile ? 0.08 : 0.04)) {
          video.currentTime = targetTime;
        }
      }

      // Keep smoothing alive only until the frame catches up with the scroll position.
      if (Math.abs(targetProgressRef.current - smoothedProgressRef.current) > 0.0008) {
        scheduleRender();
      }
    };

    const handleViewportChange = () => {
      handleScroll();
      scheduleRender();
    };
    const handleSeeked = () => scheduleRender();
    const handleFramesReady = () => scheduleRender();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleViewportChange, { passive: true });
    window.addEventListener('orientationchange', handleViewportChange, { passive: true });
    window.addEventListener('auvryn:frames-ready', handleFramesReady);
    window.visualViewport?.addEventListener('resize', handleViewportChange, { passive: true });
    videoRef.current?.addEventListener('seeked', handleSeeked);
    handleScroll();
    scheduleRender();

    return () => {
      disposed = true;
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleViewportChange);
      window.removeEventListener('orientationchange', handleViewportChange);
      window.removeEventListener('auvryn:frames-ready', handleFramesReady);
      window.visualViewport?.removeEventListener('resize', handleViewportChange);
      videoRef.current?.removeEventListener('seeked', handleSeeked);
      if (animationFrameId !== null) window.cancelAnimationFrame(animationFrameId);
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
