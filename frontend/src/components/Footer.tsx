export default function Footer() {
  return (
    <footer className="border-t border-gray-200/50 dark:border-gray-800/50 bg-white dark:bg-gray-900/50 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-xl hero-gradient text-white shadow-md shadow-indigo-500/20">
              🏠
            </span>
            <div>
              <span className="font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Room Finder in BBSR
              </span>
            </div>
          </div>
          <p className="text-sm text-gray-400">
            Made with ❤️ for Bhubaneswar renters
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-gray-500 hover:text-indigo-600 transition-colors">About</a>
            <a href="#" className="text-sm text-gray-500 hover:text-indigo-600 transition-colors">Privacy</a>
            <a href="#" className="text-sm text-gray-500 hover:text-indigo-600 transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
