"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import type { ShowcaseImage } from "@/lib/types/resume";
import { getImageSrc, getImageTitle, getYouTubeId } from "@/lib/utils";

interface ImageLightboxProps {
  images: ShowcaseImage[];
  alt: string;
  startIndex?: number;
  /** keeps the thumbnail on the frame last viewed */
  onIndexChange?: (index: number) => void;
}

/**
 * Viewer on shadcn Dialog (focus trap, Esc, focus return) + Carousel
 * (swipe, ←/→). Home/End jump to the ends.
 */
export function ImageLightbox({
  images,
  alt,
  startIndex = 0,
  onIndexChange,
}: ImageLightboxProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [index, setIndex] = useState(startIndex);
  const close = useRef<HTMLButtonElement>(null);
  const many = images.length > 1;
  const title = getImageTitle(images[index], alt, index);

  useEffect(() => {
    if (!api) return;
    const sync = () => {
      const i = api.selectedScrollSnap();
      setIndex(i);
      onIndexChange?.(i);
    };
    api.on("select", sync);
    return () => {
      api.off("select", sync);
    };
  }, [api, onIndexChange]);

  return (
    <DialogContent
      // as wide as the 16:9 frame can be while frame + bar fit the viewport
      className="flex w-[min(100vw-32px,1200px,(100dvh-120px)*16/9)] flex-col gap-4"
      onOpenAutoFocus={(e) => {
        e.preventDefault();
        close.current?.focus();
      }}
      onKeyDown={(e) => {
        if (!api || !many) return;
        if (e.key === "Home") api.scrollTo(0);
        else if (e.key === "End") api.scrollTo(images.length - 1);
        else return;
        e.preventDefault();
      }}
    >
      <DialogDescription className="sr-only">
        {many
          ? "Use the left and right arrow keys or swipe to move between images. Press Escape to close."
          : "Press Escape to close."}
      </DialogDescription>
      <Carousel
        aria-label={`${alt} images`}
        setApi={setApi}
        opts={{ startIndex, loop: many }}
        className="flex flex-col gap-4"
      >
        <CarouselContent>
          {images.map((image, i) => {
            const id = getYouTubeId(image.url);
            const name = getImageTitle(image, alt, i);
            return (
              <CarouselItem key={image.url} aria-hidden={i !== index}>
                <div className="relative aspect-video overflow-hidden rounded-md">
                  {id && i === index ? (
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&playsinline=1`}
                      title={name}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                      className="size-full"
                    />
                  ) : (
                    <Image
                      src={getImageSrc(image)}
                      alt={name}
                      fill
                      sizes="100vw"
                      draggable={false}
                      className="object-contain select-none"
                    />
                  )}
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>

        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
          <div className="flex min-w-0 items-baseline gap-3">
            <DialogTitle className="truncate">{title}</DialogTitle>
            {many && (
              <p
                aria-live="polite"
                className="shrink-0 text-muted-foreground tabular-nums"
              >
                {index + 1} of {images.length}
              </p>
            )}
          </div>
          <div className="flex shrink-0 gap-x-4">
            {many && (
              <>
                <CarouselPrevious aria-keyshortcuts="ArrowLeft" />
                <CarouselNext aria-keyshortcuts="ArrowRight" />
              </>
            )}
            <DialogClose asChild>
              <Button
                ref={close}
                variant="quiet"
                size="text"
                aria-keyshortcuts="Escape"
              >
                Close
              </Button>
            </DialogClose>
          </div>
        </div>
      </Carousel>
    </DialogContent>
  );
}
