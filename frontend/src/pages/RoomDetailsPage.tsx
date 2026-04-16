import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { fetchRoom } from '../redux/roomSlice';
import { shortlist } from '../services/roomApi';
import Loader from '../components/Loader';

const typeLabel: Record<string, string> = { '1BHK': '1 BHK', '2BHK': '2 BHK', '3BHK': '3 BHK', SINGLE: 'Single Room', PG: 'PG', STUDIO: 'Studio' };
const furnLabel: Record<string, string> = { FURNISHED: 'Furnished', SEMI_FURNISHED: 'Semi-Furnished', UNFURNISHED: 'Unfurnished' };

export default function RoomDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { current, loading } = useSelector((s: RootState) => s.rooms);
  const [saved, setSaved] = useState(false);

  useEffect(() => { if (id) { dispatch(fetchRoom(id)); setSaved(shortlist.has(id)); } }, [id, dispatch]);

  if (loading || !current) return <Loader />;

  const r = current;
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${r.latitude},${r.longitude}`;
  const waUrl = `https://wa.me/${r.phone.replace(/[^0-9]/g, '')}`;
  const img = r.imageUrl || `https://picsum.photos/seed/${r.id?.slice(0, 8) || 'r'}/1200/600`;
  const amenities = r.amenities?.split(',').map((a) => a.trim()).filter(Boolean) || [];

  const toggleSave = () => { shortlist.toggle(r.id); setSaved(!saved); };

  return (
    <div className="max-w-5xl mx-auto">
      <Link to="/find" className="inline-flex items-center gap-2 text-sm font-semibold text-muted hover:text-primary mb-5 group">
        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="group-hover:-translate-x-0.5 transition-transform">
          <path strokeLinecap="round" d="M15 19l-7-7 7-7" /></svg>
        Back to rooms
      </Link>

      <div className="card overflow-hidden mb-6 relative">
        <img src={img} alt={r.name} className="w-full h-64 md:h-[400px] object-cover" />
        <button onClick={toggleSave}
                className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-md hover:scale-110 transition-transform">
          <svg width="22" height="22" viewBox="0 0 24 24" fill={saved ? '#EF4444' : 'none'} stroke={saved ? '#EF4444' : '#6B7280'} strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-5">
          {/* Header */}
          <div className="card p-6">
            <div className="flex items-start justify-between gap-4 flex-wrap mb-3">
              <div>
                <h1 className="text-2xl md:text-3xl font-extrabold">{r.name}</h1>
                <div className="flex items-center gap-1.5 text-muted mt-2 text-sm">
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" /><circle cx="12" cy="11" r="3" />
                  </svg>
                  {r.area ? `${r.area}, ${r.city}` : r.city}
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-extrabold text-accent">₹{r.rent.toLocaleString('en-IN')}</div>
                <div className="text-xs text-muted font-medium">per month</div>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              {r.verified && <span className="chip chip-green"><svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg> Verified</span>}
              <span className={`chip ${r.isAvailable ? 'chip-green' : 'chip-gray'}`}>{r.isAvailable ? 'Available' : 'Not available'}</span>
              {r.roomType && <span className="chip bg-primary/5 text-primary">{typeLabel[r.roomType] || r.roomType}</span>}
              {r.furnishing && <span className="chip chip-warm">{furnLabel[r.furnishing] || r.furnishing}</span>}
              <span className="chip chip-gray">Posted {new Date(r.createdAt).toLocaleDateString()}</span>
            </div>
          </div>

          {/* Amenities */}
          {amenities.length > 0 && (
            <div className="card p-6">
              <h3 className="font-bold text-lg mb-4">Amenities</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {amenities.map((a) => (
                  <div key={a} className="flex items-center gap-2.5 p-3 rounded-xl bg-bg">
                    <span className="w-8 h-8 rounded-lg bg-accent-light flex items-center justify-center">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5">
                        <path strokeLinecap="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-sm font-medium">{a}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Description */}
          <div className="card p-6">
            <h3 className="font-bold text-lg mb-3">About</h3>
            <p className="text-muted leading-relaxed whitespace-pre-wrap">{r.description || 'No description provided.'}</p>
          </div>

          {/* Map */}
          <div className="card overflow-hidden">
            <iframe title="Location" className="w-full h-72 border-0"
                    src={`https://www.google.com/maps?q=${r.latitude},${r.longitude}&z=15&output=embed`} />
          </div>
        </div>

        {/* Contact sidebar */}
        <aside className="card p-6 h-fit md:sticky md:top-24 space-y-3">
          <h3 className="font-bold text-lg mb-1">Contact owner</h3>
          <a href={`tel:${r.phone}`} className="btn-accent w-full py-3.5 text-center block text-base">
            Call {r.phone}
          </a>
          <a href={waUrl} target="_blank" rel="noreferrer"
             className="btn w-full py-3.5 text-center block bg-[#25D366] text-white hover:bg-[#1fb855] text-base">
            WhatsApp
          </a>
          <a href={mapsUrl} target="_blank" rel="noreferrer" className="btn-outline w-full py-3.5 text-center block">
            Open in Maps
          </a>
          <div className="p-3 rounded-2xl bg-bg border border-subtle mt-4">
            <p className="text-xs text-muted leading-relaxed">
              <strong className="text-primary">Zero brokerage.</strong> Connect directly with the owner. Always visit and verify before paying advance.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
