export default function Loader({ label = 'Loading…' }: { label?: string }) {
  return (
    <div className="flex items-center justify-center p-6 gap-3 text-gray-500">
      <span className="inline-block w-5 h-5 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" />
      <span>{label}</span>
    </div>
  );
}
