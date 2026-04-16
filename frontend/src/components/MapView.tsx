import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Room } from '../services/roomApi';

interface Props {
  rooms: Room[];
  center?: { lat: number; lng: number } | null;
}

export default function MapView({ rooms, center }: Props) {
  const [selected, setSelected] = useState<Room | null>(null);

  const mapCenter = center
    ? `${center.lat},${center.lng}`
    : rooms.length > 0
      ? `${rooms[0].latitude},${rooms[0].longitude}`
      : '20.2961,85.8245';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-4">
      {/* Map */}
      <div className="card overflow-hidden">
        <iframe
          title="Rooms map"
          className="w-full h-[500px] border-0"
          src={`https://www.google.com/maps?q=${
            selected ? `${selected.latitude},${selected.longitude}` : mapCenter
          }&z=${selected ? 16 : 13}&output=embed`}
        />
      </div>

      {/* Room list panel */}
      <div className="card overflow-hidden flex flex-col max-h-[500px]">
        <div className="p-3 border-b dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
          <h3 className="font-bold text-sm">{rooms.length} rooms on map</h3>
        </div>
        <div className="overflow-y-auto flex-1">
          {rooms.map((r) => {
            const isActive = selected?.id === r.id;
            const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${r.latitude},${r.longitude}`;
            const waUrl = `https://wa.me/${r.phone.replace(/[^0-9]/g, '')}`;
            return (
              <div key={r.id}
                   className={`p-3 border-b dark:border-gray-800 cursor-pointer transition-all hover:bg-indigo-50 dark:hover:bg-indigo-900/10 ${
                     isActive ? 'bg-indigo-50 dark:bg-indigo-900/20 border-l-4 border-l-indigo-500' : ''
                   }`}
                   onClick={() => setSelected(isActive ? null : r)}>
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <Link to={`/rooms/${r.id}`}
                          className="font-semibold text-sm hover:text-indigo-600 truncate block"
                          onClick={(e) => e.stopPropagation()}>
                      {r.name}
                    </Link>
                    <p className="text-xs text-gray-500">
                      📍 {r.city}
                      {r.distanceKm != null && ` · ${r.distanceKm.toFixed(1)} km`}
                    </p>
                  </div>
                  <span className="text-indigo-600 font-bold text-sm whitespace-nowrap">
                    ₹{r.rent.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className={`badge mt-1.5 ${r.isAvailable ? 'badge-green' : 'badge-gray'}`}>
                  {r.isAvailable ? '● Available' : '○ Taken'}
                </div>

                {isActive && (
                  <div className="mt-2 flex gap-1.5">
                    <a href={`tel:${r.phone}`} onClick={(e) => e.stopPropagation()}
                       className="flex-1 text-center text-xs py-1.5 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors">
                      📞 Call
                    </a>
                    <a href={waUrl} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}
                       className="flex-1 text-center text-xs py-1.5 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600 transition-colors">
                      💬 Chat
                    </a>
                    <a href={mapsUrl} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}
                       className="flex-1 text-center text-xs py-1.5 bg-gray-700 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors">
                      🗺️ Map
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
