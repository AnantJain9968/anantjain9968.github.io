'use client';

import { FormEvent, Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

function AdminLoginForm() {
  const searchParams = useSearchParams();
  const next = searchParams.get('next') || '/admin';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage('');

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }

    window.location.assign(next.startsWith('/') ? next : '/admin');
  }

  return (
    <div className="admin-card">
      <span className="eyebrow">Private area</span>
      <h1>Admin login</h1>
      <p>Sign in with your Supabase account to access the publishing dashboard.</p>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            required
          />
        </label>
        <button className="button primary" type="submit" disabled={loading}>
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
      {message && <small role="alert">{message}</small>}
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <section className="admin-shell">
      <Suspense fallback={<div className="admin-card"><p>Loading login…</p></div>}>
        <AdminLoginForm />
      </Suspense>
    </section>
  );
}
