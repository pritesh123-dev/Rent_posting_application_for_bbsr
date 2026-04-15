import { Link } from 'react-router-dom';
import { Room } from '../services/roomApi';

export default function RoomCard({ room }: { room: Room }) {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${room.latitude},${room.longitude}`;
  const waUrl = `https://wa.me/${room.phone.replace(/[^0-9]/g, '')}`;
  const fallbackImg = `https://picsum.photos/seed/${room.id}/600/400`;

  return (
    <div className="card overflow-hidden flex flex-col">
      <div className="relative">
        <img src={room.imageUrl || fallbackImg} alt={room.name}
             className="w-full h-44 object-cover" />
        <span className={`absolute top-3 right-3 text-xs px-2 py-1 rounded-full font-medium ${
          room.isAvailable ? 'bg-green-500 text-white' : 'bg-gray-700 text-white'
        }`}>
          {room.isAvailable ? '● Available' : '○ Unavailable'}
        </span>
        {room.distanceKm != null && (
          <span className="absolute top-3 left-3 text-xs px-2 py-1 rounded-full bg-white/90 text-gray-800 font-medium">
            📍 {room.distanceKm.toFixed(1)} km
          </span>
        )}
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-lg leading-tight">
            <Link to={`/rooms/${room.id}`} className="hover:text-brand-600">{room.name}</Link>
          </h3>
          <div className="text-brand-600 font-bold text-xl whitespace-nowrap">
            ₹{room.rent.toLocaleString('en-IN')}
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-1">📍 {room.city}</p>

        {room.description && (
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{room.description}</p>
        )}

        <div className="mt-auto pt-4 grid grid-cols-3 gap-2">
          <a href={`tel:${room.phone}`}
             className="text-center bg-brand-500 text-white rounded-lg py-2 text-sm font-medium hover:bg-brand-600">
            📞
          </a>
          <a href={waUrl} target="_blank" rel="noreferrer"
             className="text-center bg-green-500 text-white rounded-lg py-2 text-sm font-medium hover:bg-green-600">
            💬
          </a>
          <a href={mapsUrl} target="_blank" rel="noreferrer"
             className="text-center bg-gray-800 text-white rounded-lg py-2 text-sm font-medium hover:bg-gray-900">
            🗺️
          </a>
        </div>
      </div>
    </div>
  );
}
