"use client";

import { useState, useEffect, useCallback } from "react";
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

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex, isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goToPrev();
      if (e.key === "ArrowRight") goToNext();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose, goToPrev, goToNext]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
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

      {/* Previous arrow */}
      {hasMultiple && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            goToPrev();
          }}
          className="absolute left-4 p-2 text-white/70 hover:text-white transition-colors cursor-pointer"
          aria-label="Previous image"
        >
          <ChevronLeft className="size-10" />
        </button>
      )}

      {/* Image */}
      <div
        className="relative w-[90vw] max-w-5xl aspect-video"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={images[currentIndex]}
          alt={`${alt} ${currentIndex + 1}`}
          fill
          className="object-contain"
          unoptimized
        />
      </div>

      {/* Next arrow */}
      {hasMultiple && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            goToNext();
          }}
          className="absolute right-4 p-2 text-white/70 hover:text-white transition-colors cursor-pointer"
          aria-label="Next image"
        >
          <ChevronRight className="size-10" />
        </button>
      )}

      {/* Indicator dots */}
      {hasMultiple && (
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
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
                  : "bg-white/40 hover:bg-white/60"
              )}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
