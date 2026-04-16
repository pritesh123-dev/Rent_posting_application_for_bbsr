import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { shortlist } from '../services/roomApi';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [savedCount, setSavedCount] = useState(shortlist.count());

  useEffect(() => {
    const i = setInterval(() => setSavedCount(shortlist.count()), 1000);
    return () => clearInterval(i);
  }, []);

  const navLink = ({ isActive }: { isActive: boolean }) =>
    `px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
      isActive ? 'bg-accent text-white shadow-btn' : 'text-muted hover:text-primary'
    }`;

  return (
    <nav className="bg-surface/80 backdrop-blur-xl sticky top-0 z-20 border-b border-subtle/50">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-5 py-4">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-accent flex items-center justify-center shadow-btn">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2.5">
              <path strokeLinecap="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1" />
            </svg>
          </div>
          <div className="leading-tight">
            <span className="text-lg font-extrabold text-primary">Room Finder</span>
            <span className="block text-[10px] font-bold text-accent tracking-widest uppercase">BBSR</span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-2">
          <NavLink to="/find" className={navLink}>Find Room</NavLink>
          <NavLink to="/post" className={navLink}>Post Room</NavLink>
          <NavLink to="/saved" className={({ isActive }) =>
            `relative px-3 py-2 rounded-xl transition-all ${isActive ? 'bg-accent text-white' : 'text-muted hover:text-primary'}`}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
            </svg>
            {savedCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
                {savedCount}
              </span>
            )}
          </NavLink>
        </div>

        <button className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-[5px] rounded-xl border border-subtle"
                onClick={() => setOpen(!open)} aria-label="Menu">
          <span className={`block w-4 h-[2px] bg-primary rounded transition-all ${open ? 'rotate-45 translate-y-[7px]' : ''}`} />
          <span className={`block w-4 h-[2px] bg-primary rounded transition-all ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-4 h-[2px] bg-primary rounded transition-all ${open ? '-rotate-45 -translate-y-[7px]' : ''}`} />
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-subtle/50 px-5 py-3 bg-surface space-y-1">
          <NavLink to="/find" className={navLink} onClick={() => setOpen(false)}>Find Room</NavLink>
          <NavLink to="/post" className={navLink} onClick={() => setOpen(false)}>Post Room</NavLink>
          <NavLink to="/saved" className={navLink} onClick={() => setOpen(false)}>Saved ({savedCount})</NavLink>
        </div>
      )}
    </nav>
  );
}
