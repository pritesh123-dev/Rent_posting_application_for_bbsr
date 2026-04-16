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
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-4">
      <div className="card overflow-hidden">
        <iframe
          title="Rooms map"
          className="w-full h-[480px] border-0"
          src={`https://www.google.com/maps?q=${
            selected ? `${selected.latitude},${selected.longitude}` : mapCenter
          }&z=${selected ? 16 : 13}&output=embed`}
        />
      </div>

      <div className="card overflow-hidden flex flex-col max-h-[480px]">
        <div className="p-4 border-b border-subtle">
          <h3 className="font-bold text-sm">{rooms.length} rooms</h3>
        </div>
        <div className="overflow-y-auto flex-1">
          {rooms.map((r) => {
            const isActive = selected?.id === r.id;
            const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${r.latitude},${r.longitude}`;
            const waUrl = `https://wa.me/${r.phone.replace(/[^0-9]/g, '')}`;
            return (
              <div key={r.id}
                   className={`p-4 border-b border-subtle cursor-pointer transition-all hover:bg-accent-light/30 ${
                     isActive ? 'bg-accent-light/50 border-l-[3px] border-l-accent' : ''
                   }`}
                   onClick={() => setSelected(isActive ? null : r)}>
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <Link to={`/rooms/${r.id}`}
                          className="font-semibold text-sm hover:text-accent truncate block"
                          onClick={(e) => e.stopPropagation()}>
                      {r.name}
                    </Link>
                    <p className="text-xs text-muted mt-0.5">
                      {r.city}{r.distanceKm != null && ` · ${r.distanceKm.toFixed(1)} km`}
                    </p>
                  </div>
                  <span className="text-accent font-bold text-sm whitespace-nowrap">
                    ₹{r.rent.toLocaleString('en-IN')}
                  </span>
                </div>
                <span className={`chip mt-2 ${r.isAvailable ? 'chip-green' : 'chip-gray'}`}>
                  {r.isAvailable ? 'Available' : 'Taken'}
                </span>

                {isActive && (
                  <div className="mt-3 flex gap-2">
                    <a href={`tel:${r.phone}`} onClick={(e) => e.stopPropagation()}
                       className="btn-accent flex-1 py-2 text-xs">Call</a>
                    <a href={waUrl} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}
                       className="btn flex-1 py-2 text-xs bg-[#25D366] text-white hover:bg-[#1fb855]">Chat</a>
                    <a href={mapsUrl} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}
                       className="btn-outline flex-1 py-2 text-xs">Map</a>
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
