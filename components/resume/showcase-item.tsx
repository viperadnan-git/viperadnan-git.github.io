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
  const maxVisibleTags = 3;
  const technologies = item.technologies ?? [];
  const visibleTags = isOpen
    ? technologies
    : technologies.slice(0, maxVisibleTags);
  const hiddenTagCount = technologies.length - maxVisibleTags;

  return (
    <div className="py-3">
      <div className="flex flex-col gap-3 md:flex-row md:gap-4 md:items-start">
        {/* Content */}
        <div className="flex-1 min-w-0 order-2 md:order-1">
          <div className="flex flex-wrap items-center gap-2">
            {item.featured && (
              <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Featured
              </span>
            )}
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="font-heading font-bold hover:underline"
            >
              {item.title}
            </a>

            {/* Additional links */}
            {item.links && item.links.length > 0 && (
              <div className="flex items-center gap-1">
                {item.links.map((link, index) => {
                  const Icon = linkIcons[link.type];
                  return (
                    <a
                      key={`${link.type}-${index}`}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 text-muted-foreground hover:text-foreground"
                      title={
                        link.type.charAt(0).toUpperCase() + link.type.slice(1)
                      }
                    >
                      <Icon className="size-4" />
                    </a>
                  );
                })}
              </div>
            )}

            {item.status && (
              <span className="text-xs italic text-muted-foreground">
                ({statusLabels[item.status]})
              </span>
            )}
          </div>

          <p className="text-sm italic">{item.subtitle}</p>

          {/* Tech tags */}
          {technologies.length > 0 && (
            <p className="mt-1 text-sm text-muted-foreground">
              <span className="font-bold">Stack:</span> {visibleTags.join(", ")}
              {!isOpen && hiddenTagCount > 0 && `, +${hiddenTagCount} more`}
            </p>
          )}

          {/* Expandable description */}
          <div>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="mt-2 flex cursor-pointer items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
            >
              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="inline-flex"
              >
                <ChevronDown className="h-4 w-4 text-current" />
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
                  <p className="mt-2 text-sm">{item.description}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Thumbnail - top on mobile (smaller), right on desktop */}
        <ShowcaseImage
          images={item.images}
          alt={item.title}
          link={item.link}
          size="sm"
          className="order-1 md:order-2"
        />
      </div>
    </div>
  );
}
