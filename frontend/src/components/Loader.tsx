export default function Loader({ label = 'Loading...' }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center p-16 gap-4">
      <div className="relative w-10 h-10">
        <span className="absolute inset-0 border-2 border-bg-alt rounded-full" />
        <span className="absolute inset-0 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
      <span className="text-sm text-muted font-medium">{label}</span>
    </div>
  );
}
