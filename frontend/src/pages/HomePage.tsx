import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { roomApi } from '../services/roomApi';

export default function HomePage() {
  const nav = useNavigate();
  const [city, setCity] = useState('');
  const [stats, setStats] = useState<{ totalListings: number; freeRemaining: number } | null>(null);

  useEffect(() => { roomApi.stats().then(setStats).catch(() => {}); }, []);

  const go = (e: React.FormEvent) => {
    e.preventDefault();
    nav(`/find${city ? `?city=${encodeURIComponent(city)}` : ''}`);
  };

  return (
    <div className="space-y-20 pb-12">
      {/* Hero */}
      <section className="relative pt-8 md:pt-16 pb-20 text-center overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl" />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-accent-light text-accent-dark text-sm font-semibold px-4 py-2 rounded-full mb-6">
            <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            {stats ? `${stats.freeRemaining} free slots remaining` : 'First 2,000 listings free'}
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold text-primary leading-[1.1] mb-5">
            Find the perfect room<br />
            <span className="text-accent">in Bhubaneswar</span>
          </h1>

          <p className="text-muted text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            Discover verified rooms near you. Connect directly with owners — zero brokerage, zero hassle.
          </p>

          {/* Search bar */}
          <form onSubmit={go} className="max-w-xl mx-auto">
            <div className="flex items-center bg-surface rounded-2xl shadow-float p-2 border border-subtle/50">
              <div className="flex items-center gap-3 flex-1 px-3">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#9CA3AF" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" strokeLinecap="round" />
                </svg>
                <input
                  className="flex-1 bg-transparent py-2 text-primary placeholder:text-muted focus:outline-none"
                  placeholder="Search by city or area..."
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <button type="submit" className="btn-accent px-6 py-3 text-sm">
                Search
              </button>
            </div>
          </form>

          {/* Quick actions */}
          <div className="flex justify-center gap-3 mt-6">
            <button onClick={() => nav('/find')} className="btn-outline px-5 py-2.5 text-sm">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
                <circle cx="12" cy="11" r="3" />
              </svg>
              Use my location
            </button>
            <button onClick={() => nav('/post')} className="btn-dark px-5 py-2.5 text-sm">
              Post your room
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      {stats && (
        <section className="grid grid-cols-3 gap-4 max-w-3xl mx-auto">
          <Stat value={stats.totalListings} label="Rooms listed" />
          <Stat value={stats.freeRemaining} label="Free slots" />
          <Stat value="Instant" label="Contact" />
        </section>
      )}

      {/* Features */}
      <section className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-primary">How it works</h2>
          <p className="text-muted mt-2">Three simple steps to find or post a room</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Feature
            icon={<svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="#10B981" strokeWidth="2"><path strokeLinecap="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" /><circle cx="12" cy="11" r="3" /></svg>}
            title="Share location"
            desc="Allow GPS or search by city to discover rooms within your preferred radius."
          />
          <Feature
            icon={<svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="#10B981" strokeWidth="2"><path strokeLinecap="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>}
            title="Filter & compare"
            desc="Set budget, radius, and availability. Compare rooms on a grid or map view."
          />
          <Feature
            icon={<svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="#10B981" strokeWidth="2"><path strokeLinecap="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>}
            title="Contact directly"
            desc="Call or WhatsApp the owner instantly. No middlemen, no commissions."
          />
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto">
        <div className="card p-10 text-center bg-gradient-to-br from-accent/5 to-amber-500/5 border border-accent/10">
          <h2 className="text-2xl font-extrabold mb-3">Have a room to rent?</h2>
          <p className="text-muted mb-6">Post it for free and reach hundreds of tenants in Bhubaneswar.</p>
          <button onClick={() => nav('/post')} className="btn-accent px-8 py-3.5 text-base">
            Post your room — it's free
          </button>
        </div>
      </section>
    </div>
  );
}

function Stat({ value, label }: { value: number | string; label: string }) {
  return (
    <div className="text-center p-5 rounded-3xl bg-surface shadow-card">
      <div className="text-2xl font-extrabold text-primary">{typeof value === 'number' ? value.toLocaleString() : value}</div>
      <div className="text-sm text-muted mt-0.5">{label}</div>
    </div>
  );
}

function Feature({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="text-center">
      <div className="w-16 h-16 rounded-2xl bg-accent-light flex items-center justify-center mx-auto mb-4">
        {icon}
      </div>
      <h3 className="font-bold text-lg mb-2">{title}</h3>
      <p className="text-sm text-muted leading-relaxed">{desc}</p>
    </div>
  );
}
