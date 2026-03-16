'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher({ 
  currentLocale, 
  dictionary 
}: { 
  currentLocale: string;
  dictionary: any;
}) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const changeLanguage = (locale: string) => {
    document.cookie = `LOCALE=${locale}; path=/; max-age=31536000`; // 1 year
    setIsOpen(false);
    router.refresh();
  };

  if (!mounted) return null;

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-300 hover:text-white bg-slate-800/50 hover:bg-slate-700/50 rounded-lg border border-slate-700transition-colors"
      >
        <Globe className="w-4 h-4" />
        <span>{currentLocale === 'en' ? 'EN' : 'TR'}</span>
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-32 origin-top-right rounded-xl glass-panel border border-slate-700 shadow-xl overflow-hidden z-50">
            <div className="py-1">
              <button
                onClick={() => changeLanguage('en')}
                className={`flex w-full items-center px-4 py-2 text-sm ${
                  currentLocale === 'en' 
                    ? 'bg-teal-500/10 text-teal-400 font-medium' 
                    : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                } transition-colors`}
              >
                {dictionary.language.english}
              </button>
              <button
                onClick={() => changeLanguage('tr')}
                className={`flex w-full items-center px-4 py-2 text-sm ${
                  currentLocale === 'tr' 
                    ? 'bg-teal-500/10 text-teal-400 font-medium' 
                    : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                } transition-colors`}
              >
                {dictionary.language.turkish}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
