import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { AppDispatch } from '../redux/store';
import { createRoom } from '../redux/roomSlice';

interface Form {
  name: string; phone: string; rent: string; city: string;
  latitude: string; longitude: string; isAvailable: boolean;
  description: string; imageUrl: string;
}

const empty: Form = {
  name: '', phone: '', rent: '', city: 'Bhubaneswar',
  latitude: '', longitude: '', isAvailable: true,
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
    toast.loading('Getting location...', { id: 'loc' });
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        set('latitude', pos.coords.latitude.toFixed(6));
        set('longitude', pos.coords.longitude.toFixed(6));
        toast.success('Location captured', { id: 'loc' });
      },
      (err) => toast.error(err.message, { id: 'loc' }),
    );
  };

  const validate = (): string | null => {
    if (!form.name.trim()) return 'Name is required';
    if (!/^[+0-9\- ]{7,20}$/.test(form.phone)) return 'Invalid phone number';
    if (!(+form.rent > 0)) return 'Rent must be positive';
    if (!form.city.trim()) return 'City is required';
    if (!form.latitude || !form.longitude) return 'Click "Use my location" to set coordinates';
    return null;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = validate();
    if (err) return toast.error(err);
    setSubmitting(true);
    try {
      const created: any = await dispatch(createRoom({
        name: form.name, phone: form.phone, rent: +form.rent, city: form.city,
        latitude: +form.latitude, longitude: +form.longitude, isAvailable: form.isAvailable,
        description: form.description || undefined, imageUrl: form.imageUrl || undefined,
      })).unwrap();
      toast.success('Room posted!');
      nav(`/rooms/${created.id}`);
    } catch (e: any) {
      toast.error(e?.message || 'Failed to post');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold">Post your room</h1>
        <p className="text-muted text-sm mt-1">Fill in the details. First 2,000 posts are free.</p>
      </div>

      <form onSubmit={submit} className="card p-6 md:p-8 space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Owner name">
            <input className="input" value={form.name} onChange={(e) => set('name', e.target.value)}
                   placeholder="e.g. Ramesh Panda" />
          </Field>
          <Field label="Phone number">
            <input className="input" value={form.phone} onChange={(e) => set('phone', e.target.value)}
                   placeholder="+91 98765 43210" />
          </Field>
          <Field label="Monthly rent (₹)">
            <input type="number" className="input" value={form.rent}
                   onChange={(e) => set('rent', e.target.value)} placeholder="e.g. 6500" />
          </Field>
          <Field label="City">
            <input className="input" value={form.city} onChange={(e) => set('city', e.target.value)} />
          </Field>
        </div>

        <Field label="Location">
          <div className="flex flex-col sm:flex-row gap-2">
            <input className="input" placeholder="Latitude" value={form.latitude}
                   onChange={(e) => set('latitude', e.target.value)} />
            <input className="input" placeholder="Longitude" value={form.longitude}
                   onChange={(e) => set('longitude', e.target.value)} />
            <button type="button" onClick={useLocation} className="btn-accent px-4 py-3 text-sm whitespace-nowrap">
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
                <circle cx="12" cy="11" r="3" />
              </svg>
              Use my location
            </button>
          </div>
          {form.latitude && form.longitude && (
            <p className="text-xs text-accent mt-1.5 font-medium">
              ✓ {form.latitude}, {form.longitude}
            </p>
          )}
        </Field>

        <Field label="Description">
          <textarea className="input" rows={3} value={form.description}
                    onChange={(e) => set('description', e.target.value)}
                    placeholder="Describe the room, amenities, landmarks nearby..." />
        </Field>

        <Field label="Image URL (optional)">
          <input className="input" value={form.imageUrl}
                 onChange={(e) => set('imageUrl', e.target.value)}
                 placeholder="https://..." />
        </Field>

        <label className="flex items-center gap-3 cursor-pointer">
          <input type="checkbox" checked={form.isAvailable} className="w-5 h-5 accent-accent rounded"
                 onChange={(e) => set('isAvailable', e.target.checked)} />
          <span className="text-sm font-medium">Currently available for rent</span>
        </label>

        <button type="submit" disabled={submitting} className="btn-accent w-full py-3.5 text-base disabled:opacity-60">
          {submitting ? 'Posting...' : 'Post room'}
        </button>
      </form>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-xs font-bold text-muted uppercase tracking-wider mb-1.5 block">{label}</label>
      {children}
    </div>
  );
}
