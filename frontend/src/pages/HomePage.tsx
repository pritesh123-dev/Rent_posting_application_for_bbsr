import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { roomApi } from '../services/roomApi';

export default function HomePage() {
  const nav = useNavigate();
  const [city, setCity] = useState('');
  const [stats, setStats] = useState<{ totalListings: number; freeRemaining: number } | null>(null);

  useEffect(() => {
    roomApi.stats().then(setStats).catch(() => {});
  }, []);

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    nav(`/find${city ? `?city=${encodeURIComponent(city)}` : ''}`);
  };

  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="hero-gradient text-white rounded-2xl px-6 py-14 md:py-20 text-center shadow-lg">
        <h1 className="text-3xl md:text-5xl font-extrabold mb-3">
          Find your next room, nearby.
        </h1>
        <p className="text-white/90 max-w-xl mx-auto mb-8 text-lg">
          Hyperlocal, map-powered room discovery. Post your room free —
          connect with tenants via call or WhatsApp in seconds.
        </p>

        <form onSubmit={submitSearch}
              className="max-w-xl mx-auto flex flex-col sm:flex-row gap-2 bg-white dark:bg-gray-900 p-2 rounded-xl shadow">
          <input
            className="flex-1 bg-transparent text-gray-900 dark:text-gray-100 px-3 py-2 focus:outline-none"
            placeholder="Enter a city (e.g. Bhubaneswar)…"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button type="submit" className="btn-primary px-5 py-2">🔍 Search</button>
        </form>

        <div className="mt-6 flex justify-center gap-3 flex-wrap">
          <button onClick={() => nav('/find')}
                  className="bg-white/15 hover:bg-white/25 px-4 py-2 rounded-lg font-medium backdrop-blur">
            📍 Use my location
          </button>
          <button onClick={() => nav('/post')}
                  className="bg-white text-brand-700 hover:bg-gray-100 px-4 py-2 rounded-lg font-semibold">
            🏠 Post your room
          </button>
        </div>
      </section>

      {/* Stats */}
      {stats && (
        <section className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <StatCard label="Rooms Listed" value={stats.totalListings} icon="🏘️" />
          <StatCard label="Free Slots Left" value={stats.freeRemaining} icon="🎟️" />
          <StatCard label="Response Time" value="< 1 min" icon="⚡" />
        </section>
      )}

      {/* Features */}
      <section>
        <h2 className="text-2xl font-bold text-center mb-8">Why RoomRadar?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Feature icon="📍" title="Location-first"
                   desc="Search by radius with precise Haversine distance — sorted by proximity." />
          <Feature icon="📞" title="Direct contact"
                   desc="Click-to-call, WhatsApp, or open the location in Google Maps — no middlemen." />
          <Feature icon="🎁" title="Free to post"
                   desc="First 2000 listings are completely free. No hidden charges, no commissions." />
        </div>
      </section>

      {/* How it works */}
      <section className="card p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">How it works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Step num="1" title="Allow location" desc="Share your location to see rooms within your chosen radius." />
          <Step num="2" title="Filter & compare" desc="Filter by rent and availability, sorted by distance." />
          <Step num="3" title="Contact owner" desc="Call or WhatsApp instantly — no in-app messaging lag." />
        </div>
      </section>
    </div>
  );
}

function StatCard({ label, value, icon }: { label: string; value: number | string; icon: string }) {
  return (
    <div className="card p-5 text-center">
      <div className="text-3xl mb-1">{icon}</div>
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-sm text-gray-500">{label}</div>
    </div>
  );
}

function Feature({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <div className="card p-6 text-center">
      <div className="text-4xl mb-3">{icon}</div>
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400">{desc}</p>
    </div>
  );
}

function Step({ num, title, desc }: { num: string; title: string; desc: string }) {
  return (
    <div>
      <div className="w-10 h-10 rounded-full hero-gradient text-white font-bold flex items-center justify-center mb-3">
        {num}
      </div>
      <h3 className="font-semibold mb-1">{title}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400">{desc}</p>
    </div>
  );
}
