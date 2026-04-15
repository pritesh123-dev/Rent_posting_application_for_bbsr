import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { toggleDark } from '../redux/uiSlice';

export default function Navbar() {
  const dispatch = useDispatch();
  const dark = useSelector((s: RootState) => s.ui.darkMode);
  const [open, setOpen] = useState(false);

  const link = 'px-3 py-2 rounded-lg hover:bg-brand-50 dark:hover:bg-gray-800 text-sm font-medium';
  const active = ({ isActive }: { isActive: boolean }) =>
    `${link} ${isActive ? 'text-brand-600 bg-brand-50 dark:bg-gray-800' : ''}`;

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm border-b dark:border-gray-800 sticky top-0 z-20">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2 text-xl font-extrabold text-brand-600">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg hero-gradient text-white">📡</span>
          RoomRadar
        </Link>

        <div className="hidden md:flex items-center gap-1">
          <NavLink to="/find" className={active}>Find Room</NavLink>
          <NavLink to="/post" className={active}>Post Room</NavLink>
          <button onClick={() => dispatch(toggleDark())}
                  className="ml-2 px-3 py-2 rounded-lg border dark:border-gray-700 text-sm">
            {dark ? '☀️' : '🌙'}
          </button>
        </div>

        <button className="md:hidden p-2 rounded-lg border dark:border-gray-700"
                onClick={() => setOpen(!open)} aria-label="Menu">
          <span className="block w-5 h-0.5 bg-current mb-1.5" />
          <span className="block w-5 h-0.5 bg-current mb-1.5" />
          <span className="block w-5 h-0.5 bg-current" />
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t dark:border-gray-800 px-4 py-2 flex flex-col gap-1">
          <NavLink to="/find" className={active} onClick={() => setOpen(false)}>🔍 Find Room</NavLink>
          <NavLink to="/post" className={active} onClick={() => setOpen(false)}>🏠 Post Room</NavLink>
          <button onClick={() => dispatch(toggleDark())} className={link + ' text-left'}>
            {dark ? '☀️ Light mode' : '🌙 Dark mode'}
          </button>
        </div>
      )}
    </nav>
  );
}
