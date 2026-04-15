import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { toggleDark } from '../redux/uiSlice';

export default function Navbar() {
  const dispatch = useDispatch();
  const dark = useSelector((s: RootState) => s.ui.darkMode);
  const link = 'px-3 py-2 rounded hover:bg-brand-50 dark:hover:bg-gray-800';
  const active = ({ isActive }: { isActive: boolean }) =>
    `${link} ${isActive ? 'text-brand-600 font-semibold' : ''}`;

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm border-b dark:border-gray-800 sticky top-0 z-10">
      <div className="max-w-6xl mx-auto flex items-center justify-between p-3">
        <Link to="/" className="text-xl font-bold text-brand-600">🏠 RentBBSR</Link>
        <div className="flex items-center gap-1">
          <NavLink to="/find" className={active}>Find Room</NavLink>
          <NavLink to="/post" className={active}>Post Room</NavLink>
          <button onClick={() => dispatch(toggleDark())}
                  className="ml-2 px-3 py-2 rounded border dark:border-gray-700">
            {dark ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </nav>
  );
}
