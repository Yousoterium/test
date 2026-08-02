import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Shield, Mail, Lock, User, ArrowRight, Loader2, Check } from 'lucide-react';
import AccentPicker from '@/components/AccentPicker';

export default function LoginPage() {
  const [params] = useSearchParams();
  const [tab, setTab] = useState<'login' | 'register'>(params.get('tab') === 'register' ? 'register' : 'login');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => { document.title = 'Obscura \u2014 Login'; }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setDone(true); }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-zinc-100 flex flex-col">
      <div className="flex items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center transition-transform group-hover:scale-105" style={{ background: 'var(--accent-color)' }}>
            <Shield size={20} className="text-white" />
          </div>
          <span className="text-lg font-bold tracking-tight">Obscura</span>
        </Link>
        <AccentPicker />
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="flex gap-1 p-1 glass rounded-xl mb-6">
            <button
              onClick={() => { setTab('login'); setDone(false); }}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${tab === 'login' ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
              style={tab === 'login' ? { background: 'var(--accent-color)' } : {}}
            >
              Login
            </button>
            <button
              onClick={() => { setTab('register'); setDone(false); }}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${tab === 'register' ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
              style={tab === 'register' ? { background: 'var(--accent-color)' } : {}}
            >
              Get started
            </button>
          </div>

          <div className="glass rounded-2xl p-8 card-glow">
            {done ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'var(--accent-color-soft)' }}>
                  <Check size={32} style={{ color: 'var(--accent-color)' }} />
                </div>
                <h2 className="text-xl font-semibold mb-2">{tab === 'login' ? 'Welcome back!' : 'Account created!'}</h2>
                <p className="text-sm text-zinc-400 mb-6">Redirecting you to your dashboard...</p>
                <Link to="/dashboard" className="btn-accent inline-flex items-center gap-2">
                  Go to dashboard <ArrowRight size={16} />
                </Link>
              </div>
            ) : (
              <>
                <h1 className="text-2xl font-bold mb-2">{tab === 'login' ? 'Welcome back' : 'Create your account'}</h1>
                <p className="text-sm text-zinc-500 mb-6">
                  {tab === 'login' ? 'Log in to your Obscura dashboard.' : 'Start protecting your scripts in seconds.'}
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {tab === 'register' && (
                    <div>
                      <label className="block text-xs font-medium text-zinc-400 mb-1.5">Username</label>
                      <div className="relative">
                        <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                        <input type="text" required className="input-field pl-10" placeholder="Your name" />
                      </div>
                    </div>
                  )}
                  <div>
                    <label className="block text-xs font-medium text-zinc-400 mb-1.5">Email</label>
                    <div className="relative">
                      <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                      <input type="email" required className="input-field pl-10" placeholder="you@example.com" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-zinc-400 mb-1.5">Password</label>
                    <div className="relative">
                      <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                      <input type="password" required className="input-field pl-10" placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" />
                    </div>
                  </div>
                  <button type="submit" disabled={loading} className="btn-accent w-full flex items-center justify-center gap-2 mt-6">
                    {loading ? <Loader2 size={16} className="animate-spin" /> : (
                      <>{tab === 'login' ? 'Log in' : 'Create account'} <ArrowRight size={16} /></>
                    )}
                  </button>
                </form>
                <p className="mt-6 text-center text-xs text-zinc-500">
                  {tab === 'login' ? (
                    <>Don't have an account? <button onClick={() => setTab('register')} className="font-medium" style={{ color: 'var(--accent-color)' }}>Get started</button></>
                  ) : (
                    <>Already have an account? <button onClick={() => setTab('login')} className="font-medium" style={{ color: 'var(--accent-color)' }}>Log in</button></>
                  )}
                </p>
              </>
            )}
          </div>
          <p className="mt-6 text-center text-xs text-zinc-600">
            Free tier included. No credit card required.
          </p>
        </div>
      </div>
    </div>
  );
}
