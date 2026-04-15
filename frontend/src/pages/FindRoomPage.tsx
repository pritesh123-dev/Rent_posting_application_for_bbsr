import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { AppDispatch, RootState } from '../redux/store';
import { fetchNearby } from '../redux/roomSlice';
import RoomCard from '../components/RoomCard';

type View = 'grid' | 'map';

export default function FindRoomPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { nearby, loading } = useSelector((s: RootState) => s.rooms);
  const [params] = useSearchParams();

  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [radius, setRadius] = useState(5);
  const [maxRent, setMaxRent] = useState('');
  const [minRent, setMinRent] = useState('');
  const [onlyAvailable, setOnlyAvailable] = useState(true);
  const [view, setView] = useState<View>('grid');

  const locate = () => {
    if (!navigator.geolocation) return toast.error('Geolocation not supported');
    toast.loading('Locating you…', { id: 'loc' });
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        toast.success('Location set', { id: 'loc' });
      },
      (err) => toast.error(err.message, { id: 'loc' }),
    );
  };

  useEffect(() => { locate(); }, []);

  useEffect(() => {
    if (!coords) return;
    dispatch(fetchNearby({
      lat: coords.lat, lng: coords.lng, radiusKm: radius,
      maxRent: maxRent ? +maxRent : undefined,
      available: onlyAvailable ? true : undefined,
    }));
  }, [coords, radius, maxRent, onlyAvailable, dispatch]);

  const filtered = nearby.filter((r) =>
    (!minRent || r.rent >= +minRent) &&
    (!params.get('city') || r.city.toLowerCase().includes(params.get('city')!.toLowerCase()))
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
      {/* Filters sidebar */}
      <aside className="card p-5 h-fit lg:sticky lg:top-20">
        <h2 className="font-bold text-lg mb-4">Filters</h2>

        <label className="block text-sm mb-1">Radius: <span className="font-semibold">{radius} km</span></label>
        <input type="range" min={1} max={50} value={radius}
               onChange={(e) => setRadius(+e.target.value)} className="w-full mb-4 accent-brand-500" />

        <label className="block text-sm mb-1">Min Rent (₹)</label>
        <input type="number" value={minRent} onChange={(e) => setMinRent(e.target.value)}
               className="input mb-3" placeholder="0" />

        <label className="block text-sm mb-1">Max Rent (₹)</label>
        <input type="number" value={maxRent} onChange={(e) => setMaxRent(e.target.value)}
               className="input mb-3" placeholder="No limit" />

        <label className="flex items-center gap-2 mb-4">
          <input type="checkbox" checked={onlyAvailable} className="accent-brand-500"
                 onChange={(e) => setOnlyAvailable(e.target.checked)} />
          <span className="text-sm">Only available</span>
        </label>

        <button onClick={locate} className="btn-primary w-full py-2">
          📍 Re-locate
        </button>
      </aside>

      {/* Results */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold">Rooms Near You</h1>
            <p className="text-sm text-gray-500">
              {loading ? 'Searching…' : `${filtered.length} rooms found within ${radius} km`}
            </p>
          </div>
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

        {!loading && !coords && (
          <div className="card p-8 text-center">
            <p className="text-gray-500 mb-4">Allow location access to see rooms near you.</p>
            <button onClick={locate} className="btn-primary px-4 py-2">📍 Share location</button>
          </div>
        )}

        {!loading && coords && filtered.length === 0 && (
          <div className="card p-8 text-center text-gray-500">
            No rooms found. Try widening your radius or relaxing filters.
          </div>
        )}

        {!loading && view === 'grid' && filtered.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map((r) => <RoomCard key={r.id} room={r} />)}
          </div>
        )}

        {!loading && view === 'map' && coords && filtered.length > 0 && (
          <div className="card overflow-hidden">
            <iframe
              title="Rooms map"
              className="w-full h-[500px] border-0"
              src={`https://www.google.com/maps?q=${coords.lat},${coords.lng}&z=13&output=embed`}
            />
            <div className="p-4 text-sm text-gray-500">
              Showing your location. Click a room card's 🗺️ button to open it directly in Google Maps.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
