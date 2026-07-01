import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

type Theme = "editorial" | "dracula" | "nord" | "catppuccin" | "rose-pine" | "github";
type Aesthetic = "minimal" | "glass" | "bento" | "expressive" | "neon" | "brutalist" | "organic";
type Density = "compact" | "comfortable" | "spacious";

export interface BindrunesContextValue {
  theme: Theme;
  aesthetic: Aesthetic;
  density: Density;
  setTheme: (theme: Theme) => void;
  setAesthetic: (aesthetic: Aesthetic) => void;
  setDensity: (density: Density) => void;
}

const BindrunesContext = createContext<BindrunesContextValue | null>(null);

export function useBindrunes() {
  const ctx = useContext(BindrunesContext);
  if (!ctx) throw new Error("useBindrunes must be used within BindrunesProvider");
  return ctx;
}

interface BindrunesProviderProps {
  children: ReactNode;
  defaultTheme?: Theme;
  defaultAesthetic?: Aesthetic;
  defaultDensity?: Density;
}

export function BindrunesProvider({
  children,
  defaultTheme = "editorial",
  defaultAesthetic = "minimal",
  defaultDensity = "comfortable",
}: BindrunesProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  const [aesthetic, setAesthetic] = useState<Aesthetic>(defaultAesthetic);
  const [density, setDensity] = useState<Density>(defaultDensity);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
    root.setAttribute("data-aesthetic", aesthetic);
    root.setAttribute("data-density", density);
  }, [theme, aesthetic, density]);

  return (
    <BindrunesContext.Provider value={{ theme, aesthetic, density, setTheme, setAesthetic, setDensity }}>
      {children}
    </BindrunesContext.Provider>
  );
}
