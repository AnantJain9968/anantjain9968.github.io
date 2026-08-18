import Link from 'next/link';
import { siteConfig, skills } from '@/config/site';
import { getPublishedPosts } from '@/lib/blog/data';
import { BlogCard } from '@/components/blog/BlogCard';

export default function HomePage() {
  const posts = getPublishedPosts();
  return <>
    <section className="hero container"><div className="hero-copy"><div className="eyebrow">JAVA BACKEND ENGINEER · DELHI NCR</div><h1>Building backend systems.<br /><em>Writing about how they work.</em></h1><p>{siteConfig.description}</p><div className="hero-actions"><Link className="button primary" href="/blog">Explore engineering</Link><a className="button secondary" href={siteConfig.social.github}>GitHub ↗</a></div></div><aside className="hero-card"><span>Currently focused on</span><strong>Backend engineering & system design</strong><div className="hero-stat"><b>5.6+</b><small>years experience</small></div></aside></section>
    <section className="section container"><div className="section-title"><span>01 / Expertise</span><h2>The engineering topics I care about.</h2></div><div className="skill-grid">{skills.map((skill) => <div key={skill}>{skill}</div>)}</div></section>
    <section className="section container"><div className="section-title row"><div><span>02 / Writing</span><h2>Latest from the engineering notebook.</h2></div><Link href="/blog" className="text-link">View all articles →</Link></div><div className="blog-grid">{posts.map((post) => <BlogCard key={post.id} post={post} />)}</div></section>
    <section className="section container split"><div><span className="eyebrow">03 / Experience</span><h2>Enterprise experience, practical engineering.</h2></div><div className="experience-summary"><article><b>STMicroelectronics</b><span>Application Software Engineer</span><p>Java, enterprise systems, SQL-heavy workflows, integrations and performance optimization.</p></article><article><b>Nagarro</b><span>Software Engineer</span><p>Backend APIs, automation and full-stack delivery for enterprise applications.</p></article></div></section>
    <section className="cta container"><div><span className="eyebrow">Open to opportunities</span><h2>Have a backend problem worth solving?</h2></div><a className="button primary" href={`mailto:${siteConfig.email}`}>Let's talk →</a></section>
  </>;
}
