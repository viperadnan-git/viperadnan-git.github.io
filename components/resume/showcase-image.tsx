"use client";

import { useState } from "react";
import type { ShowcaseImage as ShowcaseImageData } from "@/lib/types/resume";
import { cn, getYouTubeId } from "@/lib/utils";
import { ImageLightbox } from "./image-lightbox";
import { ImageSlideshow } from "./image-slideshow";

interface ShowcaseImageProps {
  images: ShowcaseImageData[];
  alt: string;
  link: string;
  size?: "sm" | "md";
  className?: string;
}

export function ShowcaseImage({
  images,
  alt,
  size = "sm",
  className,
}: ShowcaseImageProps) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const isVideo = !!getYouTubeId(images[index].url);

  return (
    <>
      {/* biome-ignore lint/a11y/useSemanticElements: a button cannot nest the slideshow's dot buttons */}
      <div
        role="button"
        tabIndex={0}
        onClick={() => setIsLightboxOpen(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsLightboxOpen(true);
          }
        }}
        className={cn(
          "group relative aspect-video shrink-0 overflow-hidden rounded-md border border-border cursor-pointer",
          size === "sm" ? "w-1/2 md:w-40" : "w-full md:w-48",
          className,
        )}
        aria-label={isVideo ? `Play ${alt} video` : `View ${alt} in fullscreen`}
      >
        <ImageSlideshow
          images={images}
          alt={alt}
          index={index}
          onIndexChange={setIndex}
          paused={isLightboxOpen}
          className="size-full"
        />
        <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/40" />
      </div>

      {isLightboxOpen && (
        <ImageLightbox
          images={images}
          alt={alt}
          initialIndex={index}
          onClose={() => setIsLightboxOpen(false)}
        />
      )}
    </>
  );
}
