'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Mark from './Mark';
import { getCollection } from '../lib/storage';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const sync = () => setCount(getCollection().length);

    sync();
    window.addEventListener('collectionchange', sync);
    window.addEventListener('storage', sync);

    return () => {
      window.removeEventListener('collectionchange', sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  return (
    <header className="nav-wrap">
      <nav className="nav">
        <Link href="/" className="brand" onClick={() => setOpen(false)}>
          <Mark />
          <span>AURAVUE</span>
        </Link>

        <div className={`nav-links ${open ? 'open' : ''}`}>
          <Link href="/#discover" onClick={() => setOpen(false)}>Discover</Link>
          <Link href="/#anime" onClick={() => setOpen(false)}>Anime</Link>
          <Link href="/manga" onClick={() => setOpen(false)}>Manga</Link>
          <Link href="/#genres" onClick={() => setOpen(false)}>Genres</Link>
          <Link href="/collection" onClick={() => setOpen(false)}>
            Collection {count > 0 && <i>{count}</i>}
          </Link>
        </div>

        <div className="nav-actions">
          <Link className="nav-search" href="/#search">
            <span>⌕</span>
            <em>Search</em>
            <kbd>⌘ K</kbd>
          </Link>
          <button
            className="menu"
            onClick={() => setOpen((value) => !value)}
            aria-label="Toggle navigation"
            aria-expanded={open}
          >
            {open ? '×' : '☰'}
          </button>
        </div>
      </nav>
    </header>
  );
}
