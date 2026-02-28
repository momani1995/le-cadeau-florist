"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type SeasonalThemeContextValue = {
  isMothersDay: boolean;
  toggleMothersDay: () => void;
  setMothersDay: (value: boolean) => void;
};

const SeasonalThemeContext =
  createContext<SeasonalThemeContextValue | undefined>(undefined);

const STORAGE_KEY = "le-cadeau-seasonal-theme";

export function SeasonalThemeProvider({ children }: { children: ReactNode }) {
  const [isMothersDay, setIsMothersDay] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored != null) {
        setIsMothersDay(stored === "true");
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(STORAGE_KEY, String(isMothersDay));
    } catch {
      // ignore
    }
  }, [isMothersDay]);

  const value = useMemo<SeasonalThemeContextValue>(
    () => ({
      isMothersDay,
      toggleMothersDay: () => setIsMothersDay((v) => !v),
      setMothersDay: (value: boolean) => setIsMothersDay(value),
    }),
    [isMothersDay],
  );

  return (
    <SeasonalThemeContext.Provider value={value}>
      {children}
    </SeasonalThemeContext.Provider>
  );
}

export function useSeasonalTheme() {
  const ctx = useContext(SeasonalThemeContext);
  if (!ctx) {
    throw new Error(
      "useSeasonalTheme must be used within SeasonalThemeProvider",
    );
  }
  return ctx;
}

