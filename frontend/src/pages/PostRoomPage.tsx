import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { AppDispatch } from '../redux/store';
import { createRoom } from '../redux/roomSlice';

interface Form {
  name: string; phone: string; rent: string; city: string;
  latitude: string; longitude: string;
  isAvailable: boolean;
  description: string; imageUrl: string;
}

const empty: Form = {
  name: '', phone: '', rent: '', city: '',
  latitude: '', longitude: '',
  isAvailable: true,
  description: '', imageUrl: '',
};

export default function PostRoomPage() {
  const [form, setForm] = useState<Form>(empty);
  const [submitting, setSubmitting] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const nav = useNavigate();

  const set = (k: keyof Form, v: any) => setForm((f) => ({ ...f, [k]: v }));

  const useLocation = () => {
    if (!navigator.geolocation) return toast.error('Geolocation not supported');
    toast.loading('Fetching location…', { id: 'loc' });
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        set('latitude', pos.coords.latitude.toFixed(6));
        set('longitude', pos.coords.longitude.toFixed(6));
        toast.success('Location captured', { id: 'loc' });
      },
      (err) => toast.error('Location error: ' + err.message, { id: 'loc' }),
    );
  };

  const validate = (): string | null => {
    if (!form.name.trim()) return 'Name required';
    if (!/^[+0-9\- ]{7,20}$/.test(form.phone)) return 'Invalid phone';
    if (!(+form.rent > 0)) return 'Rent must be positive';
    if (!form.city.trim()) return 'City required';
    if (!form.latitude || !form.longitude) return 'Location required';
    return null;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = validate();
    if (err) return toast.error(err);
    setSubmitting(true);
    try {
      const created: any = await dispatch(
        createRoom({
          name: form.name,
          phone: form.phone,
          rent: +form.rent,
          city: form.city,
          latitude: +form.latitude,
          longitude: +form.longitude,
          isAvailable: form.isAvailable,
          description: form.description || undefined,
          imageUrl: form.imageUrl || undefined,
        }),
      ).unwrap();
      toast.success('Room posted!');
      nav(`/rooms/${created.id}`);
    } catch (e: any) {
      toast.error(e?.message || 'Failed to post');
    } finally {
      setSubmitting(false);
    }
  };

  const input = 'w-full border dark:border-gray-700 rounded px-3 py-2 bg-white dark:bg-gray-900';

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Post Your Room</h1>
      <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-4
                                         bg-white dark:bg-gray-900 p-5 rounded-lg shadow border dark:border-gray-800">
        <div>
          <label className="text-sm">Owner Name *</label>
          <input className={input} value={form.name} onChange={(e) => set('name', e.target.value)} />
        </div>
        <div>
          <label className="text-sm">Phone *</label>
          <input className={input} value={form.phone} onChange={(e) => set('phone', e.target.value)} />
        </div>
        <div>
          <label className="text-sm">Rent (₹/month) *</label>
          <input type="number" className={input} value={form.rent} onChange={(e) => set('rent', e.target.value)} />
        </div>
        <div>
          <label className="text-sm">City *</label>
          <input className={input} value={form.city} onChange={(e) => set('city', e.target.value)} />
        </div>
        <div className="md:col-span-2 flex items-end gap-2">
          <div className="flex-1">
            <label className="text-sm">Latitude *</label>
            <input className={input} value={form.latitude} onChange={(e) => set('latitude', e.target.value)} />
          </div>
          <div className="flex-1">
            <label className="text-sm">Longitude *</label>
            <input className={input} value={form.longitude} onChange={(e) => set('longitude', e.target.value)} />
          </div>
          <button type="button" onClick={useLocation}
                  className="bg-brand-500 text-white px-4 py-2 rounded hover:bg-brand-600">
            📍 Use My Location
          </button>
        </div>
        <div className="md:col-span-2">
          <label className="text-sm">Description</label>
          <textarea className={input} rows={3} value={form.description}
                    onChange={(e) => set('description', e.target.value)} />
        </div>
        <div className="md:col-span-2">
          <label className="text-sm">Image URL</label>
          <input className={input} value={form.imageUrl} onChange={(e) => set('imageUrl', e.target.value)} />
        </div>
        <label className="flex items-center gap-2 md:col-span-2">
          <input type="checkbox" checked={form.isAvailable}
                 onChange={(e) => set('isAvailable', e.target.checked)} />
          Available for rent
        </label>
        <button type="submit" disabled={submitting}
                className="md:col-span-2 bg-brand-600 text-white py-3 rounded font-semibold disabled:opacity-60">
          {submitting ? 'Posting…' : 'Post Room'}
        </button>
      </form>
    </div>
  );
}
