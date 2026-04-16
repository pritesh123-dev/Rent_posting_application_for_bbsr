import { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { AppDispatch, RootState } from '../redux/store';
import { fetchNearby, fetchAllRooms } from '../redux/roomSlice';
import { ROOM_TYPES, FURNISHING } from '../services/roomApi';
import RoomCard from '../components/RoomCard';
import MapView from '../components/MapView';

type Tab = 'nearby' | 'all';
type View = 'grid' | 'map';

const typeLabels: Record<string, string> = { '1BHK': '1 BHK', '2BHK': '2 BHK', '3BHK': '3 BHK', SINGLE: 'Single', PG: 'PG', STUDIO: 'Studio' };
const furnLabels: Record<string, string> = { FURNISHED: 'Furnished', SEMI_FURNISHED: 'Semi', UNFURNISHED: 'Unfurnished' };
const SORT_OPTIONS = [
  { value: 'createdAt,desc', label: 'Newest first' },
  { value: 'rent,asc', label: 'Rent: Low to High' },
  { value: 'rent,desc', label: 'Rent: High to Low' },
];

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
  const [roomType, setRoomType] = useState('');
  const [furnishing, setFurnishing] = useState('');
  const [sortBy, setSortBy] = useState('createdAt,desc');
  const [view, setView] = useState<View>('grid');

  const locate = useCallback(() => {
    if (!navigator.geolocation) { toast.error('Geolocation not supported'); setTab('all'); return; }
    toast.loading('Finding location...', { id: 'loc' });
    navigator.geolocation.getCurrentPosition(
      (pos) => { setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude }); toast.success('Located!', { id: 'loc' }); setTab('nearby'); },
      () => { toast.error('Location denied', { id: 'loc' }); setTab('all'); },
      { timeout: 10000 },
    );
  }, []);

  useEffect(() => {
    dispatch(fetchAllRooms({
      city: cityFilter || undefined, minRent: minRent ? +minRent : undefined,
      maxRent: maxRent ? +maxRent : undefined, available: onlyAvailable ? true : undefined,
      roomType: roomType || undefined, furnishing: furnishing || undefined,
      sort: sortBy, size: 100,
    }));
  }, [cityFilter, minRent, maxRent, onlyAvailable, roomType, furnishing, sortBy, dispatch]);

  useEffect(() => {
    if (!coords || tab !== 'nearby') return;
    dispatch(fetchNearby({
      lat: coords.lat, lng: coords.lng, radiusKm: radius,
      maxRent: maxRent ? +maxRent : undefined, available: onlyAvailable ? true : undefined,
      roomType: roomType || undefined, furnishing: furnishing || undefined,
    }));
  }, [coords, radius, maxRent, onlyAvailable, roomType, furnishing, tab, dispatch]);

  const rooms = tab === 'nearby' ? nearby : allRooms;
  const filtered = rooms.filter((r) => !minRent || r.rent >= +minRent);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold">Find rooms</h1>
          <p className="text-muted text-sm mt-0.5">{loading ? 'Searching...' : `${filtered.length} rooms found`}</p>
        </div>
        <button onClick={locate} className="btn-accent px-4 py-2.5 text-sm">
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" /><circle cx="12" cy="11" r="3" />
          </svg>
          {coords ? 'Re-locate' : 'Locate me'}
        </button>
      </div>

      {/* Room type quick filters */}
      <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
        <Pill active={!roomType} onClick={() => setRoomType('')}>All types</Pill>
        {ROOM_TYPES.map((t) => (
          <Pill key={t} active={roomType === t} onClick={() => setRoomType(roomType === t ? '' : t)}>
            {typeLabels[t] || t}
          </Pill>
        ))}
      </div>

      {/* Filters */}
      <div className="card p-4">
        <div className="flex flex-wrap items-end gap-3">
          <FilterField label="Search area" className="flex-1 min-w-[160px]">
            <input className="input" placeholder="e.g. Patia, Saheed Nagar..." value={cityFilter}
                   onChange={(e) => setCityFilter(e.target.value)} />
          </FilterField>
          <FilterField label="Min ₹" className="w-24">
            <input type="number" className="input" value={minRent} onChange={(e) => setMinRent(e.target.value)} placeholder="0" />
          </FilterField>
          <FilterField label="Max ₹" className="w-24">
            <input type="number" className="input" value={maxRent} onChange={(e) => setMaxRent(e.target.value)} placeholder="Any" />
          </FilterField>
          <FilterField label="Furnishing" className="w-36">
            <select className="input" value={furnishing} onChange={(e) => setFurnishing(e.target.value)}>
              <option value="">Any</option>
              {FURNISHING.map((f) => <option key={f} value={f}>{furnLabels[f]}</option>)}
            </select>
          </FilterField>
          <FilterField label="Sort" className="w-40">
            <select className="input" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </FilterField>
          <label className="flex items-center gap-2 pb-1">
            <input type="checkbox" checked={onlyAvailable} className="w-4 h-4 accent-accent rounded"
                   onChange={(e) => setOnlyAvailable(e.target.checked)} />
            <span className="text-sm font-medium whitespace-nowrap">Available only</span>
          </label>
        </div>
        {tab === 'nearby' && (
          <div className="mt-3 pt-3 border-t border-subtle">
            <label className="text-xs font-semibold text-muted">Radius: {radius} km</label>
            <input type="range" min={1} max={50} value={radius} onChange={(e) => setRadius(+e.target.value)}
                   className="w-full accent-accent mt-1" />
          </div>
        )}
      </div>

      {/* Tabs + view */}
      <div className="flex items-center justify-between">
        <div className="flex bg-bg-alt rounded-2xl p-1 gap-1">
          <TabBtn active={tab === 'all'} onClick={() => setTab('all')}>All rooms</TabBtn>
          <TabBtn active={tab === 'nearby'} onClick={() => { if (coords) setTab('nearby'); else locate(); }}>Near me</TabBtn>
        </div>
        <div className="flex bg-bg-alt rounded-2xl p-1 gap-1">
          <TabBtn active={view === 'grid'} onClick={() => setView('grid')}>Grid</TabBtn>
          <TabBtn active={view === 'map'} onClick={() => setView('map')}>Map</TabBtn>
        </div>
      </div>

      {error && <div className="card p-4 border border-red-200 bg-red-50 text-red-600 text-sm">{error}</div>}

      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="card overflow-hidden">
              <div className="skeleton h-52 w-full rounded-none" />
              <div className="p-5 space-y-3"><div className="skeleton h-6 w-1/3" /><div className="skeleton h-4 w-2/3" /><div className="skeleton h-10 w-full mt-2" /></div>
            </div>
          ))}
        </div>
      )}

      {!loading && filtered.length === 0 && (
        <div className="card p-12 text-center">
          <div className="w-16 h-16 rounded-2xl bg-bg-alt flex items-center justify-center mx-auto mb-4">
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="#9CA3AF" strokeWidth="1.5">
              <path strokeLinecap="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="font-bold text-lg mb-1">No rooms found</h3>
          <p className="text-muted text-sm">Try adjusting your filters or search area.</p>
        </div>
      )}

      {!loading && view === 'grid' && filtered.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((r) => <RoomCard key={r.id} room={r} />)}
        </div>
      )}

      {!loading && view === 'map' && filtered.length > 0 && <MapView rooms={filtered} center={coords} />}
    </div>
  );
}

function Pill({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
              active ? 'bg-accent text-white border-accent shadow-btn' : 'bg-surface border-subtle text-muted hover:border-accent hover:text-accent'
            }`}>
      {children}
    </button>
  );
}

function FilterField({ label, className = '', children }: { label: string; className?: string; children: React.ReactNode }) {
  return (
    <div className={className}>
      <label className="text-xs font-semibold text-muted mb-1 block">{label}</label>
      {children}
    </div>
  );
}

function TabBtn({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              active ? 'bg-surface text-primary shadow-card' : 'text-muted hover:text-primary'
            }`}>
      {children}
    </button>
  );
}
