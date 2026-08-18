import { siteConfig } from '@/config/site';

export function Footer() {
  return <footer className="footer"><div className="container footer-inner"><span>© {new Date().getFullYear()} {siteConfig.name}</span><div><a href={siteConfig.social.github}>GitHub</a><a href={siteConfig.social.linkedin}>LinkedIn</a><a href={`mailto:${siteConfig.email}`}>Email</a></div></div></footer>;
}
