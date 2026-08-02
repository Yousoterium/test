import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Shield, ArrowLeft, ExternalLink, CheckCircle2, Loader2, KeyRound, AlertTriangle, RotateCcw } from 'lucide-react';
import AccentPicker from '@/components/AccentPicker';

export default function KeyPage() {
  const { keyName } = useParams<{ keyName: string }>();
  const [step, setStep] = useState(1);
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => { document.title = `Obscura \u2014 ${keyName}`; }, [keyName]);

  const handleGetKey = () => {
    setVerifying(true);
    setTimeout(() => {
      setVerifying(false);
      setVerified(true);
      setStep(2);
    }, 2000);
  };

  const handleQuickCheck = () => {
    setError(false);
    setVerifying(true);
    setTimeout(() => {
      setVerifying(false);
      setVerified(true);
    }, 1500);
  };

  const handleReset = () => {
    setStep(1);
    setVerified(false);
    setError(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-zinc-100 flex flex-col">
      <header className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-zinc-900">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center transition-transform group-hover:scale-105" style={{ background: 'var(--accent-color)' }}>
            <Shield size={20} className="text-white" />
          </div>
          <span className="text-lg font-bold tracking-tight">Obscura</span>
        </Link>
        <AccentPicker />
      </header>

      <div className="flex-1 flex items-center justify-center px-4 py-12 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[120px] opacity-10" style={{ background: 'var(--accent-color)' }} />

        <div className="relative w-full max-w-lg">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5" style={{ background: 'var(--accent-color-soft)' }}>
              <KeyRound size={32} style={{ color: 'var(--accent-color)' }} />
            </div>
            <h1 className="text-3xl font-bold tracking-tight capitalize">{keyName}</h1>
            <p className="mt-3 text-zinc-400">
              {verified ? 'You\'re verified! Your key is ready below.' : 'Complete the link below to unlock your key.'}
            </p>
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-zinc-500">
                Step {step} of {step === 1 ? '40%' : '100%'}
              </span>
              <span className="text-xs text-zinc-500">{step === 1 ? '40%' : '100%'}</span>
            </div>
            <div className="h-1.5 rounded-full bg-zinc-800 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: step === 1 ? '40%' : '100%', background: 'var(--accent-color)' }}
              />
            </div>
          </div>

          <div className="glass rounded-2xl p-6 card-glow">
            {step === 1 && !verified && (
              <>
                <div className="mb-5">
                  <h2 className="font-semibold text-zinc-200 mb-1">Step 1 \u00b7 complete a quick step to continue</h2>
                  <p className="text-sm text-zinc-500">You'll complete a short step, then be sent back here to continue.</p>
                </div>
                <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); handleGetKey(); }}
                  className="btn-accent w-full flex items-center justify-center gap-2 mb-4"
                >
                  {verifying ? (
                    <><Loader2 size={16} className="animate-spin" /> Verifying...</>
                  ) : (
                    <>Get my key <ExternalLink size={16} /></>
                  )}
                </a>
                <div className="flex items-center justify-between">
                  <button onClick={handleReset} className="text-xs text-zinc-500 hover:text-zinc-300 flex items-center gap-1.5 transition-colors">
                    <RotateCcw size={12} /> Start over
                  </button>
                  <Link to="/" className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors">
                    Leave this page
                  </Link>
                </div>
              </>
            )}

            {step === 1 && verified && (
              <>
                <div className="mb-5">
                  <h2 className="font-semibold text-zinc-200 mb-1">Quick check</h2>
                  <p className="text-sm text-zinc-500">Confirm you're human to continue.</p>
                </div>
                <button onClick={handleQuickCheck} className="btn-accent w-full flex items-center justify-center gap-2 mb-4">
                  {verifying ? (
                    <><Loader2 size={16} className="animate-spin" /> Checking...</>
                  ) : verified ? (
                    <><CheckCircle2 size={16} /> Verified \u2014 get your key</>
                  ) : (
                    <>I'm human</>
                  )}
                </button>
                {verified && (
                  <div className="mt-4 p-4 rounded-xl bg-black/30 border border-zinc-800 animate-fade-in-up">
                    <p className="text-xs text-zinc-500 mb-2">Your key</p>
                    <div className="flex items-center gap-2">
                      <code className="flex-1 text-sm font-mono text-zinc-300 truncate">
                        OBS-{keyName?.toUpperCase().slice(0, 4)}-XXXX-XXXX-XXXX
                      </code>
                      <button className="btn-ghost text-xs px-3 py-1.5">Copy</button>
                    </div>
                  </div>
                )}
              </>
            )}

            {error && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 mb-4">
                <AlertTriangle size={16} className="text-amber-400 shrink-0" />
                <p className="text-sm text-amber-400">Something went wrong. Please try again.</p>
              </div>
            )}
          </div>

          <div className="mt-6 p-4 rounded-xl bg-black/20 border border-zinc-900">
            <h3 className="text-sm font-semibold text-zinc-300 mb-2">Before you continue</h3>
            <p className="text-xs text-zinc-500 leading-relaxed">
              This key system runs on <span className="text-zinc-300 font-medium">Obscura</span>. By continuing you agree to Obscura's{' '}
              <Link to="/terms" className="underline hover:text-zinc-300 transition-colors">Terms of Service</Link> and{' '}
              <Link to="/privacy" className="underline hover:text-zinc-300 transition-colors">Privacy Policy</Link>, including that you will not deobfuscate, reverse-engineer, or tamper with protected scripts.
            </p>
          </div>

          <div className="mt-6 text-center">
            <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-300 transition-colors">
              <ArrowLeft size={14} /> Back to Obscura
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
