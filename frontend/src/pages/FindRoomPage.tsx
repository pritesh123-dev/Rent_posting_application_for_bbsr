import { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { AppDispatch, RootState } from '../redux/store';
import { fetchNearby, fetchAllRooms } from '../redux/roomSlice';
import RoomCard from '../components/RoomCard';
import MapView from '../components/MapView';

type Tab = 'nearby' | 'all';
type View = 'grid' | 'map';

export default function FindRoomPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { nearby, allRooms, loading, error } = useSelector((s: RootState) => s.rooms);
  const [params] = useSearchParams();

  const [tab, setTab] = useState<Tab>('all');
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [radius, setRadius] = useState(10);
  const [maxRent, setMaxRent] = useState('');
  const [minRent, setMinRent] = useState('');
  const [cityFilter, setCityFilter] = useState(params.get('city') || '');
  const [onlyAvailable, setOnlyAvailable] = useState(true);
  const [view, setView] = useState<View>('grid');

  const locate = useCallback(() => {
    if (!navigator.geolocation) {
      toast.error('Geolocation not supported');
      setTab('all');
      return;
    }
    toast.loading('Finding your location...', { id: 'loc' });
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        toast.success('Location found', { id: 'loc' });
        setTab('nearby');
      },
      () => {
        toast.error('Location denied — showing all rooms', { id: 'loc' });
        setTab('all');
      },
      { timeout: 10000 },
    );
  }, []);

  useEffect(() => {
    dispatch(fetchAllRooms({
      city: cityFilter || undefined,
      minRent: minRent ? +minRent : undefined,
      maxRent: maxRent ? +maxRent : undefined,
      available: onlyAvailable ? true : undefined,
      size: 100,
    }));
  }, [cityFilter, minRent, maxRent, onlyAvailable, dispatch]);

  useEffect(() => {
    if (!coords || tab !== 'nearby') return;
    dispatch(fetchNearby({
      lat: coords.lat, lng: coords.lng, radiusKm: radius,
      maxRent: maxRent ? +maxRent : undefined,
      available: onlyAvailable ? true : undefined,
    }));
  }, [coords, radius, maxRent, onlyAvailable, tab, dispatch]);

  const rooms = tab === 'nearby' ? nearby : allRooms;
  const filtered = rooms.filter((r) =>
    (!minRent || r.rent >= +minRent) &&
    (!cityFilter || r.city.toLowerCase().includes(cityFilter.toLowerCase()))
  );

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold">Find rooms</h1>
        <p className="text-muted text-sm mt-1">
          {loading ? 'Searching...' : `${filtered.length} rooms available`}
        </p>
      </div>

      {/* Filters bar */}
      <div className="card p-4">
        <div className="flex flex-wrap items-end gap-3">
          <div className="flex-1 min-w-[180px]">
            <label className="text-xs font-semibold text-muted mb-1 block">City / Area</label>
            <input className="input" placeholder="e.g. Patia, KIIT..." value={cityFilter}
                   onChange={(e) => setCityFilter(e.target.value)} />
          </div>
          {tab === 'nearby' && (
            <div className="w-32">
              <label className="text-xs font-semibold text-muted mb-1 block">Radius: {radius} km</label>
              <input type="range" min={1} max={50} value={radius}
                     onChange={(e) => setRadius(+e.target.value)}
                     className="w-full accent-accent" />
            </div>
          )}
          <div className="w-28">
            <label className="text-xs font-semibold text-muted mb-1 block">Min ₹</label>
            <input type="number" value={minRent} onChange={(e) => setMinRent(e.target.value)}
                   className="input" placeholder="0" />
          </div>
          <div className="w-28">
            <label className="text-xs font-semibold text-muted mb-1 block">Max ₹</label>
            <input type="number" value={maxRent} onChange={(e) => setMaxRent(e.target.value)}
                   className="input" placeholder="Any" />
          </div>
          <label className="flex items-center gap-2 pb-1 cursor-pointer">
            <input type="checkbox" checked={onlyAvailable} className="w-4 h-4 accent-accent rounded"
                   onChange={(e) => setOnlyAvailable(e.target.checked)} />
            <span className="text-sm font-medium">Available</span>
          </label>
          <button onClick={locate} className="btn-accent px-4 py-3 text-sm">
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
              <circle cx="12" cy="11" r="3" />
            </svg>
            {coords ? 'Re-locate' : 'Locate me'}
          </button>
        </div>
      </div>

      {/* Tabs + View toggle */}
      <div className="flex items-center justify-between">
        <div className="flex bg-bg-alt rounded-2xl p-1 gap-1">
          <TabBtn active={tab === 'all'} onClick={() => setTab('all')}>All rooms</TabBtn>
          <TabBtn active={tab === 'nearby'} onClick={() => { if (coords) setTab('nearby'); else locate(); }}>Near me</TabBtn>
        </div>
        <div className="flex bg-bg-alt rounded-2xl p-1 gap-1">
          <TabBtn active={view === 'grid'} onClick={() => setView('grid')}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M4 4h7v7H4V4zm9 0h7v7h-7V4zm-9 9h7v7H4v-7zm9 0h7v7h-7v-7z"/></svg>
            Grid
          </TabBtn>
          <TabBtn active={view === 'map'} onClick={() => setView('map')}>
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>
            Map
          </TabBtn>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="card p-4 border border-red-200 bg-red-50 text-red-600 text-sm font-medium">
          {error}
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="card overflow-hidden">
              <div className="skeleton h-52 w-full rounded-none" />
              <div className="p-5 space-y-3">
                <div className="skeleton h-6 w-1/3" />
                <div className="skeleton h-4 w-2/3" />
                <div className="skeleton h-4 w-1/2" />
                <div className="skeleton h-10 w-full mt-2" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty */}
      {!loading && filtered.length === 0 && (
        <div className="card p-12 text-center">
          <div className="w-16 h-16 rounded-2xl bg-bg-alt flex items-center justify-center mx-auto mb-4">
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="#9CA3AF" strokeWidth="1.5">
              <path strokeLinecap="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="font-bold text-lg mb-1">No rooms found</h3>
          <p className="text-muted text-sm mb-5">
            {tab === 'nearby' ? 'Try a wider radius or switch to "All rooms".' : 'Adjust your filters.'}
          </p>
          {tab === 'nearby' && (
            <button onClick={() => setTab('all')} className="btn-outline px-5 py-2.5 text-sm">
              Show all rooms
            </button>
          )}
        </div>
      )}

      {/* Grid */}
      {!loading && view === 'grid' && filtered.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((r) => <RoomCard key={r.id} room={r} />)}
        </div>
      )}

      {/* Map */}
      {!loading && view === 'map' && filtered.length > 0 && (
        <MapView rooms={filtered} center={coords} />
      )}
    </div>
  );
}

function TabBtn({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              active ? 'bg-surface text-primary shadow-card' : 'text-muted hover:text-primary'
            }`}>
      {children}
    </button>
  );
}
