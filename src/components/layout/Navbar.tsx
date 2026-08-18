import Link from 'next/link';
import { siteConfig } from '@/config/site';

export function Navbar() {
  return (
    <header className="site-header">
      <nav className="nav container" aria-label="Primary navigation">
        <Link href="/" className="brand">AJ<span>.</span></Link>
        <div className="nav-links">
          {siteConfig.navigation.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
        </div>
        <a className="nav-cta" href={siteConfig.social.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
        <details className="mobile-menu">
          <summary aria-label="Open navigation menu">Menu</summary>
          <div className="mobile-menu-panel">
            {siteConfig.navigation.map((item) => (
              <Link key={item.href} href={item.href}>{item.label}</Link>
            ))}
            <a className="mobile-linkedin" href={siteConfig.social.linkedin} target="_blank" rel="noreferrer">
              LinkedIn ↗
            </a>
          </div>
        </details>
      </nav>
    </header>
  );
}
