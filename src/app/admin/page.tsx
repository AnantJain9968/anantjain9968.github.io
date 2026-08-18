import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import SignOutButton from './SignOutButton';

export default async function AdminPage() {
  const supabase = await createClient();
  const { data: { claims } } = await supabase.auth.getClaims();

  if (!claims) {
    redirect('/admin/login');
  }

  return (
    <section className="admin-shell">
      <div className="admin-card">
        <span className="eyebrow">Publishing</span>
        <h1>Admin dashboard</h1>
        <p>You are signed in. The CMS can now safely use the authenticated Supabase session for publishing operations.</p>
        <div className="hero-actions">
          <Link className="button primary" href="/blog">View blog →</Link>
          <SignOutButton />
        </div>
      </div>
    </section>
  );
}
