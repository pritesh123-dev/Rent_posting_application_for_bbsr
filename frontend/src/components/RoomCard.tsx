import { Link } from 'react-router-dom';
import { Room } from '../services/roomApi';

export default function RoomCard({ room }: { room: Room }) {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${room.latitude},${room.longitude}`;
  const waUrl = `https://wa.me/${room.phone.replace(/[^0-9]/g, '')}`;
  const fallbackImg = `https://picsum.photos/seed/${room.id?.slice(0, 8) || 'default'}/600/400`;

  return (
    <div className="card overflow-hidden flex flex-col group">
      {/* Image */}
      <div className="relative overflow-hidden">
        <img src={room.imageUrl || fallbackImg} alt={room.name}
             className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <span className={`absolute top-3 right-3 badge ${
          room.isAvailable ? 'badge-green' : 'badge-gray'
        } backdrop-blur-sm`}>
          {room.isAvailable ? '● Available' : '○ Taken'}
        </span>
        {room.distanceKm != null && (
          <span className="absolute top-3 left-3 badge bg-white/90 text-gray-800 backdrop-blur-sm">
            📍 {room.distanceKm.toFixed(1)} km
          </span>
        )}
        <div className="absolute bottom-3 left-3">
          <div className="text-white font-extrabold text-2xl drop-shadow-lg">
            ₹{room.rent.toLocaleString('en-IN')}
            <span className="text-sm font-medium opacity-80">/mo</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-bold text-lg leading-tight">
          <Link to={`/rooms/${room.id}`} className="hover:text-indigo-600 transition-colors">
            {room.name}
          </Link>
        </h3>
        <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
          📍 {room.city}
        </p>

        {room.description && (
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
            {room.description}
          </p>
        )}

        {/* Actions */}
        <div className="mt-auto pt-4 grid grid-cols-3 gap-2">
          <a href={`tel:${room.phone}`}
             className="flex items-center justify-center gap-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl py-2.5 text-sm font-medium transition-all shadow-sm hover:shadow-md">
            📞 Call
          </a>
          <a href={waUrl} target="_blank" rel="noreferrer"
             className="flex items-center justify-center gap-1 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl py-2.5 text-sm font-medium transition-all shadow-sm hover:shadow-md">
            💬 Chat
          </a>
          <a href={mapsUrl} target="_blank" rel="noreferrer"
             className="flex items-center justify-center gap-1 bg-gray-800 hover:bg-gray-900 text-white rounded-xl py-2.5 text-sm font-medium transition-all shadow-sm hover:shadow-md">
            🗺️ Map
          </a>
        </div>
      </div>
    </div>
  );
}
