import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Menu, X } from 'lucide-react';
import AccentPicker from './AccentPicker';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => setMobileOpen(false), [location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass shadow-lg' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center transition-transform group-hover:scale-105" style={{ background: 'var(--accent-color)' }}>
            <Shield size={20} className="text-white" />
          </div>
          <span className="text-lg font-bold tracking-tight">Obscura</span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          <a href="/#features" className="px-3 py-2 text-sm text-zinc-400 hover:text-white transition-colors">Features</a>
          <a href="/#pricing" className="px-3 py-2 text-sm text-zinc-400 hover:text-white transition-colors">Pricing</a>
          <Link to="/docs" className="px-3 py-2 text-sm text-zinc-400 hover:text-white transition-colors">Docs</Link>
          <Link to="/login" className="px-3 py-2 text-sm text-zinc-400 hover:text-white transition-colors">Login</Link>
          <AccentPicker />
          <Link to="/login?tab=register" className="btn-accent ml-2">Get started</Link>
        </div>

        <div className="flex md:hidden items-center gap-2">
          <AccentPicker />
          <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2 text-zinc-400 hover:text-white">
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="md:hidden glass border-t border-zinc-800 animate-fade-in">
          <div className="px-4 py-4 space-y-2">
            <a href="/#features" className="block px-3 py-2 text-sm text-zinc-400 hover:text-white">Features</a>
            <a href="/#pricing" className="block px-3 py-2 text-sm text-zinc-400 hover:text-white">Pricing</a>
            <Link to="/docs" className="block px-3 py-2 text-sm text-zinc-400 hover:text-white">Docs</Link>
            <Link to="/login" className="block px-3 py-2 text-sm text-zinc-400 hover:text-white">Login</Link>
            <Link to="/login?tab=register" className="btn-accent w-full text-center block">Get started</Link>
          </div>
        </div>
      )}
    </header>
  );
}
