import { useState } from 'react';
import { useTranslation } from '../../i18n/LanguageContext';

interface FAQDrawerProps {
  onClose: () => void;
}

const categoryOrder = ['general', 'products', 'account', 'admin'] as const;

export default function FAQDrawer({ onClose }: FAQDrawerProps) {
  const t = useTranslation();
  const [search, setSearch] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filtered = t.faq.items.filter((item) => {
    const q = search.toLowerCase();
    return item.question.toLowerCase().includes(q) || item.answer.toLowerCase().includes(q);
  });

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end" onClick={onClose}>
      <div
        className="w-full max-w-md h-full bg-white shadow-2xl flex flex-col animate-slide-in-right"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-grey-50 bg-white-700">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-grey-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="font-semibold text-grey-500">{t.faq.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-grey-50 rounded transition-colors text-grey-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Search */}
        <div className="px-4 py-3 border-b border-grey-50">
          <input
            type="text"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setOpenIndex(null); }}
            placeholder={t.faq.searchPlaceholder}
            className="w-full px-3 py-2 border border-grey-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        {/* FAQ List */}
        <div className="flex-1 overflow-y-auto">
          {filtered.length === 0 ? (
            <p className="px-4 py-8 text-center text-sm text-grey-300">{t.faq.noResults}</p>
          ) : (
            categoryOrder.map((cat) => {
              const catItems = filtered.filter((item) => item.category === cat);
              if (catItems.length === 0) return null;
              return (
                <div key={cat}>
                  <div className="px-4 py-2 bg-white-700 border-b border-grey-50">
                    <span className="text-xs font-semibold text-grey-300 uppercase tracking-wide">
                      {t.faq.categories[cat]}
                    </span>
                  </div>
                  {catItems.map((item) => {
                    const globalIndex = t.faq.items.indexOf(item);
                    const isOpen = openIndex === globalIndex;
                    return (
                      <div key={globalIndex} className="border-b border-grey-50">
                        <button
                          onClick={() => toggle(globalIndex)}
                          className="w-full text-left px-4 py-3 flex items-start justify-between gap-2 hover:bg-white-700 transition-colors"
                        >
                          <span className="text-sm font-medium text-grey-500">{item.question}</span>
                          <svg
                            className={`w-4 h-4 mt-0.5 flex-shrink-0 text-grey-100 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.66667} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        {isOpen && (
                          <div className="px-4 pb-3">
                            <p className="text-sm text-grey-300 leading-relaxed">{item.answer}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
