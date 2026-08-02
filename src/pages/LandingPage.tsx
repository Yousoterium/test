import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Cpu, Lock, GitBranch, ShieldCheck, EyeOff, Server, KeyRound, Fingerprint, Zap,
  Users, Activity, FileCode, Key, ArrowRight, Check, X, ChevronRight, Sparkles,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const features = [
  { icon: Cpu, title: 'Custom VM', desc: 'Your script compiles down to its own virtual machine, rebuilt from scratch every time. Crack one and you have learned nothing about the next.' },
  { icon: Lock, title: 'Full encryption', desc: 'Strings, numbers, constants and logic are encrypted per build. Nothing readable ever ships in the file.' },
  { icon: GitBranch, title: 'Control flow flattening', desc: 'Logic is flattened into a state machine, so execution order gives away nothing about what the code does.' },
  { icon: ShieldCheck, title: 'Anti-tamper', desc: 'The build checks itself as it runs. Change a single byte and it decodes to noise instead of your code.' },
  { icon: EyeOff, title: 'Anti-dump', desc: 'Dumpers, loadstring hooks and debug tracers hit decoys and garbage. The real payload stays out of reach.' },
  { icon: Server, title: 'Server-lock', desc: 'Part of the key stays on our servers. A leaked or re-hosted file is dead weight without a live, authorized run.' },
  { icon: KeyRound, title: 'Key systems', desc: 'HWID locks, key generation, keyless windows and gamepass keys, all built in and ready to sell.' },
  { icon: Fingerprint, title: 'Watermarking', desc: 'Every build carries a hidden, signed owner tag, so any leak traces straight back to its source.' },
  { icon: Zap, title: 'Protects in seconds', desc: 'A tuned pipeline protects a full script in seconds. Shipping an update never means sitting around waiting.' },
];

const stats = [
  { icon: Users, label: 'Total users', value: 0 },
  { icon: Activity, label: 'Total executions', value: 0 },
  { icon: FileCode, label: 'Total scripts', value: 0 },
  { icon: Key, label: 'Total obfuscations', value: 0 },
];

const faqs = [
  { q: 'Can I store and re-protect my scripts?', a: 'Yes. We store your scripts so you can edit and re-protect them anytime from your dashboard. They stay private to your account, so only you can view or edit them.' },
  { q: 'How is this different from other obfuscators?', a: 'Every build is a unique virtual machine with real runtime anti-tamper, plus key systems, watermarking and server-lock in one place, not bolted on afterwards.' },
  { q: 'Will protection slow down my script?', a: 'Yes. The runtime is tuned to stay light, and protection is applied at build time, so your players never wait.' },
  { q: 'Can I sell keys and monetize?', a: 'Yes. HWID locks, key generation, keyless windows and gamepass keys are built in, and your key page is fully brandable.' },
  { q: 'What happens if my script gets leaked?', a: 'With server-lock on, a leaked file is inert offline, and the hidden watermark traces the leak straight back to its owner.' },
];

const comparisonRows = [
  { section: 'Obfuscation', items: [
    { label: 'Per-build virtual machine', free: true, plus: true, max: true },
    { label: 'Runtime anti-tamper', free: true, plus: true, max: true },
    { label: 'Constant & string encryption', free: true, plus: true, max: true },
    { label: 'Server-lock protection', free: true, plus: true, max: true },
    { label: 'Owner watermark & traitor trace', free: false, plus: true, max: true },
    { label: 'Native-function macros (NO_VIRT)', free: false, plus: false, max: true },
    { label: 'Obfuscations per month', free: '5', plus: '50', max: '200' },
    { label: 'Max file size per upload', free: '250 KB', plus: '500 KB', max: '1 MB' },
    { label: 'Priority obfuscation queue', free: false, plus: false, max: true },
  ]},
  { section: 'Delivery & limits', items: [
    { label: 'Hosted loadstring delivery', free: true, plus: true, max: true },
    { label: 'Scripts', free: '10', plus: '25', max: '60' },
    { label: 'Key services', free: '3', plus: '7', max: '15' },
    { label: 'Protected links', free: '10', plus: '25', max: '60' },
  ]},
  { section: 'Key system', items: [
    { label: 'Built-in key system', free: true, plus: true, max: true },
    { label: 'Custom key page & theming', free: false, plus: true, max: true },
    { label: 'Player blacklist (kick / crash)', free: false, plus: true, max: true },
    { label: 'Roblox group gate', free: false, plus: true, max: true },
    { label: 'Keyless days', free: false, plus: true, max: true },
    { label: 'Gamepass (Robux) key sales', free: false, plus: true, max: true },
    { label: 'Keep all key-link revenue', free: false, plus: true, max: true },
  ]},
  { section: 'Selling & automation', items: [
    { label: 'Live dashboard (real-time kicks)', free: false, plus: true, max: true },
    { label: 'Discord execution-log webhooks', free: false, plus: true, max: true },
    { label: 'Custom credit comment', free: false, plus: true, max: true },
    { label: 'Disable console output', free: false, plus: true, max: true },
    { label: 'API keys & whitelist bot', free: false, plus: false, max: true },
    { label: 'Automated key sales (SellAuth / Sellix)', free: false, plus: false, max: true },
    { label: 'Priority support', free: false, plus: false, max: true },
  ]},
];

function AnimatedCounter({ target }: { target: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setVisible(true); });
    });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const duration = 2000;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(target * eased));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [visible, target]);

  return <div ref={ref}>{count.toLocaleString()}</div>;
}

export default function LandingPage() {
  useEffect(() => { document.title = 'Obscura \u2014 Lock down your Code'; }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-zinc-100">
      <Navbar />

      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0a0b]" />
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-[120px] opacity-20"
          style={{ background: 'var(--accent-color)' }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs text-zinc-400 mb-6 animate-fade-in-up">
            <Sparkles size={14} style={{ color: 'var(--accent-color)' }} />
            <span>Protection built for Luau, not bolted on after</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight max-w-3xl mx-auto leading-[1.1] animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Lock down your Code.
            <br />
            <span className="gradient-text">Ship with confidence.</span>
          </h1>
          <p className="mt-6 text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Every build compiles into its own virtual machine, hardened with runtime anti-tamper and key systems built in. Protect your Roblox scripts, sell them, and stop watching the leak sites.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <Link to="/login?tab=register" className="btn-accent flex items-center gap-2">
              Start protecting <ArrowRight size={16} />
            </Link>
            <Link to="/docs" className="btn-ghost">Documentation</Link>
          </div>
          <p className="mt-4 text-xs text-zinc-600 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            Free tier included. No credit card required.
          </p>
        </div>
      </section>

      <section id="features" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Layers between your code and everyone else</h2>
            <p className="mt-4 text-zinc-400 max-w-2xl mx-auto">
              Protection built for Luau, not bolted on after. It holds where it counts: at runtime, on real executors.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <div
                key={f.title}
                className="group glass rounded-2xl p-6 hover:card-glow transition-all duration-300 hover:-translate-y-1 animate-fade-in-up"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110" style={{ background: 'var(--accent-color-soft)' }}>
                  <f.icon size={22} style={{ color: 'var(--accent-color)' }} />
                </div>
                <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 border-y border-zinc-900 bg-black/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-bold mb-10">The numbers, not the promises</h2>
          <p className="text-center text-sm text-zinc-500 mb-10">Live totals, updated across the platform.</p>
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="flex justify-center mb-3">
                  <s.icon size={24} className="text-zinc-500" />
                </div>
                <div className="text-3xl font-bold tabular-nums">
                  <AnimatedCounter target={s.value} />
                </div>
                <p className="mt-1 text-sm text-zinc-500">{s.label}</p>
              </div>
            ))}
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <Key size={24} className="text-zinc-500" />
              </div>
              <div className="text-3xl font-bold tabular-nums">
                <AnimatedCounter target={0} />
              </div>
              <p className="mt-1 text-sm text-zinc-500">Total keys</p>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Pay when it starts paying you</h2>
            <p className="mt-4 text-zinc-400">Start free. Upgrade when you are ready to sell.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="glass rounded-2xl p-8 flex flex-col">
              <h3 className="text-lg font-semibold">Free</h3>
              <p className="text-sm text-zinc-500 mt-1">For your first scripts and small drops.</p>
              <p className="mt-6 text-4xl font-bold">\u20ac0 <span className="text-base font-normal text-zinc-500">/ mo</span></p>
              <ul className="mt-6 space-y-3 flex-1">
                {['Core VM obfuscation', 'Anti-tamper + encryption', 'Server-lock included', '5 obfuscations / month'].map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-zinc-300">
                    <Check size={16} className="mt-0.5 shrink-0" style={{ color: 'var(--accent-color)' }} /> {f}
                  </li>
                ))}
              </ul>
              <Link to="/login?tab=register" className="btn-ghost mt-8 text-center">Start free</Link>
            </div>
            <div className="glass rounded-2xl p-8 flex flex-col relative card-glow border-2" style={{ borderColor: 'var(--accent-color)' }}>
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-semibold text-white" style={{ background: 'var(--accent-color)' }}>
                Most popular
              </div>
              <h3 className="text-lg font-semibold">Plus</h3>
              <p className="text-sm text-zinc-500 mt-1">For sellers pushing updates every week.</p>
              <p className="mt-6 text-4xl font-bold">\u20ac5.99 <span className="text-base font-normal text-zinc-500">/ mo</span></p>
              <ul className="mt-6 space-y-3 flex-1">
                {['Everything in Free', '50 obfuscations / month', 'Full key systems', 'Custom key page + watermarking'].map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-zinc-300">
                    <Check size={16} className="mt-0.5 shrink-0" style={{ color: 'var(--accent-color)' }} /> {f}
                  </li>
                ))}
              </ul>
              <Link to="/login?tab=register" className="btn-accent mt-8 text-center">Choose Plus</Link>
            </div>
            <div className="glass rounded-2xl p-8 flex flex-col">
              <h3 className="text-lg font-semibold">Max</h3>
              <p className="text-sm text-zinc-500 mt-1">For teams and nonstop release schedules.</p>
              <p className="mt-6 text-4xl font-bold">\u20ac10.99 <span className="text-base font-normal text-zinc-500">/ mo</span></p>
              <ul className="mt-6 space-y-3 flex-1">
                {['Everything in Plus', '200 obfuscations / month', 'API access', 'Priority support'].map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-zinc-300">
                    <Check size={16} className="mt-0.5 shrink-0" style={{ color: 'var(--accent-color)' }} /> {f}
                  </li>
                ))}
              </ul>
              <Link to="/login?tab=register" className="btn-ghost mt-8 text-center">Choose Max</Link>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p className="text-sm text-zinc-500">Start on the free tier, no card required. Paid plans upgrade through our store.</p>
          </div>
          <div className="mt-8 max-w-5xl mx-auto glass rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-semibold">Enterprise</h4>
              <p className="text-sm text-zinc-500 mt-1">Custom limits, dedicated support, and volume pricing for studios.</p>
            </div>
            <a href="https://discord.gg/obscuravm" target="_blank" rel="noreferrer" className="btn-ghost flex items-center gap-2 whitespace-nowrap">
              Contact us <ChevronRight size={16} />
            </a>
          </div>
        </div>
      </section>

      <section className="py-20 border-t border-zinc-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-center mb-2">Compare every plan</h2>
          <p className="text-center text-zinc-400 mb-10">Every feature and limit, side by side. No asterisks.</p>
          <div className="overflow-x-auto glass rounded-2xl">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-800">
                  <th className="text-left p-4 font-medium text-zinc-400"></th>
                  <th className="p-4 text-center">
                    <span className="block font-semibold">Free</span>
                    <span className="text-xs text-zinc-500">\u20ac0</span>
                  </th>
                  <th className="p-4 text-center" style={{ background: 'var(--accent-color-soft)' }}>
                    <span className="block font-semibold">Plus</span>
                    <span className="text-xs text-zinc-500">\u20ac5.99 / mo</span>
                    <span className="text-xs" style={{ color: 'var(--accent-color)' }}>Most popular</span>
                  </th>
                  <th className="p-4 text-center">
                    <span className="block font-semibold">Max</span>
                    <span className="text-xs text-zinc-500">\u20ac10.99 / mo</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <>
                    <tr key={row.section} className="border-b border-zinc-800/50">
                      <td colSpan={4} className="p-3 px-4 text-xs font-semibold uppercase tracking-wider text-zinc-500" style={{ background: 'rgba(39, 39, 42, 0.3)' }}>
                        {row.section}
                      </td>
                    </tr>
                    {row.items.map((item: any) => (
                      <tr key={item.label} className="border-b border-zinc-800/30 hover:bg-zinc-800/20 transition-colors">
                        <td className="p-4 text-zinc-300">{item.label}</td>
                        {[item.free, item.plus, item.max].map((val, i) => (
                          <td key={i} className="p-4 text-center" style={i === 1 ? { background: 'var(--accent-color-soft)' } : {}}>
                            {typeof val === 'boolean' ? (
                              val ? <Check size={16} className="mx-auto" style={{ color: 'var(--accent-color)' }} /> : <X size={16} className="mx-auto text-zinc-700" />
                            ) : (
                              <span className="font-medium text-zinc-200">{val}</span>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </>
                ))}
                <tr className="border-b border-zinc-800/30">
                  <td className="p-4"></td>
                  <td className="p-4 text-center"><Link to="/login?tab=register" className="btn-ghost text-xs">Start free</Link></td>
                  <td className="p-4 text-center" style={{ background: 'var(--accent-color-soft)' }}><Link to="/login?tab=register" className="btn-accent text-xs">Choose Plus</Link></td>
                  <td className="p-4 text-center"><Link to="/login?tab=register" className="btn-ghost text-xs">Choose Max</Link></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex items-center justify-center gap-6 text-xs text-zinc-500">
            <span className="flex items-center gap-1.5"><Check size={14} style={{ color: 'var(--accent-color)' }} /> Included</span>
            <span className="flex items-center gap-1.5"><X size={14} className="text-zinc-700" /> Not included</span>
          </div>
        </div>
      </section>

      <section className="py-20 border-t border-zinc-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-center mb-10">Before you ask</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <FAQItem key={i} faq={faq} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[100px] opacity-10" style={{ background: 'var(--accent-color)' }} />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ background: 'var(--accent-color-soft)' }}>
            <ShieldCheck size={32} style={{ color: 'var(--accent-color)' }} />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Your code, locked down. Nobody else gets in.</h2>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Link to="/login?tab=register" className="btn-accent flex items-center gap-2">Get started <ArrowRight size={16} /></Link>
            <Link to="/docs" className="btn-ghost">Documentation</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function FAQItem({ faq }: { faq: { q: string; a: string } }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="glass rounded-xl overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-5 text-left">
        <span className="font-medium text-zinc-200">{faq.q}</span>
        <ChevronRight size={18} className={`text-zinc-500 transition-transform shrink-0 ${open ? 'rotate-90' : ''}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-48' : 'max-h-0'}`}>
        <p className="px-5 pb-5 text-sm text-zinc-400 leading-relaxed">{faq.a}</p>
      </div>
    </div>
  );
}
