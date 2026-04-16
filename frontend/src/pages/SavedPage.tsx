import { useEffect, useState } from 'react';
import { shortlist, roomApi, Room } from '../services/roomApi';
import RoomCard from '../components/RoomCard';
import Loader from '../components/Loader';

export default function SavedPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ids = shortlist.get();
    if (ids.length === 0) { setLoading(false); return; }
    Promise.all(ids.map((id) => roomApi.get(id).catch(() => null)))
      .then((results) => setRooms(results.filter(Boolean) as Room[]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader label="Loading saved rooms..." />;

  return (
    <div>
      <h1 className="text-2xl font-extrabold mb-1">Saved rooms</h1>
      <p className="text-muted text-sm mb-6">
        {rooms.length > 0 ? `${rooms.length} shortlisted rooms` : 'No rooms saved yet'}
      </p>

      {rooms.length === 0 && (
        <div className="card p-12 text-center">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#E5E7EB" strokeWidth="1.5" className="mx-auto mb-4">
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
          </svg>
          <p className="text-muted">Tap the heart icon on any room card to save it here.</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {rooms.map((r) => <RoomCard key={r.id} room={r} />)}
      </div>
    </div>
  );
}
