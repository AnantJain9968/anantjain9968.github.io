'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function SignOutButton() {
  const [loading, setLoading] = useState(false);

  async function signOut() {
    setLoading(true);
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.assign('/admin/login');
  }

  return (
    <button className="button secondary" type="button" onClick={signOut} disabled={loading}>
      {loading ? 'Signing out…' : 'Sign out'}
    </button>
  );
}
