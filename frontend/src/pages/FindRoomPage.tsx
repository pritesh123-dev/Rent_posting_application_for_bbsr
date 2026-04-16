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
      toast.error('Geolocation not supported — showing all rooms');
      setTab('all');
      return;
    }
    toast.loading('Locating you…', { id: 'loc' });
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        toast.success('Location found!', { id: 'loc' });
        setTab('nearby');
      },
      () => {
        toast.error('Location denied — showing all rooms', { id: 'loc' });
        setTab('all');
      },
      { timeout: 10000 },
    );
  }, []);

  // Fetch all rooms on mount (always works regardless of geolocation)
  useEffect(() => {
    dispatch(fetchAllRooms({
      city: cityFilter || undefined,
      minRent: minRent ? +minRent : undefined,
      maxRent: maxRent ? +maxRent : undefined,
      available: onlyAvailable ? true : undefined,
      size: 100,
    }));
  }, [cityFilter, minRent, maxRent, onlyAvailable, dispatch]);

  // Fetch nearby when location is available and tab is nearby
  useEffect(() => {
    if (!coords || tab !== 'nearby') return;
    dispatch(fetchNearby({
      lat: coords.lat, lng: coords.lng, radiusKm: radius,
      maxRent: maxRent ? +maxRent : undefined,
      available: onlyAvailable ? true : undefined,
    }));
  }, [coords, radius, maxRent, onlyAvailable, tab, dispatch]);

  const rooms = tab === 'nearby' ? nearby : allRooms;

  // Client-side filter for min rent and city on nearby results
  const filtered = rooms.filter((r) =>
    (!minRent || r.rent >= +minRent) &&
    (!cityFilter || r.city.toLowerCase().includes(cityFilter.toLowerCase()))
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
      {/* Sidebar */}
      <aside className="card p-5 h-fit lg:sticky lg:top-20 space-y-4">
        <h2 className="font-bold text-lg">Filters</h2>

        <div>
          <label className="block text-sm mb-1">City</label>
          <input className="input" placeholder="e.g. Bhubaneswar" value={cityFilter}
                 onChange={(e) => setCityFilter(e.target.value)} />
        </div>

        {tab === 'nearby' && (
          <div>
            <label className="block text-sm mb-1">
              Radius: <span className="font-semibold">{radius} km</span>
            </label>
            <input type="range" min={1} max={50} value={radius}
                   onChange={(e) => setRadius(+e.target.value)}
                   className="w-full accent-brand-500" />
          </div>
        )}

        <div>
          <label className="block text-sm mb-1">Min Rent (₹)</label>
          <input type="number" value={minRent} onChange={(e) => setMinRent(e.target.value)}
                 className="input" placeholder="0" />
        </div>
        <div>
          <label className="block text-sm mb-1">Max Rent (₹)</label>
          <input type="number" value={maxRent} onChange={(e) => setMaxRent(e.target.value)}
                 className="input" placeholder="No limit" />
        </div>

        <label className="flex items-center gap-2">
          <input type="checkbox" checked={onlyAvailable} className="accent-brand-500"
                 onChange={(e) => setOnlyAvailable(e.target.checked)} />
          <span className="text-sm">Only available</span>
        </label>

        <button onClick={locate} className="btn-primary w-full py-2">
          📍 {coords ? 'Re-locate' : 'Use my location'}
        </button>
      </aside>

      {/* Main content */}
      <div>
        {/* Tabs + View toggle */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
          <div className="flex gap-1 bg-white dark:bg-gray-900 border dark:border-gray-700 rounded-lg p-1">
            <button onClick={() => setTab('all')}
                    className={`px-4 py-1.5 rounded-md text-sm font-medium transition ${
                      tab === 'all' ? 'bg-brand-500 text-white' : ''}`}>
              🏘️ All Rooms
            </button>
            <button onClick={() => { if (coords) setTab('nearby'); else locate(); }}
                    className={`px-4 py-1.5 rounded-md text-sm font-medium transition ${
                      tab === 'nearby' ? 'bg-brand-500 text-white' : ''}`}>
              📍 Near Me
            </button>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">
              {loading ? 'Searching…' : `${filtered.length} rooms`}
            </span>
            <div className="flex gap-1 bg-white dark:bg-gray-900 border dark:border-gray-700 rounded-lg p-1">
              <button onClick={() => setView('grid')}
                      className={`px-3 py-1 rounded-md text-sm ${view === 'grid' ? 'bg-brand-500 text-white' : ''}`}>
                ▦ Grid
              </button>
              <button onClick={() => setView('map')}
                      className={`px-3 py-1 rounded-md text-sm ${view === 'map' ? 'bg-brand-500 text-white' : ''}`}>
                🗺️ Map
              </button>
            </div>
          </div>
        </div>

        {/* Error state */}
        {error && (
          <div className="card p-4 mb-4 border-red-200 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 text-sm">
            ⚠️ {error}
          </div>
        )}

        {/* Loading skeletons */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="card overflow-hidden">
                <div className="skeleton h-44 w-full" />
                <div className="p-4 space-y-2">
                  <div className="skeleton h-5 w-3/4" />
                  <div className="skeleton h-4 w-1/2" />
                  <div className="skeleton h-10 w-full mt-3" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && filtered.length === 0 && (
          <div className="card p-10 text-center">
            <div className="text-4xl mb-3">🏠</div>
            <h3 className="font-semibold text-lg mb-1">No rooms found</h3>
            <p className="text-gray-500 text-sm mb-4">
              {tab === 'nearby'
                ? `No rooms within ${radius} km. Try increasing the radius or switch to "All Rooms".`
                : 'Try adjusting your filters or post the first room!'}
            </p>
            {tab === 'nearby' && (
              <button onClick={() => setTab('all')} className="btn-primary px-4 py-2">
                Show all rooms
              </button>
            )}
          </div>
        )}

        {/* Grid view */}
        {!loading && view === 'grid' && filtered.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map((r) => <RoomCard key={r.id} room={r} />)}
          </div>
        )}

        {/* Map view */}
        {!loading && view === 'map' && filtered.length > 0 && (
          <MapView rooms={filtered} center={coords} />
        )}
      </div>
    </div>
  );
}
