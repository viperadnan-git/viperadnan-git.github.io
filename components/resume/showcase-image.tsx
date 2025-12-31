"use client";

import { useState } from "react";
import { Expand } from "lucide-react";
import { ImageSlideshow } from "./image-slideshow";
import { ImageLightbox } from "./image-lightbox";
import { cn } from "@/lib/utils";

interface ShowcaseImageProps {
  images: string[];
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
      <button
        type="button"
        onClick={() => setIsLightboxOpen(true)}
        className={cn(
          "group relative aspect-video w-full shrink-0 overflow-hidden rounded-md border border-border order-1 md:order-2 cursor-pointer",
          size === "sm" ? "md:w-40" : "md:w-48",
          className
        )}
      >
        <ImageSlideshow images={images} alt={alt} className="size-full" />
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/40">
          <Expand className="size-6 text-white opacity-0 transition-opacity group-hover:opacity-100" />
        </div>
      </button>

      <ImageLightbox
        images={images}
        alt={alt}
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
      />
    </>
  );
}
