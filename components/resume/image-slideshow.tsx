"use client";

import { useEffect } from "react";
import Image from "next/image";
import { Expand, Play } from "lucide-react";
import { cn, getImageSrc, getImageTitle, getYouTubeId } from "@/lib/utils";
import type { ShowcaseImage } from "@/lib/types/resume";

interface ImageSlideshowProps {
  images: ShowcaseImage[];
  alt: string;
  index: number;
  onIndexChange: (index: number) => void;
  paused?: boolean;
  className?: string;
  interval?: number;
}

export function ImageSlideshow({
  images,
  alt,
  index: currentIndex,
  onIndexChange,
  paused = false,
  className,
  interval = 3000,
}: ImageSlideshowProps) {
  const hasMultiple = images.length > 1;

  useEffect(() => {
    if (!hasMultiple || paused) return;

    const timer = setInterval(
      () => onIndexChange((currentIndex + 1) % images.length),
      interval,
    );
    return () => clearInterval(timer);
  }, [
    hasMultiple,
    paused,
    interval,
    currentIndex,
    images.length,
    onIndexChange,
  ]);

  return (
    <div className={cn("relative", className)}>
      {/* Screen reader announcement */}
      {hasMultiple && (
        <div className="sr-only" aria-live="polite" aria-atomic="true">
          {getYouTubeId(images[currentIndex].url) ? "Video" : "Image"}{" "}
          {currentIndex + 1} of {images.length}
        </div>
      )}

      {images.map((image, index) => (
        <div
          key={image.url}
          className={cn(
            "absolute inset-0 transition-opacity duration-2000 ease-linear",
            index === currentIndex ? "opacity-100" : "opacity-0",
          )}
        >
          <Image
            src={getImageSrc(image)}
            alt={getImageTitle(image, alt, index)}
            fill
            className="object-cover grayscale"
          />
          {getYouTubeId(image.url) ? (
            <span className="absolute top-1/2 left-1/2 z-10 flex size-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white">
              <Play className="size-4 translate-x-px fill-black text-black" />
            </span>
          ) : (
            <Expand className="absolute top-1/2 left-1/2 z-10 size-6 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 transition-opacity group-hover:opacity-100" />
          )}
        </div>
      ))}

      {/* Indicator dots */}
      {hasMultiple && (
        <div className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
          {images.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onIndexChange(index);
              }}
              className={cn(
                "size-1.5 rounded-full transition-colors",
                index === currentIndex
                  ? "bg-foreground"
                  : "bg-foreground/40 hover:bg-foreground/60",
              )}
              aria-label={`Go to ${getYouTubeId(images[index].url) ? "video" : "image"} ${index + 1}`}
              aria-current={index === currentIndex ? "true" : undefined}
            />
          ))}
        </div>
      )}
    </div>
  );
}
