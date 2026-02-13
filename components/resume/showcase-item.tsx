"use client";

import { ChevronDown, Globe, FileText } from "lucide-react";
import { FaGithub, FaPlayCircle } from "react-icons/fa";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShowcaseImage } from "./showcase-image";
import type { ShowcaseEntry, ShowcaseLink } from "@/lib/types/resume";

interface ShowcaseItemProps {
  item: ShowcaseEntry;
}

const linkIcons: Record<
  ShowcaseLink["type"],
  React.ComponentType<{ className?: string }>
> = {
  github: FaGithub,
  demo: FaPlayCircle,
  website: Globe,
  docs: FileText,
};

const statusLabels: Record<NonNullable<ShowcaseEntry["status"]>, string> = {
  active: "Active",
  archived: "Archived",
  development: "In Development",
};

export function ShowcaseItem({ item }: ShowcaseItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="py-4">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="font-heading font-bold hover:underline"
          >
            {item.title}
          </a>
          {item.featured && (
            <span className="text-xs uppercase tracking-wide text-muted-foreground">
              Featured
            </span>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-1">
          {/* Additional links */}
          {item.links &&
            item.links.length > 0 &&
            item.links.map((link, index) => {
              const Icon = linkIcons[link.type];
              const linkLabel =
                link.type.charAt(0).toUpperCase() + link.type.slice(1);
              return (
                <a
                  key={`${link.type}-${index}`}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 p-1 text-muted-foreground hover:text-foreground"
                  aria-label={`View ${item.title} on ${linkLabel}`}
                  title={linkLabel}
                >
                  <Icon className="size-4" />
                  <span className="hidden text-xs sm:inline">{linkLabel}</span>
                </a>
              );
            })}
          {item.status && (
            <span className="text-xs text-muted-foreground">
              ({statusLabels[item.status]})
            </span>
          )}
        </div>
      </div>

      <p className="text-xs sm:text-sm text-muted-foreground">
        {item.subtitle}
      </p>

      {/* Expandable details with image */}
      <div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="mt-2 flex cursor-pointer items-center gap-1 text-xs sm:text-sm text-muted-foreground hover:text-foreground"
        >
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="inline-flex"
          >
            <ChevronDown className="size-4 text-current" />
          </motion.span>
          {isOpen ? "Hide details" : "Show details"}
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="mt-3 pb-4">
                <ShowcaseImage
                  images={item.images}
                  alt={item.title}
                  link={item.link}
                  size="md"
                />
                <p className="mt-3 text-xs sm:text-sm font-medium">
                  {item.description}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
