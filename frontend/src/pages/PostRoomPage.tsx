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
          name: form.name, phone: form.phone, rent: +form.rent, city: form.city,
          latitude: +form.latitude, longitude: +form.longitude,
          isAvailable: form.isAvailable,
          description: form.description || undefined,
          imageUrl: form.imageUrl || undefined,
        }),
      ).unwrap();
      toast.success('Room posted successfully!');
      nav(`/rooms/${created.id}`);
    } catch (e: any) {
      toast.error(e?.message || 'Failed to post');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Post your room</h1>
        <p className="text-gray-500 text-sm mt-1">
          Free listing — first 2000 posts are on the house 🎁
        </p>
      </div>

      <form onSubmit={submit} className="card p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Owner Name *">
          <input className="input" value={form.name} onChange={(e) => set('name', e.target.value)} />
        </Field>
        <Field label="Phone *">
          <input className="input" value={form.phone} onChange={(e) => set('phone', e.target.value)}
                 placeholder="+91 9876543210" />
        </Field>
        <Field label="Rent (₹/month) *">
          <input type="number" className="input" value={form.rent}
                 onChange={(e) => set('rent', e.target.value)} />
        </Field>
        <Field label="City *">
          <input className="input" value={form.city}
                 onChange={(e) => set('city', e.target.value)} />
        </Field>

        <div className="md:col-span-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Location *</label>
          <div className="flex flex-col sm:flex-row gap-2 mt-1">
            <input className="input" placeholder="Latitude" value={form.latitude}
                   onChange={(e) => set('latitude', e.target.value)} />
            <input className="input" placeholder="Longitude" value={form.longitude}
                   onChange={(e) => set('longitude', e.target.value)} />
            <button type="button" onClick={useLocation}
                    className="btn-primary px-4 py-2 whitespace-nowrap">
              📍 Use my location
            </button>
          </div>
        </div>

        <Field label="Description" className="md:col-span-2">
          <textarea className="input" rows={3} value={form.description}
                    onChange={(e) => set('description', e.target.value)}
                    placeholder="Describe the room, amenities, neighborhood…" />
        </Field>

        <Field label="Image URL (optional)" className="md:col-span-2">
          <input className="input" value={form.imageUrl}
                 onChange={(e) => set('imageUrl', e.target.value)}
                 placeholder="https://…" />
        </Field>

        <label className="flex items-center gap-2 md:col-span-2">
          <input type="checkbox" checked={form.isAvailable} className="accent-brand-500"
                 onChange={(e) => set('isAvailable', e.target.checked)} />
          <span className="text-sm">Mark as currently available</span>
        </label>

        <button type="submit" disabled={submitting}
                className="md:col-span-2 btn-primary py-3 text-base disabled:opacity-60">
          {submitting ? 'Posting…' : '🚀 Post Room'}
        </button>
      </form>
    </div>
  );
}

function Field({ label, className = '', children }: { label: string; className?: string; children: React.ReactNode }) {
  return (
    <div className={className}>
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
      <div className="mt-1">{children}</div>
    </div>
  );
}
