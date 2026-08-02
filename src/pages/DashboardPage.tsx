import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Shield, LayoutDashboard, FileCode, KeyRound, Link2, Settings, LogOut,
  Upload, Copy, MoreVertical, Activity, TrendingUp, Clock, CheckCircle2,
  Plus, Search, ChevronRight, Zap, Server, Eye,
} from 'lucide-react';
import AccentPicker from '@/components/AccentPicker';

const sidebarItems = [
  { icon: LayoutDashboard, label: 'Overview', active: true },
  { icon: FileCode, label: 'Scripts', badge: '3' },
  { icon: KeyRound, label: 'Key systems', badge: '2' },
  { icon: Link2, label: 'Protected links' },
  { icon: Zap, label: 'Obfuscate', badge: 'New' },
  { icon: Settings, label: 'Settings' },
];

const recentScripts = [
  { name: 'sotarium_loader.lua', size: '47.2 KB', status: 'Protected', date: '2 hours ago', obfuscations: 12 },
  { name: 'aimbot_core.lua', size: '28.9 KB', status: 'Protected', date: '5 hours ago', obfuscations: 8 },
  { name: 'universal hub v3.lua', size: '112.4 KB', status: 'Protected', date: '1 day ago', obfuscations: 5 },
  { name: 'esp_tracker.lua', size: '15.3 KB', status: 'Draft', date: '2 days ago', obfuscations: 0 },
];

const keySystems = [
  { name: 'Sotarium', keys: 731, status: 'Active', url: '/key/sotarium' },
  { name: 'Aimbot Pro', keys: 412, status: 'Active', url: '/key/aimbot-pro' },
];

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-zinc-100 flex">
      <aside className={`fixed lg:sticky top-0 left-0 h-screen w-64 glass border-r border-zinc-800 flex flex-col z-40 transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-5 flex items-center gap-2.5 border-b border-zinc-800">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'var(--accent-color)' }}>
              <Shield size={20} className="text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight">Obscura</span>
          </Link>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {sidebarItems.map((item) => (
            <button
              key={item.label}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                item.active ? 'text-white' : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
              }`}
              style={item.active ? { background: 'var(--accent-color-soft)', color: 'var(--accent-color)' } : {}}
            >
              <item.icon size={18} />
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge && (
                <span className="px-1.5 py-0.5 rounded text-xs font-medium" style={{ background: 'var(--accent-color-soft)', color: 'var(--accent-color)' }}>
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="p-3">
          <div className="glass rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-zinc-400">Free plan</span>
              <span className="text-xs text-zinc-500">3/5 used</span>
            </div>
            <div className="h-1.5 rounded-full bg-zinc-800 overflow-hidden mb-3">
              <div className="h-full rounded-full transition-all" style={{ width: '60%', background: 'var(--accent-color)' }} />
            </div>
            <button className="btn-accent w-full text-xs py-2">Upgrade plan</button>
          </div>
        </div>

        <div className="p-3 border-t border-zinc-800">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition-all">
            <LogOut size={18} />
            <span>Sign out</span>
          </button>
        </div>
      </aside>

      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      <main className="flex-1 min-w-0">
        <header className="sticky top-0 z-30 glass border-b border-zinc-800 px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-2 text-zinc-400 hover:text-white">
              <LayoutDashboard size={20} />
            </button>
            <h1 className="text-lg font-semibold">Overview</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input type="text" placeholder="Search..." className="input-field pl-9 w-48 text-xs" />
            </div>
            <AccentPicker />
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold" style={{ background: 'var(--accent-color)' }}>
              S
            </div>
          </div>
        </header>

        <div className="p-4 sm:p-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard icon={FileCode} label="Total scripts" value="4" sub="2 protected this week" trend="up" />
            <StatCard icon={Zap} label="Obfuscations" value="3/5" sub="2 remaining this month" trend="warn" />
            <StatCard icon={KeyRound} label="Active keys" value="1,143" sub="+89 this week" trend="up" />
            <StatCard icon={Activity} label="Executions" value="24.8K" sub="+12% vs last week" trend="up" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <button className="glass rounded-2xl p-5 hover:card-glow transition-all duration-300 hover:-translate-y-0.5 text-left group">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: 'var(--accent-color-soft)' }}>
                <Upload size={20} style={{ color: 'var(--accent-color)' }} />
              </div>
              <h3 className="font-semibold mb-1">Upload script</h3>
              <p className="text-sm text-zinc-500">Upload a .lua or .luau file to protect</p>
            </button>
            <button className="glass rounded-2xl p-5 hover:card-glow transition-all duration-300 hover:-translate-y-0.5 text-left group">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: 'var(--accent-color-soft)' }}>
                <KeyRound size={20} style={{ color: 'var(--accent-color)' }} />
              </div>
              <h3 className="font-semibold mb-1">Create key system</h3>
              <p className="text-sm text-zinc-500">Set up keys for a new script</p>
            </button>
            <button className="glass rounded-2xl p-5 hover:card-glow transition-all duration-300 hover:-translate-y-0.5 text-left group">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: 'var(--accent-color-soft)' }}>
                <Link2 size={20} style={{ color: 'var(--accent-color)' }} />
              </div>
              <h3 className="font-semibold mb-1">Protect a link</h3>
              <p className="text-sm text-zinc-500">Create a protected loadstring link</p>
            </button>
          </div>

          <div className="glass rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between p-5 border-b border-zinc-800">
              <h2 className="font-semibold">Recent scripts</h2>
              <button className="btn-ghost text-xs flex items-center gap-1.5">
                <Plus size={14} /> New script
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-xs text-zinc-500 border-b border-zinc-800">
                    <th className="text-left p-4 font-medium">Name</th>
                    <th className="text-left p-4 font-medium hidden sm:table-cell">Size</th>
                    <th className="text-left p-4 font-medium">Status</th>
                    <th className="text-left p-4 font-medium hidden md:table-cell">Obfuscations</th>
                    <th className="text-left p-4 font-medium hidden lg:table-cell">Updated</th>
                    <th className="p-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {recentScripts.map((script) => (
                    <tr key={script.name} className="border-b border-zinc-800/30 hover:bg-zinc-800/20 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'var(--accent-color-soft)' }}>
                            <FileCode size={16} style={{ color: 'var(--accent-color)' }} />
                          </div>
                          <span className="font-medium text-zinc-200">{script.name}</span>
                        </div>
                      </td>
                      <td className="p-4 text-zinc-400 hidden sm:table-cell">{script.size}</td>
                      <td className="p-4">
                        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium ${
                          script.status === 'Protected' ? 'text-emerald-400 bg-emerald-500/10' : 'text-amber-400 bg-amber-500/10'
                        }`}>
                          {script.status === 'Protected' ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                          {script.status}
                        </span>
                      </td>
                      <td className="p-4 text-zinc-400 hidden md:table-cell">{script.obfuscations}</td>
                      <td className="p-4 text-zinc-400 hidden lg:table-cell">{script.date}</td>
                      <td className="p-4">
                        <button className="p-1.5 rounded-lg text-zinc-500 hover:text-white hover:bg-zinc-800 transition-colors">
                          <MoreVertical size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="glass rounded-2xl overflow-hidden">
              <div className="flex items-center justify-between p-5 border-b border-zinc-800">
                <h2 className="font-semibold">Key systems</h2>
                <button className="btn-ghost text-xs flex items-center gap-1.5">
                  <Plus size={14} /> New
                </button>
              </div>
              <div className="p-3 space-y-2">
                {keySystems.map((ks) => (
                  <Link
                    key={ks.name}
                    to={ks.url}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-zinc-800/40 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'var(--accent-color-soft)' }}>
                        <KeyRound size={18} style={{ color: 'var(--accent-color)' }} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-zinc-200">{ks.name}</p>
                        <p className="text-xs text-zinc-500">{ks.keys.toLocaleString()} keys</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium text-emerald-400 bg-emerald-500/10">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> {ks.status}
                      </span>
                      <ChevronRight size={16} className="text-zinc-600 group-hover:text-zinc-400 transition-colors" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="glass rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold">Service token</h2>
                <Server size={18} className="text-zinc-500" />
              </div>
              <p className="text-sm text-zinc-500 mb-4">Use this token in your loadstring to deliver protected scripts.</p>
              <div className="flex items-center gap-2">
                <code className="flex-1 px-3 py-2.5 rounded-lg bg-black/40 border border-zinc-800 text-xs font-mono text-zinc-400 truncate">
                  svc_8a3b2c1d9e4f5g6h7j8k9l0m1n2o3p
                </code>
                <button className="btn-ghost p-2.5" title="Copy token">
                  <Copy size={16} />
                </button>
              </div>
              <div className="mt-4 p-3 rounded-lg bg-black/30 border border-zinc-800">
                <div className="flex items-center gap-2 mb-1.5">
                  <Eye size={14} className="text-zinc-500" />
                  <span className="text-xs font-medium text-zinc-400">Quick start</span>
                </div>
                <code className="text-xs font-mono text-zinc-500 break-all">
                  loadstring(game:HttpGet("https://protected.obscuravm.com/YOUR_SERVICE_TOKEN/YOUR_SCRIPT_TOKEN/download"))()
                </code>
              </div>
            </div>
          </div>

          <div className="glass rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-semibold">Execution activity</h2>
                <p className="text-xs text-zinc-500 mt-0.5">Last 7 days</p>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <TrendingUp size={16} style={{ color: 'var(--accent-color)' }} />
                <span className="text-zinc-400">+12% vs last week</span>
              </div>
            </div>
            <div className="flex items-end justify-between gap-2 h-40 mt-6">
              {[40, 55, 35, 70, 50, 85, 65].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <div
                    className="w-full rounded-t-lg transition-all duration-500 hover:opacity-80"
                    style={{ height: `${h}%`, background: 'var(--accent-color)', opacity: 0.7 + (i / 10) }}
                  />
                  <span className="text-xs text-zinc-600">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, sub, trend }: { icon: any; label: string; value: string; sub: string; trend: 'up' | 'warn' }) {
  return (
    <div className="glass rounded-2xl p-5 hover:card-glow transition-all duration-300">
      <div className="flex items-center justify-between mb-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'var(--accent-color-soft)' }}>
          <Icon size={20} style={{ color: 'var(--accent-color)' }} />
        </div>
        {trend === 'up' ? (
          <span className="text-xs text-emerald-400 font-medium flex items-center gap-1">
            <TrendingUp size={12} /> Up
          </span>
        ) : (
          <span className="text-xs text-amber-400 font-medium flex items-center gap-1">
            <Clock size={12} /> Limited
          </span>
        )}
      </div>
      <p className="text-2xl font-bold tabular-nums">{value}</p>
      <p className="text-sm text-zinc-500 mt-1">{label}</p>
      <p className="text-xs text-zinc-600 mt-0.5">{sub}</p>
    </div>
  );
}
