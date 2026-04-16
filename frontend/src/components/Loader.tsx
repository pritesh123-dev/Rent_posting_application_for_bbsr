export default function Loader({ label = 'Loading…' }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center p-12 gap-4 text-gray-500">
      <div className="relative w-10 h-10">
        <span className="absolute inset-0 border-2 border-indigo-200 dark:border-indigo-900 rounded-full" />
        <span className="absolute inset-0 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}
