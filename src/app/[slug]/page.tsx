import { getMarkdownBySlug } from '@/lib/markdown';
import { getDictionary, Locale, defaultLocale } from '@/lib/dictionary';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import { ArrowLeft, Calendar } from 'lucide-react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function MarkdownPage({ params }: PageProps) {
  const awaitedParams = await params;
  
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get('LOCALE')?.value as Locale | undefined;
  const locale = localeCookie === 'tr' ? 'tr' : defaultLocale;
  const dictionary = getDictionary(locale);

  const file = getMarkdownBySlug(awaitedParams.slug, locale);

  if (!file) {
    notFound();
  }

  return (
    <article className="max-w-3xl mx-auto w-full">
      <div className="mb-10">
        <Link 
          href="/" 
          className="inline-flex items-center text-sm font-medium text-slate-400 hover:text-teal-400 transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          {dictionary.navigation.back}
        </Link>
        
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 drop-shadow-sm leading-tight">
          {file.title}
        </h1>
        
        {file.date && (
          <div className="flex items-center text-sm text-slate-400 mb-8 pb-8 border-b border-slate-800">
            <Calendar className="w-4 h-4 mr-2" />
            <time dateTime={new Date(file.date).toISOString()}>
              {new Date(file.date).toLocaleDateString(locale === 'tr' ? 'tr-TR' : 'en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
          </div>
        )}
      </div>

      <div className="prose prose-custom max-w-none glass-panel p-8 md:p-12 rounded-3xl border-slate-700/50 bg-slate-900/40 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-teal-500/5 to-transparent pointer-events-none" />
        
        <div className="relative z-10">
          <ReactMarkdown>{file.content}</ReactMarkdown>
        </div>
      </div>
    </article>
  );
}
