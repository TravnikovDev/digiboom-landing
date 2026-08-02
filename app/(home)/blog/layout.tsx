import BlogNav from "@/components/BlogNav";
import Footer from "@/components/Footer";
import { getDictionary } from "@/i18n/dictionaries";
import { defaultLocale } from "@/i18n/config";

/**
 * Blog chrome. Sits inside the (home) route group, so it inherits that root layout's
 * <html lang="en">, fonts and globals — the blog is English-only for now.
 * Each page paints its own bands (hero + body), so no background is set here.
 */
export default function BlogLayout({ children }: { children: React.ReactNode }) {
  const t = getDictionary(defaultLocale);
  return (
    <div className="min-h-screen flex flex-col">
      <BlogNav />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer copy={t.footer} locale={defaultLocale} langLabel={t.nav.langLabel} blogLabel={t.blog.navLabel} />
    </div>
  );
}
