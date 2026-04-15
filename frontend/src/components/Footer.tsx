export default function Footer() {
  return (
    <footer className="border-t dark:border-gray-800 bg-white dark:bg-gray-900 mt-12">
      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-6 h-6 rounded hero-gradient text-white text-xs">📡</span>
          <span className="font-semibold text-gray-700 dark:text-gray-300">RoomRadar</span>
          <span>· Find rooms near you</span>
        </div>
        <div className="flex gap-4">
          <a href="#" className="hover:text-brand-600">About</a>
          <a href="#" className="hover:text-brand-600">Privacy</a>
          <a href="#" className="hover:text-brand-600">Contact</a>
        </div>
      </div>
    </footer>
  );
}
