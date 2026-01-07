"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ImageSlideshowProps {
  images: string[];
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
      {images.map((image, index) => (
        <Image
          key={image}
          src={image}
          alt={`${alt} ${index + 1}`}
          fill
          className={cn(
            "object-cover grayscale transition-opacity duration-2000 ease-linear",
            index === currentIndex ? "opacity-100" : "opacity-0",
          )}
          unoptimized
        />
      ))}

      {/* Indicator dots */}
      {hasMultiple && (
        <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5">
          {images.map((_, index) => (
            <div
              key={index}
              role="button"
              tabIndex={0}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setCurrentIndex(index);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  e.stopPropagation();
                  setCurrentIndex(index);
                }
              }}
              className={cn(
                "size-1.5 cursor-pointer rounded-full transition-colors",
                index === currentIndex
                  ? "bg-foreground"
                  : "bg-foreground/40 hover:bg-foreground/60",
              )}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
