import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { toggleDark } from '../redux/uiSlice';

export default function Navbar() {
  const dispatch = useDispatch();
  const dark = useSelector((s: RootState) => s.ui.darkMode);
  const [open, setOpen] = useState(false);

  const base = 'px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200';
  const active = ({ isActive }: { isActive: boolean }) =>
    `${base} ${isActive ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}`;

  return (
    <nav className="glass sticky top-0 z-20 border-b border-gray-200/50 dark:border-gray-800/50">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2.5 group">
          <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl hero-gradient text-white text-lg shadow-md shadow-indigo-500/30 group-hover:shadow-lg transition-shadow">
            🏠
          </span>
          <div>
            <span className="text-lg font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Room Finder
            </span>
            <span className="text-[10px] block -mt-1 text-gray-400 font-semibold tracking-widest uppercase">
              in BBSR
            </span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-2">
          <NavLink to="/find" className={active}>🔍 Find Room</NavLink>
          <NavLink to="/post" className={active}>📝 Post Room</NavLink>
          <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-1" />
          <button onClick={() => dispatch(toggleDark())}
                  className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all">
            {dark ? '☀️' : '🌙'}
          </button>
        </div>

        <button className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1 rounded-xl border dark:border-gray-700"
                onClick={() => setOpen(!open)} aria-label="Menu">
          <span className={`block w-4 h-0.5 bg-current transition-transform ${open ? 'rotate-45 translate-y-1.5' : ''}`} />
          <span className={`block w-4 h-0.5 bg-current transition-opacity ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-4 h-0.5 bg-current transition-transform ${open ? '-rotate-45 -translate-y-1.5' : ''}`} />
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-gray-200/50 dark:border-gray-800/50 px-4 py-3 flex flex-col gap-1 glass">
          <NavLink to="/find" className={active} onClick={() => setOpen(false)}>🔍 Find Room</NavLink>
          <NavLink to="/post" className={active} onClick={() => setOpen(false)}>📝 Post Room</NavLink>
          <button onClick={() => { dispatch(toggleDark()); setOpen(false); }}
                  className={`${base} text-left text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800`}>
            {dark ? '☀️ Light mode' : '🌙 Dark mode'}
          </button>
        </div>
      )}
    </nav>
  );
}
