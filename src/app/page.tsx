import Link from 'next/link';
import { cookies } from 'next/headers';
import { getAllMarkdownFiles } from '@/lib/markdown';
import { getDictionary, Locale, defaultLocale } from '@/lib/dictionary';
import { FileText, ArrowRight } from 'lucide-react';

export default async function Home() {
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get('LOCALE')?.value as Locale | undefined;
  const locale = localeCookie === 'tr' ? 'tr' : defaultLocale;
  
  const files = getAllMarkdownFiles(locale);
  const dictionary = getDictionary(locale);

  return (
    <div className="flex flex-col gap-10">
      <section className="space-y-4 py-8 md:py-12 border-b border-slate-800">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-indigo-500">
          {dictionary.home.title}
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl leading-relaxed">
          {dictionary.home.description}
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {files.map((file) => (
          <Link href={`/${file.slug}`} key={file.slug} className="group outline-none">
            <div className="glass-card rounded-2xl p-6 h-full flex flex-col justify-between border-slate-700/50 hover:bg-slate-800/50 relative overflow-hidden">
              {/* Background accent glow */}
              <div className="absolute -right-8 -top-8 bg-teal-500/10 w-32 h-32 rounded-full blur-2xl group-hover:bg-teal-500/20 transition-all duration-500" />
              
              <div>
                <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-teal-500/20 transition-all duration-300 shadow-inner">
                  <FileText className="w-6 h-6 text-teal-400" />
                </div>
                <h2 className="text-xl font-bold text-white mb-3 group-hover:text-teal-300 transition-colors">
                  {file.title}
                </h2>
                <p className="text-slate-400 text-sm line-clamp-3 mb-6">
                  {file.content.substring(0, 120).replace(/[#*`_]/g, '')}...
                </p>
              </div>
              
              <div className="flex items-center text-teal-500 font-medium text-sm group-hover:text-teal-400 mt-auto">
                <span className="group-hover:mr-2 transition-all">{dictionary.home.readDocument}</span>
                <ArrowRight className="w-4 h-4 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
              </div>
            </div>
          </Link>
        ))}
      </section>
      
      {files.length === 0 && (
         <div className="text-slate-400 py-12 text-center">
            No documents found for this language setting.
         </div>
      )}
    </div>
  );
}
