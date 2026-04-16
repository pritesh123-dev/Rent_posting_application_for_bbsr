import { Link } from 'react-router-dom';
import { Room } from '../services/roomApi';

export default function RoomCard({ room }: { room: Room }) {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${room.latitude},${room.longitude}`;
  const waUrl = `https://wa.me/${room.phone.replace(/[^0-9]/g, '')}`;
  const img = room.imageUrl || `https://picsum.photos/seed/${room.id?.slice(0, 8) || 'room'}/600/400`;

  return (
    <div className="card overflow-hidden group">
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={img} alt={room.name}
          className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Overlay badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className={`chip ${room.isAvailable ? 'chip-green' : 'chip-gray'}`}>
            {room.isAvailable ? 'Available' : 'Taken'}
          </span>
        </div>
        {room.distanceKm != null && (
          <span className="absolute top-3 right-3 chip bg-white/90 text-primary shadow-sm">
            {room.distanceKm.toFixed(1)} km
          </span>
        )}
      </div>

      {/* Body */}
      <div className="p-5">
        {/* Price row */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <div>
            <span className="text-2xl font-extrabold text-primary">
              ₹{room.rent.toLocaleString('en-IN')}
            </span>
            <span className="text-muted text-sm font-medium">/mo</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-bold text-base mb-1">
          <Link to={`/rooms/${room.id}`} className="hover:text-accent transition-colors">
            {room.name}
          </Link>
        </h3>

        {/* Location */}
        <div className="flex items-center gap-1.5 text-muted text-sm mb-3">
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
            <circle cx="12" cy="11" r="3" />
          </svg>
          {room.city}
        </div>

        {room.description && (
          <p className="text-sm text-muted line-clamp-2 mb-4 leading-relaxed">{room.description}</p>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          <a href={`tel:${room.phone}`}
             className="btn-accent flex-1 py-2.5 text-sm">
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Call
          </a>
          <a href={waUrl} target="_blank" rel="noreferrer"
             className="btn flex-1 py-2.5 text-sm bg-[#25D366] text-white hover:bg-[#1fb855]">
            Chat
          </a>
          <a href={mapsUrl} target="_blank" rel="noreferrer"
             className="btn-outline py-2.5 px-3 text-sm">
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
