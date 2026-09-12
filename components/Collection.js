'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from './Navbar';
import Footer from './Footer';
import { getCollection, setCollection } from '../lib/storage';

export default function Collection() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const load = () => setItems(getCollection());

    load();
    window.addEventListener('collectionchange', load);
    window.addEventListener('storage', load);

    return () => {
      window.removeEventListener('collectionchange', load);
      window.removeEventListener('storage', load);
    };
  }, []);

  const remove = (item) => {
    const next = items.filter(
      (saved) => !(saved.id === item.id && saved.type === item.type)
    );
    setCollection(next);
    setItems(next);
  };

  return (
    <div className="site">
      <Navbar />
      <main className="collection-page">
        <div className="collection-head">
          <div>
            <span className="eyebrow">YOUR LIBRARY / {items.length}</span>
            <h1>Saved <i>obsessions.</i></h1>
            <p>Your personal AURAVUE shelf lives in this browser. No account required.</p>
          </div>
          <Link className="btn-ghost" href="/">← Back to explore</Link>
        </div>

        {items.length ? (
          <div className="collection-grid">
            {items.map((item) => (
              <article className="collection-card" key={`${item.type}-${item.id}`}>
                <Link href={`/${item.type}/${item.id}`}>
                  <img src={item.image} alt={item.title} />
                  <div>
                    <span>{item.type}</span>
                    <h3>{item.title}</h3>
                    <small>Open dossier →</small>
                  </div>
                </Link>
                <button onClick={() => remove(item)}>Remove</button>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-collection">
            <span>✦</span>
            <h2>Nothing saved yet.</h2>
            <p>Open any anime or manga dossier and add it to your collection.</p>
            <Link className="btn-primary" href="/">Discover titles ↗</Link>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
