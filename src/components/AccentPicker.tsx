import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Palette, Check, ChevronDown } from 'lucide-react';
import { useAccent } from '@/context/AccentContext';

const PRESET_COLORS = [
  { name: 'Violet', value: '#8b5cf6' },
  { name: 'Blue', value: '#3b82f6' },
  { name: 'Cyan', value: '#06b6d4' },
  { name: 'Emerald', value: '#10b981' },
  { name: 'Rose', value: '#f43f5e' },
  { name: 'Amber', value: '#f59e0b' },
];

export default function AccentPicker() {
  const { accent, setAccent } = useAccent();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-200 hover:bg-zinc-800/60"
      >
        <Palette size={16} style={{ color: accent }} />
        <span className="hidden sm:inline text-zinc-400">Accent</span>
        <ChevronDown size={14} className={`text-zinc-500 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-64 glass rounded-xl p-4 shadow-2xl z-50 animate-fade-in-up">
          <p className="text-xs font-medium text-zinc-400 mb-3">Accent color</p>
          <div className="grid grid-cols-6 gap-2 mb-4">
            {PRESET_COLORS.map((c) => (
              <button
                key={c.value}
                onClick={() => setAccent(c.value)}
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-transform hover:scale-110"
                style={{ background: c.value }}
                title={c.name}
              >
                {accent === c.value && <Check size={14} className="text-white" />}
              </button>
            ))}
          </div>
          <div>
            <p className="text-xs font-medium text-zinc-400 mb-2">Custom color</p>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={accent}
                onChange={(e) => setAccent(e.target.value)}
                className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border border-zinc-700"
              />
              <input
                type="text"
                value={accent}
                onChange={(e) => setAccent(e.target.value)}
                className="input-field font-mono text-xs uppercase"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
