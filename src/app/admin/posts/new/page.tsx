'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

const slugify = (value: string) => value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

type Option = { id: string; name: string };

export default function NewPostPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Option[]>([]); const [series, setSeries] = useState<Option[]>([]);
  const [form, setForm] = useState({ title: '', slug: '', excerpt: '', content: '', category_id: '', series_id: '', series_order: '', tags: '', cover_image: '', seo_title: '', seo_description: '', reading_time_minutes: '5' });
  const [message, setMessage] = useState(''); const [saving, setSaving] = useState(false); const [uploading, setUploading] = useState(false);
  const update = (key: string, value: string) => setForm((current) => ({ ...current, [key]: value }));

  useEffect(() => { const supabase = createClient(); Promise.all([supabase.from('categories').select('id,name').order('sort_order'), supabase.from('series').select('id,name').order('name')]).then(([c, s]) => { setCategories(c.data ?? []); setSeries(s.data ?? []); }); }, []);

  async function uploadCover(file: File) {
    setUploading(true); setMessage(''); const supabase = createClient(); const extension = file.name.split('.').pop()?.toLowerCase() || 'jpg'; const path = `covers/${crypto.randomUUID()}.${extension}`;
    const { error } = await supabase.storage.from('blog-media').upload(path, file, { contentType: file.type, upsert: false });
    if (error) setMessage(error.message); else setForm((current) => ({ ...current, cover_image: supabase.storage.from('blog-media').getPublicUrl(path).data.publicUrl }));
    setUploading(false);
  }

  async function save(status: 'draft' | 'published') {
    setSaving(true); setMessage(''); const supabase = createClient(); const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push('/admin/login'); return; }
    const { data: post, error } = await supabase.from('posts').insert({ title: form.title, slug: form.slug || slugify(form.title), excerpt: form.excerpt, content: form.content, category_id: form.category_id || null, series_id: form.series_id || null, series_order: form.series_order ? Number(form.series_order) : null, cover_image: form.cover_image || null, status, published_at: status === 'published' ? new Date().toISOString() : null, author_id: user.id, reading_time_minutes: Number(form.reading_time_minutes) || 1, seo_title: form.seo_title || form.title, seo_description: form.seo_description || form.excerpt }).select('id').single();
    if (error || !post) { setMessage(error?.message ?? 'Unable to save article.'); setSaving(false); return; }
    for (const name of form.tags.split(',').map((tag) => tag.trim()).filter(Boolean)) { const tagSlug = slugify(name); const { data: tag } = await supabase.from('tags').upsert({ name, slug: tagSlug }, { onConflict: 'slug' }).select('id').single(); if (tag) await supabase.from('post_tags').upsert({ post_id: post.id, tag_id: tag.id }); }
    router.push('/admin'); router.refresh();
  }

  return <section className="section container admin-editor"><div className="section-title"><span>Publishing</span><h1>New article</h1><p>Write in Markdown for headings, lists, links, tables and fenced code blocks. Upload a cover image when you want one.</p></div><div className="editor-form">
    <label>Title<input value={form.title} onChange={(e) => update('title', e.target.value)} required /></label>
    <label>Slug<input value={form.slug} onChange={(e) => update('slug', e.target.value)} placeholder={slugify(form.title)} /></label>
    <div className="form-grid"><label>Category<select value={form.category_id} onChange={(e) => update('category_id', e.target.value)}><option value="">No category</option>{categories.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label><label>Series<select value={form.series_id} onChange={(e) => update('series_id', e.target.value)}><option value="">No series</option>{series.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label><label>Part number<input type="number" min="1" value={form.series_order} onChange={(e) => update('series_order', e.target.value)} /></label><label>Reading time (minutes)<input type="number" min="1" value={form.reading_time_minutes} onChange={(e) => update('reading_time_minutes', e.target.value)} /></label></div>
    <label>Tags <small>comma separated</small><input value={form.tags} onChange={(e) => update('tags', e.target.value)} placeholder="Java, System Design, Backend" /></label>
    <label>Excerpt<textarea rows={3} value={form.excerpt} onChange={(e) => update('excerpt', e.target.value)} required /></label>
    <label>Cover image <small>JPEG, PNG, WebP, GIF or SVG · max 5 MB</small><input type="file" accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml" onChange={(e) => { const file = e.target.files?.[0]; if (file) void uploadCover(file); }} disabled={uploading} />{form.cover_image && <small>Uploaded successfully.</small>}</label>
    <label>Article content<textarea className="content-editor" rows={24} value={form.content} onChange={(e) => update('content', e.target.value)} required placeholder="# Your article\n\nWrite the technical deep dive here..." /></label>
    <div className="form-grid"><label>SEO title<input value={form.seo_title} onChange={(e) => update('seo_title', e.target.value)} /></label><label>SEO description<textarea rows={2} value={form.seo_description} onChange={(e) => update('seo_description', e.target.value)} /></label></div>
    {message && <p role="alert" className="form-error">{message}</p>}
    <div className="editor-actions"><button className="button secondary" type="button" onClick={() => save('draft')} disabled={saving || uploading}>Save draft</button><button className="button primary" type="button" onClick={() => save('published')} disabled={saving || uploading}>{saving ? 'Saving…' : 'Publish article →'}</button></div>
  </div></section>;
}
