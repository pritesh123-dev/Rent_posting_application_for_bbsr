import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { AppDispatch } from '../redux/store';
import { createRoom } from '../redux/roomSlice';
import { ROOM_TYPES, FURNISHING, AMENITY_OPTIONS } from '../services/roomApi';

const typeLabels: Record<string, string> = { '1BHK': '1 BHK', '2BHK': '2 BHK', '3BHK': '3 BHK', SINGLE: 'Single Room', PG: 'PG / Hostel', STUDIO: 'Studio' };
const furnLabels: Record<string, string> = { FURNISHED: 'Furnished', SEMI_FURNISHED: 'Semi-Furnished', UNFURNISHED: 'Unfurnished' };

interface Form {
  name: string; phone: string; rent: string; city: string; area: string;
  latitude: string; longitude: string; isAvailable: boolean;
  roomType: string; furnishing: string; amenities: string[];
  description: string; imageUrl: string;
}

const empty: Form = {
  name: '', phone: '', rent: '', city: 'Bhubaneswar', area: '',
  latitude: '', longitude: '', isAvailable: true,
  roomType: '1BHK', furnishing: 'SEMI_FURNISHED', amenities: [],
  description: '', imageUrl: '',
};

export default function PostRoomPage() {
  const [form, setForm] = useState<Form>(empty);
  const [submitting, setSubmitting] = useState(false);
  const [step, setStep] = useState(1);
  const dispatch = useDispatch<AppDispatch>();
  const nav = useNavigate();

  const set = (k: keyof Form, v: any) => setForm((f) => ({ ...f, [k]: v }));

  const toggleAmenity = (a: string) => {
    setForm((f) => ({
      ...f,
      amenities: f.amenities.includes(a) ? f.amenities.filter((x) => x !== a) : [...f.amenities, a],
    }));
  };

  const useLocation = () => {
    if (!navigator.geolocation) return toast.error('Geolocation not supported');
    toast.loading('Getting location...', { id: 'loc' });
    navigator.geolocation.getCurrentPosition(
      (pos) => { set('latitude', pos.coords.latitude.toFixed(6)); set('longitude', pos.coords.longitude.toFixed(6)); toast.success('Location captured', { id: 'loc' }); },
      (err) => toast.error(err.message, { id: 'loc' }),
    );
  };

  const validate = (): string | null => {
    if (step === 1) {
      if (!form.name.trim()) return 'Name is required';
      if (!/^[+0-9\- ]{7,20}$/.test(form.phone)) return 'Invalid phone';
      if (!(+form.rent > 0)) return 'Rent must be positive';
      if (!form.city.trim()) return 'City required';
      return null;
    }
    if (!form.latitude || !form.longitude) return 'Set your location';
    return null;
  };

  const next = () => { const e = validate(); if (e) toast.error(e); else setStep(2); };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = validate();
    if (err) return toast.error(err);
    setSubmitting(true);
    try {
      const created: any = await dispatch(createRoom({
        name: form.name, phone: form.phone, rent: +form.rent, city: form.city, area: form.area || undefined,
        latitude: +form.latitude, longitude: +form.longitude, isAvailable: form.isAvailable,
        roomType: form.roomType || undefined, furnishing: form.furnishing || undefined,
        amenities: form.amenities.length ? form.amenities.join(',') : undefined,
        description: form.description || undefined, imageUrl: form.imageUrl || undefined,
      })).unwrap();
      toast.success('Room posted!');
      nav(`/rooms/${created.id}`);
    } catch (e: any) { toast.error(e?.message || 'Failed'); } finally { setSubmitting(false); }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold">Post your room</h1>
        <p className="text-muted text-sm mt-1">Step {step} of 2 — {step === 1 ? 'Basic details' : 'Location & amenities'}</p>
        {/* Progress */}
        <div className="flex gap-2 mt-3">
          <div className={`h-1.5 flex-1 rounded-full ${step >= 1 ? 'bg-accent' : 'bg-bg-alt'}`} />
          <div className={`h-1.5 flex-1 rounded-full ${step >= 2 ? 'bg-accent' : 'bg-bg-alt'}`} />
        </div>
      </div>

      <form onSubmit={submit} className="card p-6 md:p-8 space-y-5">
        {step === 1 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Owner name">
                <input className="input" value={form.name} onChange={(e) => set('name', e.target.value)} placeholder="e.g. Ramesh Panda" />
              </Field>
              <Field label="Phone number">
                <input className="input" value={form.phone} onChange={(e) => set('phone', e.target.value)} placeholder="+91 98765 43210" />
              </Field>
              <Field label="Monthly rent (₹)">
                <input type="number" className="input" value={form.rent} onChange={(e) => set('rent', e.target.value)} placeholder="e.g. 6500" />
              </Field>
              <Field label="City">
                <input className="input" value={form.city} onChange={(e) => set('city', e.target.value)} />
              </Field>
              <Field label="Area / Locality">
                <input className="input" value={form.area} onChange={(e) => set('area', e.target.value)} placeholder="e.g. Patia, Saheed Nagar" />
              </Field>
            </div>

            <Field label="Room type">
              <div className="flex flex-wrap gap-2">
                {ROOM_TYPES.map((t) => (
                  <button key={t} type="button" onClick={() => set('roomType', t)}
                          className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${
                            form.roomType === t ? 'bg-accent text-white border-accent' : 'border-subtle text-muted hover:border-accent'
                          }`}>
                    {typeLabels[t] || t}
                  </button>
                ))}
              </div>
            </Field>

            <Field label="Furnishing">
              <div className="flex gap-2">
                {FURNISHING.map((f) => (
                  <button key={f} type="button" onClick={() => set('furnishing', f)}
                          className={`flex-1 py-2.5 rounded-xl text-sm font-semibold border transition-all ${
                            form.furnishing === f ? 'bg-accent text-white border-accent' : 'border-subtle text-muted hover:border-accent'
                          }`}>
                    {furnLabels[f]}
                  </button>
                ))}
              </div>
            </Field>

            <button type="button" onClick={next} className="btn-accent w-full py-3.5 text-base">Continue</button>
          </>
        )}

        {step === 2 && (
          <>
            <Field label="Location">
              <div className="flex flex-col sm:flex-row gap-2">
                <input className="input" placeholder="Latitude" value={form.latitude} onChange={(e) => set('latitude', e.target.value)} />
                <input className="input" placeholder="Longitude" value={form.longitude} onChange={(e) => set('longitude', e.target.value)} />
                <button type="button" onClick={useLocation} className="btn-accent px-4 py-3 text-sm whitespace-nowrap">
                  Use my location
                </button>
              </div>
              {form.latitude && form.longitude && <p className="text-xs text-accent mt-1.5 font-medium">✓ {form.latitude}, {form.longitude}</p>}
            </Field>

            <Field label="Amenities">
              <div className="flex flex-wrap gap-2">
                {AMENITY_OPTIONS.map((a) => (
                  <button key={a} type="button" onClick={() => toggleAmenity(a)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                            form.amenities.includes(a) ? 'bg-accent-light text-accent-dark border-accent/30' : 'border-subtle text-muted hover:border-accent/30'
                          }`}>
                    {a}
                  </button>
                ))}
              </div>
            </Field>

            <Field label="Description">
              <textarea className="input" rows={3} value={form.description} onChange={(e) => set('description', e.target.value)} placeholder="Room details, nearby landmarks..." />
            </Field>

            <Field label="Image URL (optional)">
              <input className="input" value={form.imageUrl} onChange={(e) => set('imageUrl', e.target.value)} placeholder="https://..." />
            </Field>

            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={form.isAvailable} className="w-5 h-5 accent-accent" onChange={(e) => set('isAvailable', e.target.checked)} />
              <span className="text-sm font-medium">Currently available for rent</span>
            </label>

            <div className="flex gap-3">
              <button type="button" onClick={() => setStep(1)} className="btn-outline flex-1 py-3.5">Back</button>
              <button type="submit" disabled={submitting} className="btn-accent flex-[2] py-3.5 text-base disabled:opacity-60">
                {submitting ? 'Posting...' : 'Post room — Free'}
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div><label className="text-xs font-bold text-muted uppercase tracking-wider mb-1.5 block">{label}</label>{children}</div>;
}
