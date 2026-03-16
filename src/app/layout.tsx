import type { Metadata } from 'next';
import { Inter, Fira_Code } from 'next/font/google';
import { cookies } from 'next/headers';
import './globals.css';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { getDictionary, Locale, defaultLocale } from '@/lib/dictionary';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const firaCode = Fira_Code({ subsets: ['latin'], variable: '--font-mono' });

export const metadata: Metadata = {
  title: 'Hunter App | Legal Documents',
  description: 'Terms of Use, Privacy Policy, and Support for Hunter App.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get('LOCALE')?.value as Locale | undefined;
  const locale = localeCookie === 'tr' ? 'tr' : defaultLocale;
  const dictionary = getDictionary(locale);

  return (
    <html lang={locale} className="dark scroll-smooth">
      <body className={`${inter.variable} ${firaCode.variable} font-sans antialiased text-slate-300`}>
        <div className="flex flex-col min-h-screen">
          <header className="sticky top-0 z-50 glass-panel border-b-0 border-x-0 border-t-0 rounded-none shadow-md">
            <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
              <Link href="/" className="flex items-center gap-2 group outline-none">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-teal-500/30 group-hover:shadow-teal-500/50 transition-all duration-300">
                  H
                </div>
                <span className="font-semibold text-xl tracking-tight text-white group-hover:text-teal-400 transition-colors">
                  Hunter App Docs
                </span>
              </Link>
              <nav className="flex items-center gap-6">
                <Link href="/" className="hidden sm:block text-sm font-medium text-slate-300 hover:text-white transition-colors">
                  {dictionary.navigation.home}
                </Link>
                <LanguageSwitcher currentLocale={locale} dictionary={dictionary} />
              </nav>
            </div>
          </header>
          
          <main className="flex-1 w-full max-w-5xl mx-auto p-6 md:p-10 my-8">
            {children}
          </main>
          
          <footer className="py-8 text-center text-sm text-slate-500 glass-panel border-x-0 border-b-0 rounded-none mt-auto">
            <p>© {new Date().getFullYear()} {dictionary.footer.rights}</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
