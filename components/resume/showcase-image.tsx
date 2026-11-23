"use client";

import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import { Play } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import type { ShowcaseImage as ShowcaseImageData } from "@/lib/types/resume";
import { cn, getImageSrc, getImageTitle, getYouTubeId } from "@/lib/utils";

// viewer code loads on first open, not with the page
const ImageLightbox = dynamic(
  () => import("./image-lightbox").then((m) => m.ImageLightbox),
  { ssr: false },
);

interface ShowcaseImageProps {
  /** at least one; ShowcaseItem skips the thumbnail when there are none */
  images: ShowcaseImageData[];
  alt: string;
}

/**
 * Thumbnail (shadcn Carousel + Fade) that opens the viewer (shadcn Dialog).
 * Several frames autoplay, stopping on hover or focus and never under reduced
 * motion; dots and ←/→ switch by hand.
 */
export function ShowcaseImage({ images, alt }: ShowcaseImageProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  // viewer's first frame, fixed at open: a changing startIndex would re-init its carousel
  const [start, setStart] = useState(0);
  const many = images.length > 1;
  const label = getImageTitle(images[index], alt, index);
  const isVideo = !!getYouTubeId(images[index].url);

  // Autoplay restarts itself on mouseleave/focusout, so under reduced motion it isn't loaded at all
  const plugins = useMemo(
    () =>
      typeof window !== "undefined" &&
      !matchMedia("(prefers-reduced-motion: reduce)").matches
        ? [
            Fade(),
            Autoplay({
              delay: 3000,
              stopOnMouseEnter: true,
              stopOnFocusIn: true,
              stopOnInteraction: false,
            }),
          ]
        : [Fade()],
    [],
  );

  // still while the viewer is open; Autoplay resumes on its own once focus/pointer leave the thumbnail
  useEffect(() => {
    if (open) api?.plugins().autoplay?.stop();
  }, [api, open]);

  // stable, so the viewer's Embla listener isn't re-bound on every slide change
  const followViewer = useCallback(
    (i: number) => api?.scrollTo(i, true),
    [api],
  );

  useEffect(() => {
    if (!api) return;
    const sync = () => setIndex(api.selectedScrollSnap());
    api.on("select", sync);
    return () => {
      api.off("select", sync);
    };
  }, [api]);

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (next) setStart(index);
        setOpen(next);
      }}
    >
      <Carousel
        aria-label={`${alt} images`}
        setApi={setApi}
        opts={{ loop: many }}
        plugins={many ? plugins : undefined}
      >
        <DialogTrigger asChild>
          <button
            type="button"
            aria-label={`${isVideo ? "Play video" : "View image"}: ${label}${many ? `, ${index + 1} of ${images.length}` : ""}`}
            className="group block w-full cursor-zoom-in overflow-hidden rounded-md border border-border bg-muted"
          >
            <CarouselContent>
              {images.map((image, i) => (
                <CarouselItem
                  key={image.url}
                  aria-hidden={i !== index}
                  className="relative aspect-video"
                >
                  <Image
                    src={getImageSrc(image)}
                    alt={getImageTitle(image, alt, i)}
                    fill
                    sizes="(max-width: 640px) 100vw, 552px"
                    // grey frame shows until the image decodes, then it fades in (no blank pop)
                    onLoad={(e) => {
                      e.currentTarget.dataset.loaded = "";
                    }}
                    className="object-cover opacity-0 grayscale transition-[scale,filter,opacity] duration-[600ms] ease-(--ease-out) group-hover:scale-[1.02] group-hover:grayscale-0 group-focus-visible:grayscale-0 data-loaded:opacity-100"
                  />
                  {getYouTubeId(image.url) && (
                    <span className="absolute top-1/2 left-1/2 flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-background/90">
                      <Play
                        aria-hidden="true"
                        className="size-4 translate-x-px fill-foreground text-foreground"
                      />
                    </span>
                  )}
                </CarouselItem>
              ))}
            </CarouselContent>
          </button>
        </DialogTrigger>
      </Carousel>

      {many && (
        <div className="mt-2 flex justify-center gap-1">
          {images.map((image, i) => (
            <Button
              key={image.url}
              variant="quiet"
              size="icon-xs"
              onClick={() => api?.scrollTo(i)}
              aria-label={`Show ${getImageTitle(image, alt, i)}`}
              aria-current={i === index ? "true" : undefined}
              className="group/dot"
            >
              <span
                className={cn(
                  "h-1.5 w-3 rounded-full transition-[scale,background-color] duration-200 ease-(--ease-out)",
                  i === index
                    ? "bg-foreground"
                    : "scale-x-50 bg-muted-foreground group-hover/dot:bg-foreground",
                )}
              />
            </Button>
          ))}
        </div>
      )}

      {open && (
        <ImageLightbox
          images={images}
          alt={alt}
          startIndex={start}
          onIndexChange={followViewer}
        />
      )}
    </Dialog>
  );
}
