"use client";

import { ChevronDown, ExternalLink } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SectionItemProps {
  title: string;
  subtitle: string;
  link?: string;
  location: string;
  period: string;
  details?: React.ReactNode;
  detailsLabel?: string;
}

export function SectionItem({
  title,
  subtitle,
  link,
  location,
  period,
  details,
  detailsLabel = "details",
}: SectionItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="py-3">
      <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-start">
        <div>
          {link ? (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-heading font-bold hover:underline"
            >
              {title}
              <ExternalLink className="size-3 text-muted-foreground" />
            </a>
          ) : (
            <span className="font-heading font-bold">{title}</span>
          )}
          <p className="text-sm italic">{subtitle}</p>
        </div>
        <div className="text-sm text-muted-foreground sm:text-right">
          <p>{location}</p>
          <p className="italic">{period}</p>
        </div>
      </div>

      {details && (
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
                <div className="mt-2 text-sm">{details}</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
