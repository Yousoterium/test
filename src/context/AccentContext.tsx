import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

type AccentContextType = {
  accent: string;
  setAccent: (color: string) => void;
};

const AccentContext = createContext<AccentContextType>({
  accent: '#8b5cf6',
  setAccent: () => {},
});

export function AccentProvider({ children }: { children: ReactNode }) {
  const [accent, setAccentState] = useState(() => {
    return localStorage.getItem('obscura-accent') || '#8b5cf6';
  });

  const setAccent = (color: string) => {
    setAccentState(color);
    localStorage.setItem('obscura-accent', color);
  };

  useEffect(() => {
    const root = document.documentElement;
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    root.style.setProperty('--accent-color', accent);
    root.style.setProperty('--accent-color-hover', shade(accent, -10));
    root.style.setProperty('--accent-color-soft', `rgba(${r}, ${g}, ${b}, 0.12)`);
  }, [accent]);

  return (
    <AccentContext.Provider value={{ accent, setAccent }}>
      {children}
    </AccentContext.Provider>
  );
}

export function useAccent() {
  return useContext(AccentContext);
}

function shade(hex: string, percent: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const factor = (100 + percent) / 100;
  const nr = Math.max(0, Math.min(255, Math.round(r * factor)));
  const ng = Math.max(0, Math.min(255, Math.round(g * factor)));
  const nb = Math.max(0, Math.min(255, Math.round(b * factor)));
  return `#${nr.toString(16).padStart(2, '0')}${ng.toString(16).padStart(2, '0')}${nb.toString(16).padStart(2, '0')}`;
}
