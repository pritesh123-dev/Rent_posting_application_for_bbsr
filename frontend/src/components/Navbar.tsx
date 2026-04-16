import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const navLink = ({ isActive }: { isActive: boolean }) =>
    `px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
      isActive ? 'bg-accent text-white shadow-btn' : 'text-muted hover:text-primary'
    }`;

  return (
    <nav className="bg-surface/80 backdrop-blur-xl sticky top-0 z-20 border-b border-subtle/50">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-5 py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-accent flex items-center justify-center shadow-btn">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1" />
            </svg>
          </div>
          <div className="leading-tight">
            <span className="text-lg font-extrabold text-primary">Room Finder</span>
            <span className="block text-[10px] font-bold text-accent tracking-widest uppercase">BBSR</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-2">
          <NavLink to="/find" className={navLink}>Find Room</NavLink>
          <NavLink to="/post" className={navLink}>Post Room</NavLink>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-[5px] rounded-xl border border-subtle"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <span className={`block w-4.5 h-[2px] bg-primary rounded transition-all ${open ? 'rotate-45 translate-y-[7px]' : ''}`} />
          <span className={`block w-4.5 h-[2px] bg-primary rounded transition-all ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-4.5 h-[2px] bg-primary rounded transition-all ${open ? '-rotate-45 -translate-y-[7px]' : ''}`} />
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden border-t border-subtle/50 px-5 py-3 bg-surface space-y-1">
          <NavLink to="/find" className={navLink} onClick={() => setOpen(false)}>Find Room</NavLink>
          <NavLink to="/post" className={navLink} onClick={() => setOpen(false)}>Post Room</NavLink>
        </div>
      )}
    </nav>
  );
}
