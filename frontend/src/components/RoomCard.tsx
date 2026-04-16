import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Room, shortlist } from '../services/roomApi';

const typeLabel: Record<string, string> = { '1BHK': '1 BHK', '2BHK': '2 BHK', '3BHK': '3 BHK', SINGLE: 'Single Room', PG: 'PG', STUDIO: 'Studio' };
const furnLabel: Record<string, string> = { FURNISHED: 'Furnished', SEMI_FURNISHED: 'Semi-Furnished', UNFURNISHED: 'Unfurnished' };

export default function RoomCard({ room }: { room: Room }) {
  const [saved, setSaved] = useState(shortlist.has(room.id));
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${room.latitude},${room.longitude}`;
  const waUrl = `https://wa.me/${room.phone.replace(/[^0-9]/g, '')}`;
  const img = room.imageUrl || `https://picsum.photos/seed/${room.id?.slice(0, 8) || 'r'}/600/400`;
  const amenities = room.amenities?.split(',').map((a) => a.trim()).filter(Boolean) || [];

  const toggleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    setSaved(shortlist.toggle(room.id));
  };

  return (
    <div className="card overflow-hidden group">
      {/* Image */}
      <div className="relative overflow-hidden">
        <img src={img} alt={room.name}
             className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500" />

        {/* Shortlist heart */}
        <button onClick={toggleSave}
                className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center shadow-sm hover:scale-110 transition-transform">
          <svg width="18" height="18" viewBox="0 0 24 24" fill={saved ? '#EF4444' : 'none'}
               stroke={saved ? '#EF4444' : '#6B7280'} strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
          </svg>
        </button>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
          {room.verified && (
            <span className="chip chip-green">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>
              Verified
            </span>
          )}
          <span className={`chip ${room.isAvailable ? 'chip-green' : 'chip-gray'}`}>
            {room.isAvailable ? 'Available' : 'Taken'}
          </span>
        </div>

        {room.distanceKm != null && (
          <span className="absolute bottom-3 left-3 chip bg-white/90 text-primary shadow-sm">
            {room.distanceKm.toFixed(1)} km away
          </span>
        )}
      </div>

      {/* Body */}
      <div className="p-5">
        {/* Price + Type */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <div>
            <span className="text-2xl font-extrabold text-primary">₹{room.rent.toLocaleString('en-IN')}</span>
            <span className="text-muted text-sm">/mo</span>
          </div>
          {room.roomType && (
            <span className="chip bg-primary/5 text-primary font-bold">
              {typeLabel[room.roomType] || room.roomType}
            </span>
          )}
        </div>

        {/* Title + Location */}
        <h3 className="font-bold text-[15px] mb-1">
          <Link to={`/rooms/${room.id}`} className="hover:text-accent transition-colors">{room.name}</Link>
        </h3>
        <div className="flex items-center gap-1.5 text-muted text-sm">
          <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
            <circle cx="12" cy="11" r="3" />
          </svg>
          {room.area || room.city}
          {room.furnishing && <span className="text-muted">· {furnLabel[room.furnishing] || room.furnishing}</span>}
        </div>

        {/* Amenities */}
        {amenities.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {amenities.slice(0, 4).map((a) => (
              <span key={a} className="text-[11px] px-2 py-1 rounded-lg bg-bg-alt text-muted font-medium">{a}</span>
            ))}
            {amenities.length > 4 && (
              <span className="text-[11px] px-2 py-1 rounded-lg bg-bg-alt text-muted font-medium">+{amenities.length - 4}</span>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 mt-4">
          <a href={`tel:${room.phone}`} className="btn-accent flex-1 py-2.5 text-sm">
            Call Owner
          </a>
          <a href={waUrl} target="_blank" rel="noreferrer"
             className="btn flex-1 py-2.5 text-sm bg-[#25D366] text-white hover:bg-[#1fb855]">
            WhatsApp
          </a>
          <a href={mapsUrl} target="_blank" rel="noreferrer" className="btn-outline py-2.5 px-3 text-sm">
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
