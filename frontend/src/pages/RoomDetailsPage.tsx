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
  const img = r.imageUrl || `https://picsum.photos/seed/${r.id?.slice(0, 8) || 'room'}/1200/600`;

  return (
    <div className="max-w-5xl mx-auto">
      <Link to="/find"
            className="inline-flex items-center gap-2 text-sm font-semibold text-muted hover:text-primary mb-5 group">
        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"
             className="group-hover:-translate-x-0.5 transition-transform">
          <path strokeLinecap="round" d="M15 19l-7-7 7-7" />
        </svg>
        Back to rooms
      </Link>

      {/* Image */}
      <div className="card overflow-hidden mb-6">
        <img src={img} alt={r.name} className="w-full h-64 md:h-[400px] object-cover" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Details */}
        <div className="md:col-span-2 space-y-5">
          <div className="card p-6">
            <div className="flex items-start justify-between gap-4 flex-wrap mb-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-extrabold">{r.name}</h1>
                <div className="flex items-center gap-1.5 text-muted mt-2">
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
                    <circle cx="12" cy="11" r="3" />
                  </svg>
                  <span className="text-sm">{r.city}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-extrabold text-accent">
                  ₹{r.rent.toLocaleString('en-IN')}
                </div>
                <div className="text-xs text-muted font-medium">per month</div>
              </div>
            </div>

            <div className="flex gap-2 flex-wrap">
              <span className={`chip ${r.isAvailable ? 'chip-green' : 'chip-gray'}`}>
                {r.isAvailable ? 'Available' : 'Not available'}
              </span>
              <span className="chip chip-warm">
                Posted {new Date(r.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>

          <div className="card p-6">
            <h3 className="font-bold text-lg mb-3">About this room</h3>
            <p className="text-muted leading-relaxed whitespace-pre-wrap">
              {r.description || 'No description provided.'}
            </p>
          </div>

          <div className="card overflow-hidden">
            <iframe title="Location" className="w-full h-72 border-0"
                    src={`https://www.google.com/maps?q=${r.latitude},${r.longitude}&z=15&output=embed`} />
          </div>
        </div>

        {/* Contact sidebar */}
        <aside className="card p-6 h-fit md:sticky md:top-24 space-y-3">
          <h3 className="font-bold text-lg mb-1">Contact owner</h3>
          <a href={`tel:${r.phone}`} className="btn-accent w-full py-3.5 text-center block">
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Call {r.phone}
          </a>
          <a href={waUrl} target="_blank" rel="noreferrer"
             className="btn w-full py-3.5 text-center block bg-[#25D366] text-white hover:bg-[#1fb855]">
            WhatsApp
          </a>
          <a href={mapsUrl} target="_blank" rel="noreferrer"
             className="btn-outline w-full py-3.5 text-center block">
            Open in Maps
          </a>
          <div className="mt-3 p-3 rounded-2xl bg-amber-50 border border-amber-100">
            <p className="text-xs text-amber-700 leading-relaxed">
              <strong>Safety tip:</strong> Always visit the room and verify documents before paying any advance.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
