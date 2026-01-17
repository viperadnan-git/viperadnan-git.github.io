"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { cn, getImageTitle } from "@/lib/utils";
import type { ShowcaseImage } from "@/lib/types/resume";

interface ImageSlideshowProps {
  images: ShowcaseImage[];
  alt: string;
  className?: string;
  interval?: number;
}

export function ImageSlideshow({
  images,
  alt,
  className,
  interval = 3000,
}: ImageSlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const hasMultiple = images.length > 1;

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (!hasMultiple) return;

    const timer = setInterval(goToNext, interval);
    return () => clearInterval(timer);
  }, [hasMultiple, interval, goToNext]);

  return (
    <div className={cn("relative", className)}>
      {/* Screen reader announcement */}
      {hasMultiple && (
        <div className="sr-only" aria-live="polite" aria-atomic="true">
          Image {currentIndex + 1} of {images.length}
        </div>
      )}

      {images.map((image, index) => (
        <Image
          key={image.url}
          src={image.url}
          alt={getImageTitle(image, alt, index)}
          fill
          className={cn(
            "object-cover grayscale transition-opacity duration-2000 ease-linear",
            index === currentIndex ? "opacity-100" : "opacity-0",
          )}
        />
      ))}

      {/* Indicator dots */}
      {hasMultiple && (
        <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5">
          {images.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setCurrentIndex(index);
              }}
              className={cn(
                "size-1.5 rounded-full transition-colors",
                index === currentIndex
                  ? "bg-foreground"
                  : "bg-foreground/40 hover:bg-foreground/60",
              )}
              aria-label={`Go to image ${index + 1}`}
              aria-current={index === currentIndex ? "true" : undefined}
            />
          ))}
        </div>
      )}
    </div>
  );
}
