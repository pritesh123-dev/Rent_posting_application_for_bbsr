import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { fetchRoom } from '../redux/roomSlice';
import Loader from '../components/Loader';

export default function RoomDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { current, loading } = useSelector((s: RootState) => s.rooms);

  useEffect(() => { if (id) dispatch(fetchRoom(id)); }, [id, dispatch]);

  if (loading || !current) return <Loader />;

  const r = current;
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${r.latitude},${r.longitude}`;
  const waUrl = `https://wa.me/${r.phone.replace(/[^0-9]/g, '')}`;
  const img = r.imageUrl || `https://picsum.photos/seed/${r.id}/1200/600`;

  return (
    <div className="max-w-4xl mx-auto">
      <Link to="/find" className="text-sm text-brand-600 hover:underline">← Back to results</Link>

      <div className="card overflow-hidden mt-3">
        <img src={img} alt={r.name} className="w-full h-64 md:h-80 object-cover" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <div className="md:col-span-2 space-y-4">
          <div className="card p-6">
            <div className="flex items-start justify-between gap-3 flex-wrap">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">{r.name}</h1>
                <p className="text-gray-500 mt-1">📍 {r.city}</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-brand-600">
                  ₹{r.rent.toLocaleString('en-IN')}
                </div>
                <div className="text-xs text-gray-500">per month</div>
              </div>
            </div>

            <div className="mt-4 flex gap-2 flex-wrap">
              <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                r.isAvailable ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'
              }`}>
                {r.isAvailable ? '● Available' : '○ Not available'}
              </span>
              <span className="text-xs px-3 py-1 rounded-full bg-brand-50 text-brand-700">
                Posted {new Date(r.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>

          <div className="card p-6">
            <h3 className="font-semibold mb-2">About this room</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 whitespace-pre-wrap">
              {r.description || 'No description provided.'}
            </p>
          </div>

          <div className="card overflow-hidden">
            <iframe title="Map" className="w-full h-64 border-0"
                    src={`https://www.google.com/maps?q=${r.latitude},${r.longitude}&z=15&output=embed`} />
          </div>
        </div>

        <aside className="card p-6 h-fit md:sticky md:top-20">
          <h3 className="font-semibold mb-4">Contact owner</h3>
          <div className="space-y-2">
            <a href={`tel:${r.phone}`}
               className="btn-primary w-full py-3 text-center block">📞 Call {r.phone}</a>
            <a href={waUrl} target="_blank" rel="noreferrer"
               className="w-full py-3 text-center block bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg">
              💬 WhatsApp
            </a>
            <a href={mapsUrl} target="_blank" rel="noreferrer"
               className="btn-secondary w-full py-3 text-center block">🗺️ Open in Maps</a>
          </div>
          <p className="text-xs text-gray-500 mt-4">
            Safety tip: visit the room and verify documents before paying any advance.
          </p>
        </aside>
      </div>
    </div>
  );
}
