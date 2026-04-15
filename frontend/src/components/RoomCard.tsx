import { Link } from 'react-router-dom';
import { Room } from '../services/roomApi';

export default function RoomCard({ room }: { room: Room }) {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${room.latitude},${room.longitude}`;
  const waUrl = `https://wa.me/${room.phone.replace(/[^0-9]/g, '')}`;

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-4 border dark:border-gray-800">
      {room.imageUrl && (
        <img src={room.imageUrl} alt={room.name}
             className="w-full h-40 object-cover rounded mb-3" />
      )}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-lg">
            <Link to={`/rooms/${room.id}`} className="hover:text-brand-600">{room.name}</Link>
          </h3>
          <p className="text-sm text-gray-500">{room.city}</p>
        </div>
        <span className={`text-xs px-2 py-1 rounded-full ${
          room.isAvailable ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'
        }`}>
          {room.isAvailable ? 'Available' : 'Unavailable'}
        </span>
      </div>

      <div className="mt-2 flex items-center justify-between">
        <div className="text-brand-600 font-bold text-xl">₹{room.rent.toLocaleString('en-IN')}</div>
        {room.distanceKm != null && (
          <div className="text-sm text-gray-500">{room.distanceKm.toFixed(1)} km away</div>
        )}
      </div>

      {room.description && (
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{room.description}</p>
      )}

      <div className="mt-3 grid grid-cols-3 gap-2">
        <a href={`tel:${room.phone}`}
           className="text-center bg-brand-500 text-white rounded py-2 text-sm hover:bg-brand-600">
          📞 Call
        </a>
        <a href={waUrl} target="_blank" rel="noreferrer"
           className="text-center bg-green-500 text-white rounded py-2 text-sm hover:bg-green-600">
          💬 WhatsApp
        </a>
        <a href={mapsUrl} target="_blank" rel="noreferrer"
           className="text-center bg-gray-700 text-white rounded py-2 text-sm hover:bg-gray-800">
          🗺️ Maps
        </a>
      </div>
    </div>
  );
}
