import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="py-12 text-center">
      <h1 className="text-4xl font-bold mb-3">Find or Post a Room in Minutes</h1>
      <p className="text-gray-500 mb-8 max-w-xl mx-auto">
        Hyper-local room rental platform for Bhubaneswar and beyond.
        Post your room for free — first 2000 listings are on the house.
      </p>
      <div className="flex justify-center gap-3">
        <Link to="/find" className="bg-brand-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-brand-600">
          🔍 Find Room Near Me
        </Link>
        <Link to="/post" className="bg-white dark:bg-gray-900 border dark:border-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-800">
          🏠 Post Your Room
        </Link>
      </div>
    </div>
  );
}
