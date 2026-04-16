import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { roomApi } from '../services/roomApi';

export default function HomePage() {
  const nav = useNavigate();
  const [city, setCity] = useState('');
  const [stats, setStats] = useState<{ totalListings: number; freeRemaining: number } | null>(null);

  useEffect(() => { roomApi.stats().then(setStats).catch(() => {}); }, []);

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    nav(`/find${city ? `?city=${encodeURIComponent(city)}` : ''}`);
  };

  return (
    <div className="space-y-16 pb-8">
      {/* Hero */}
      <section className="relative hero-gradient text-white rounded-3xl px-6 py-16 md:py-24 text-center shadow-2xl shadow-indigo-500/20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
        </div>

        <div className="relative z-10">
          <span className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            🎉 First 2,000 listings are FREE
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight">
            Find Your Perfect Room<br />
            <span className="bg-gradient-to-r from-yellow-200 to-pink-200 bg-clip-text text-transparent">in Bhubaneswar</span>
          </h1>
          <p className="text-white/80 max-w-2xl mx-auto mb-10 text-lg">
            Discover nearby rooms with real-time distance, connect directly with owners via call or WhatsApp — zero brokerage.
          </p>

          <form onSubmit={submitSearch}
                className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-2 bg-white dark:bg-gray-900 p-2 rounded-2xl shadow-xl">
            <div className="flex-1 flex items-center gap-2 px-3">
              <span className="text-gray-400">🔍</span>
              <input
                className="flex-1 bg-transparent text-gray-900 dark:text-gray-100 py-2 focus:outline-none placeholder:text-gray-400"
                placeholder="Search by city (e.g. Bhubaneswar, Cuttack…)"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <button type="submit" className="btn-primary px-8 py-3 text-base">Search</button>
          </form>

          <div className="mt-6 flex justify-center gap-3 flex-wrap">
            <button onClick={() => nav('/find')}
                    className="bg-white/15 hover:bg-white/25 backdrop-blur-sm px-5 py-2.5 rounded-xl font-medium border border-white/20 transition-all">
              📍 Use my location
            </button>
            <button onClick={() => nav('/post')}
                    className="bg-white text-indigo-700 hover:bg-gray-100 px-5 py-2.5 rounded-xl font-semibold shadow-md transition-all">
              🏠 Post your room
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      {stats && (
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard icon="🏘️" value={stats.totalListings} label="Rooms Listed" color="indigo" />
          <StatCard icon="🎟️" value={stats.freeRemaining} label="Free Slots Left" color="emerald" />
          <StatCard icon="⚡" value="Instant" label="Response Time" color="amber" />
        </section>
      )}

      {/* Features */}
      <section>
        <div className="text-center mb-10">
          <span className="badge badge-indigo mb-3 inline-block">FEATURES</span>
          <h2 className="text-3xl font-extrabold">Why Room Finder in BBSR?</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard icon="📍" title="Location-first search"
            desc="GPS-powered room search sorted by Haversine distance. See exactly how far each room is." />
          <FeatureCard icon="📞" title="Direct contact"
            desc="Click-to-call and WhatsApp owners instantly. No middlemen, no commission, no waiting." />
          <FeatureCard icon="🗺️" title="Map & Grid views"
            desc="Toggle between beautiful grid cards and interactive map view to find rooms visually." />
        </div>
      </section>

      {/* Steps */}
      <section className="card p-8 md:p-12">
        <div className="text-center mb-10">
          <span className="badge badge-indigo mb-3 inline-block">HOW IT WORKS</span>
          <h2 className="text-3xl font-extrabold">Find a room in 3 steps</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Step num="1" title="Share your location"
                desc="Allow GPS access or enter a city to discover rooms near you." />
          <Step num="2" title="Filter & compare"
                desc="Set rent budget, radius, and availability. Sort by distance or price." />
          <Step num="3" title="Contact & move in"
                desc="Call or WhatsApp the owner directly. Visit, verify, and move in." />
        </div>
      </section>
    </div>
  );
}

function StatCard({ icon, value, label, color }: { icon: string; value: number | string; label: string; color: string }) {
  const bg: Record<string, string> = {
    indigo: 'bg-indigo-50 dark:bg-indigo-900/20',
    emerald: 'bg-emerald-50 dark:bg-emerald-900/20',
    amber: 'bg-amber-50 dark:bg-amber-900/20',
  };
  return (
    <div className={`card p-6 text-center ${bg[color] ?? ''}`}>
      <div className="text-3xl mb-2">{icon}</div>
      <div className="text-3xl font-extrabold">{value}</div>
      <div className="text-sm text-gray-500 font-medium">{label}</div>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <div className="card p-6 group hover:-translate-y-1">
      <div className="w-14 h-14 rounded-2xl hero-gradient flex items-center justify-center text-2xl mb-4 shadow-lg shadow-indigo-500/20 group-hover:shadow-xl transition-shadow">
        {icon}
      </div>
      <h3 className="font-bold text-lg mb-2">{title}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{desc}</p>
    </div>
  );
}

function Step({ num, title, desc }: { num: string; title: string; desc: string }) {
  return (
    <div className="text-center">
      <div className="w-12 h-12 rounded-2xl hero-gradient text-white font-bold text-lg flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-500/20">
        {num}
      </div>
      <h3 className="font-bold text-lg mb-2">{title}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{desc}</p>
    </div>
  );
}
