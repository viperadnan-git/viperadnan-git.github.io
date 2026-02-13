"use client";

import { ChevronDown, ExternalLink } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TimelineItemProps {
  title: string;
  subtitle: string;
  link?: string;
  location: string;
  period: string;
  details?: React.ReactNode;
  detailsLabel?: string;
  isLast?: boolean;
  showTimeline?: boolean;
}

export function TimelineItem({
  title,
  subtitle,
  link,
  location,
  period,
  details,
  detailsLabel = "details",
  isLast = false,
  showTimeline = false,
}: TimelineItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={showTimeline ? "relative flex gap-4" : "py-4"}>
      {/* Timeline line and dot */}
      {showTimeline && (
        <div className="flex flex-col items-center">
          <div className="mt-2 size-2 shrink-0 rounded-full bg-foreground/30" />
          {!isLast && <div className="w-px grow bg-foreground/10" />}
        </div>
      )}

      {/* Content */}
      <div className={showTimeline ? "flex-1 pb-6" : ""}>
        <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-start">
          <div>
            {link ? (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="font-heading font-bold hover:underline"
              >
                {title}
                <ExternalLink className="ml-1 inline size-3 align-baseline text-muted-foreground" />
              </a>
            ) : (
              <span className="font-heading font-bold">{title}</span>
            )}
            <p className="text-xs sm:text-sm text-muted-foreground">
              {subtitle}
            </p>
          </div>
          <div className="text-xs sm:text-sm text-muted-foreground sm:text-right">
            <p>{location}</p>
            <p>{period}</p>
          </div>
        </div>

        {details && (
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
              {isOpen ? `Hide ${detailsLabel}` : `Show ${detailsLabel}`}
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
                  <div className="mt-2 pb-4 text-xs sm:text-sm font-medium">
                    {details}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
