import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { AppDispatch, RootState } from '../redux/store';
import { fetchNearby } from '../redux/roomSlice';
import RoomCard from '../components/RoomCard';
import Loader from '../components/Loader';

export default function FindRoomPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { nearby, loading } = useSelector((s: RootState) => s.rooms);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [radius, setRadius] = useState(5);
  const [maxRent, setMaxRent] = useState<string>('');
  const [onlyAvailable, setOnlyAvailable] = useState(true);

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

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Rooms Near You</h1>
      <div className="flex flex-wrap gap-3 items-end mb-4 bg-white dark:bg-gray-900 p-4 rounded-lg shadow border dark:border-gray-800">
        <div>
          <label className="text-sm block">Radius (km)</label>
          <input type="number" min={1} max={50} value={radius}
                 onChange={(e) => setRadius(+e.target.value)}
                 className="border rounded px-2 py-1 w-24 dark:bg-gray-900 dark:border-gray-700" />
        </div>
        <div>
          <label className="text-sm block">Max Rent (₹)</label>
          <input type="number" value={maxRent} onChange={(e) => setMaxRent(e.target.value)}
                 className="border rounded px-2 py-1 w-32 dark:bg-gray-900 dark:border-gray-700" />
        </div>
        <label className="flex items-center gap-2 mt-5">
          <input type="checkbox" checked={onlyAvailable}
                 onChange={(e) => setOnlyAvailable(e.target.checked)} />
          Only available
        </label>
        <button onClick={locate}
                className="ml-auto bg-brand-500 text-white px-4 py-2 rounded hover:bg-brand-600">
          📍 Re-locate
        </button>
      </div>

      {loading && <Loader />}
      {!loading && !coords && (
        <p className="text-gray-500">Allow location access to see nearby rooms.</p>
      )}
      {!loading && coords && nearby.length === 0 && (
        <p className="text-gray-500">No rooms found in {radius} km. Try widening your search.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {nearby.map((r) => <RoomCard key={r.id} room={r} />)}
      </div>
    </div>
  );
}
