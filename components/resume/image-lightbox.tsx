"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageLightboxProps {
  images: string[];
  alt: string;
  initialIndex?: number;
  isOpen: boolean;
  onClose: () => void;
}

export function ImageLightbox({
  images,
  alt,
  initialIndex = 0,
  isOpen,
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

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex, isOpen]);

  useEffect(() => {
    if (!isOpen) return;

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
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90"
      onClick={onClose}
    >
      {/* Close button */}
      <button
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
      <div
        className="relative w-[90vw] md:w-[80vw] max-w-5xl aspect-video overflow-hidden rounded-lg md:rounded-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={images[currentIndex]}
          alt={`${alt} ${currentIndex + 1}`}
          fill
          className="object-contain"
        />
      </div>

      {/* Mobile navigation - below image */}
      {hasMultiple && (
        <div
          className="flex md:hidden items-center gap-6 mt-4"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={goToPrev}
            className="p-2 text-white/70 hover:text-white transition-colors cursor-pointer"
            aria-label="Previous image"
          >
            <ChevronLeft className="size-8" />
          </button>
          <div className="flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
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
          {images.map((_, index) => (
            <button
              key={index}
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
