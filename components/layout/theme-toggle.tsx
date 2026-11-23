"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const order = ["system", "light", "dark"] as const;
const labels = { system: "Auto", light: "Light", dark: "Dark" };

export function ThemeToggle() {
  const { theme = "system", setTheme } = useTheme();
  // next-themes only knows the theme after hydration
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // server HTML assumes "system"; React 19 won't patch a mismatched aria-label
  const current =
    mounted && theme in labels ? (theme as keyof typeof labels) : "system";
  const next = order[(order.indexOf(current) + 1) % order.length];

  return (
    <Button
      variant="quiet"
      size="text"
      onClick={() => setTheme(next)}
      className="ml-auto"
      aria-label={`Theme: ${labels[current]}. Switch to ${labels[next]}`}
    >
      {mounted ? `Theme: ${labels[current]}` : "Theme"}
    </Button>
  );
}
