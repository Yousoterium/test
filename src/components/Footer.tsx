import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-zinc-900 bg-black/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div className="max-w-sm">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'var(--accent-color)' }}>
                <Shield size={20} className="text-white" />
              </div>
              <span className="text-lg font-bold tracking-tight">Obscura</span>
            </Link>
            <p className="text-sm text-zinc-500 leading-relaxed">
              Code-protection service for Roblox/Luau. Every build compiles into its own virtual machine, hardened with runtime anti-tamper and key systems.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3">Product</p>
              <ul className="space-y-2">
                <li><a href="/#features" className="text-sm text-zinc-500 hover:text-white transition-colors">Features</a></li>
                <li><a href="/#pricing" className="text-sm text-zinc-500 hover:text-white transition-colors">Pricing</a></li>
                <li><Link to="/docs" className="text-sm text-zinc-500 hover:text-white transition-colors">Docs</Link></li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3">Company</p>
              <ul className="space-y-2">
                <li><a href="https://discord.gg/obscuravm" target="_blank" rel="noreferrer" className="text-sm text-zinc-500 hover:text-white transition-colors">Discord</a></li>
                <li><Link to="/terms" className="text-sm text-zinc-500 hover:text-white transition-colors">Terms</Link></li>
                <li><Link to="/privacy" className="text-sm text-zinc-500 hover:text-white transition-colors">Privacy</Link></li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3">Account</p>
              <ul className="space-y-2">
                <li><Link to="/login" className="text-sm text-zinc-500 hover:text-white transition-colors">Login</Link></li>
                <li><Link to="/login?tab=register" className="text-sm text-zinc-500 hover:text-white transition-colors">Get started</Link></li>
                <li><Link to="/dashboard" className="text-sm text-zinc-500 hover:text-white transition-colors">Dashboard</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-zinc-900 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-zinc-600">© {new Date().getFullYear()} Obscura. All rights reserved.</p>
          <p className="text-xs text-zinc-600">Operated in the Netherlands.</p>
        </div>
      </div>
    </footer>
  );
}
