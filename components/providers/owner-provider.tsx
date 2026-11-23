"use client";

import { createContext, useContext } from "react";

const OwnerContext = createContext("");

/** The resume owner's name for client components (BackButton on the 404 and error pages). */
export function OwnerProvider({
  name,
  children,
}: {
  name: string;
  children: React.ReactNode;
}) {
  return <OwnerContext value={name}>{children}</OwnerContext>;
}

export const useOwner = () => useContext(OwnerContext);
