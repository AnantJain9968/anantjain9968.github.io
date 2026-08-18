import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import SignOutButton from './SignOutButton';

export default async function AdminPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/admin/login');

  const { data: posts } = await supabase.from('posts').select('id,title,slug,status,published_at,updated_at').order('updated_at', { ascending: false });

  return <section className="section container admin-page">
    <div className="admin-header"><div><span className="eyebrow">Publishing</span><h1>Content dashboard</h1><p>Manage drafts and published articles from one place.</p></div><div className="hero-actions"><Link className="button primary" href="/admin/posts/new">+ New article</Link><SignOutButton /></div></div>
    <div className="admin-table">
      <div className="admin-table-head"><span>Article</span><span>Status</span><span>Updated</span><span>Action</span></div>
      {(posts ?? []).map((post) => <div className="admin-row" key={post.id}><div><strong>{post.title}</strong><small>/{post.slug}</small></div><span className={`status ${post.status}`}>{post.status}</span><span>{new Date(post.updated_at).toLocaleDateString('en-IN')}</span><Link className="text-link" href={`/admin/posts/${post.id}/edit`}>Edit →</Link></div>)}
      {!posts?.length && <div className="empty-state"><p>No articles yet.</p><Link className="button secondary" href="/admin/posts/new">Create your first article</Link></div>}
    </div>
  </section>;
}
