"use client";

import { useState } from "react";
import { Expand } from "lucide-react";
import { ImageSlideshow } from "./image-slideshow";
import { ImageLightbox } from "./image-lightbox";
import { cn } from "@/lib/utils";
import type { ShowcaseImage } from "@/lib/types/resume";

interface ShowcaseImageProps {
  images: ShowcaseImage[];
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

  return (
    <>
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
        aria-label={`View ${alt} in fullscreen`}
      >
        <ImageSlideshow images={images} alt={alt} className="size-full" />
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/40">
          <Expand className="size-6 text-white opacity-0 transition-opacity group-hover:opacity-100" />
        </div>
      </div>

      <ImageLightbox
        images={images}
        alt={alt}
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
      />
    </>
  );
}
