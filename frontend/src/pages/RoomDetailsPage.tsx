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
  const img = r.imageUrl || `https://picsum.photos/seed/${r.id?.slice(0, 8) || 'default'}/1200/600`;

  return (
    <div className="max-w-5xl mx-auto">
      <Link to="/find" className="inline-flex items-center gap-1.5 text-sm text-indigo-600 hover:text-indigo-700 font-medium mb-4 group">
        <span className="group-hover:-translate-x-0.5 transition-transform">←</span> Back to rooms
      </Link>

      {/* Hero image */}
      <div className="card overflow-hidden mb-6">
        <img src={img} alt={r.name} className="w-full h-64 md:h-96 object-cover" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left column — details */}
        <div className="md:col-span-2 space-y-5">
          <div className="card p-6">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <h1 className="text-2xl md:text-3xl font-extrabold">{r.name}</h1>
                <p className="text-gray-500 mt-1 flex items-center gap-1">📍 {r.city}</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  ₹{r.rent.toLocaleString('en-IN')}
                </div>
                <div className="text-xs text-gray-500 font-medium">per month</div>
              </div>
            </div>
            <div className="mt-4 flex gap-2 flex-wrap">
              <span className={`badge ${r.isAvailable ? 'badge-green' : 'badge-gray'}`}>
                {r.isAvailable ? '● Available' : '○ Not available'}
              </span>
              <span className="badge badge-indigo">
                Posted {new Date(r.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>

          <div className="card p-6">
            <h3 className="font-bold text-lg mb-3">About this room</h3>
            <p className="text-gray-600 dark:text-gray-400 whitespace-pre-wrap leading-relaxed">
              {r.description || 'No description provided by the owner.'}
            </p>
          </div>

          <div className="card overflow-hidden">
            <iframe title="Room location" className="w-full h-72 border-0"
                    src={`https://www.google.com/maps?q=${r.latitude},${r.longitude}&z=15&output=embed`} />
          </div>
        </div>

        {/* Right column — contact */}
        <aside className="card p-6 h-fit md:sticky md:top-20 space-y-3">
          <h3 className="font-bold text-lg mb-2">Contact owner</h3>
          <a href={`tel:${r.phone}`}
             className="btn-primary w-full py-3.5 text-center block text-base">
            📞 Call {r.phone}
          </a>
          <a href={waUrl} target="_blank" rel="noreferrer"
             className="w-full py-3.5 text-center block bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl shadow-md shadow-emerald-500/20 transition-all">
            💬 WhatsApp
          </a>
          <a href={mapsUrl} target="_blank" rel="noreferrer"
             className="btn-secondary w-full py-3.5 text-center block">
            🗺️ Open in Google Maps
          </a>
          <div className="mt-4 p-3 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
            <p className="text-xs text-amber-700 dark:text-amber-400">
              ⚠️ Safety tip: Always visit the room and verify documents before paying any advance.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
