"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ShowcaseImage } from "@/lib/types/resume";
import { cn, getImageTitle, getYouTubeId } from "@/lib/utils";

interface ImageLightboxProps {
  images: ShowcaseImage[];
  alt: string;
  initialIndex?: number;
  onClose: () => void;
}

export function ImageLightbox({
  images,
  alt,
  initialIndex = 0,
  onClose,
}: ImageLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const hasMultiple = images.length > 1;

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  // Store callbacks in refs to avoid recreating event listener
  const onCloseRef = useRef(onClose);
  const goToPrevRef = useRef(goToPrev);
  const goToNextRef = useRef(goToNext);

  // Update refs on each render
  useEffect(() => {
    onCloseRef.current = onClose;
    goToPrevRef.current = goToPrev;
    goToNextRef.current = goToNext;
  });

  // Cross-origin iframes swallow keydown; focus the dialog whenever the
  // pointer is back on our side so Escape/arrows work again.
  const containerRef = useRef<HTMLDivElement>(null);
  const reclaimFocus = () => {
    if (document.activeElement?.tagName === "IFRAME")
      containerRef.current?.focus();
  };

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    containerRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCloseRef.current();
      if (e.key === "ArrowLeft") goToPrevRef.current?.();
      if (e.key === "ArrowRight") goToNextRef.current?.();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      previouslyFocused?.focus();
    };
  }, []);

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: Escape closes it, bound on document
    <div
      ref={containerRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${getYouTubeId(images[currentIndex].url) ? "Video" : "Image"}: ${getImageTitle(images[currentIndex], alt, currentIndex)}`}
      tabIndex={-1}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 outline-none"
      onClick={onClose}
      onMouseMove={reclaimFocus}
    >
      {/* Close button */}
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 p-2 text-white/70 hover:text-white transition-colors cursor-pointer"
        aria-label="Close"
      >
        <X className="size-8" />
      </button>

      {/* Desktop arrows - on sides */}
      {hasMultiple && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goToPrev();
            }}
            className="absolute left-4 hidden md:block p-2 text-white/70 hover:text-white transition-colors cursor-pointer"
            aria-label="Previous image"
          >
            <ChevronLeft className="size-10" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
            className="absolute right-4 hidden md:block p-2 text-white/70 hover:text-white transition-colors cursor-pointer"
            aria-label="Next image"
          >
            <ChevronRight className="size-10" />
          </button>
        </>
      )}

      {/* Image */}
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: guard only, stops the backdrop closing */}
      {/* biome-ignore lint/a11y/noStaticElementInteractions: guard only, stops the backdrop closing */}
      <div
        className="relative w-[90vw] md:w-[80vw] max-w-5xl aspect-video overflow-hidden rounded-lg md:rounded-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {getYouTubeId(images[currentIndex].url) ? (
          <iframe
            key={images[currentIndex].url}
            src={`https://www.youtube-nocookie.com/embed/${getYouTubeId(images[currentIndex].url)}?autoplay=1&playsinline=1`}
            title={getImageTitle(images[currentIndex], alt, currentIndex)}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="size-full"
          />
        ) : (
          <Image
            src={images[currentIndex].url}
            alt={getImageTitle(images[currentIndex], alt, currentIndex)}
            fill
            className="object-contain"
          />
        )}
      </div>

      {/* Mobile navigation - below image */}
      {hasMultiple && (
        // biome-ignore lint/a11y/useKeyWithClickEvents: guard only, stops the backdrop closing
        // biome-ignore lint/a11y/noStaticElementInteractions: guard only, stops the backdrop closing
        <div
          className="flex md:hidden items-center gap-6 mt-4"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            onClick={goToPrev}
            className="p-2 text-white/70 hover:text-white transition-colors cursor-pointer"
            aria-label="Previous image"
          >
            <ChevronLeft className="size-8" />
          </button>
          <div className="flex gap-2">
            {images.map((image, index) => (
              <button
                type="button"
                key={image.url}
                onClick={() => setCurrentIndex(index)}
                className={cn(
                  "size-2 rounded-full transition-colors cursor-pointer",
                  index === currentIndex
                    ? "bg-white"
                    : "bg-white/40 hover:bg-white/60",
                )}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={goToNext}
            className="p-2 text-white/70 hover:text-white transition-colors cursor-pointer"
            aria-label="Next image"
          >
            <ChevronRight className="size-8" />
          </button>
        </div>
      )}

      {/* Desktop indicator dots */}
      {hasMultiple && (
        <div className="absolute bottom-4 left-1/2 hidden md:flex -translate-x-1/2 gap-2">
          {images.map((image, index) => (
            <button
              type="button"
              key={image.url}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(index);
              }}
              className={cn(
                "size-2 rounded-full transition-colors cursor-pointer",
                index === currentIndex
                  ? "bg-white"
                  : "bg-white/40 hover:bg-white/60",
              )}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
