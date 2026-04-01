'use client';

import { useState } from 'react';
import NewsCard from './NewsCard';
import { NewsItem, CategoryFilter } from '@/lib/types';

interface NewsListProps {
  initialNews: NewsItem[];
  apiKey: string;
}

export default function NewsList({ initialNews, apiKey }: NewsListProps) {
  const [news, setNews] = useState<NewsItem[]>(initialNews);
  const [filter, setFilter] = useState<CategoryFilter>('all');
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const filters: { value: CategoryFilter; label: string }[] = [
    { value: 'all', label: 'All Stories' },
    { value: 'ai', label: 'Artificial Intelligence' },
    { value: 'tech', label: 'Technology' },
    { value: 'international', label: 'International' },
  ];

  const filteredNews = filter === 'all'
    ? news
    : news.filter((item) => item.category === filter);

  async function handleRefresh() {
    setIsLoading(true);
    try {
      const headers: HeadersInit = {};
      if (apiKey) {
        headers['x-api-key'] = apiKey;
      }

      const res = await fetch('/api/news?translate=true', { headers });
      if (res.ok) {
        const data = await res.json();
        setNews(data.news);
        setLastUpdated(new Date());
      }
    } catch (error) {
      console.error('Refresh error:', error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      {/* Filter Tabs and Refresh */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#adb3b2]/10">
        <div className="flex gap-6 overflow-x-auto no-scrollbar">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`pb-2 text-xs font-semibold tracking-wide whitespace-nowrap transition-colors border-b-2 ${
                filter === f.value
                  ? 'border-[#6e5773] text-[#2d3433]'
                  : 'border-transparent text-[#5a6060] hover:text-[#2d3433]'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[9px] uppercase tracking-widest text-[#5a6060] font-medium hidden md:block">
            Last sync: {lastUpdated.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}
          </span>
          <button
            onClick={handleRefresh}
            disabled={isLoading}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all text-xs ${
              isLoading
                ? 'bg-[#f2f4f3] text-[#5a6060] cursor-not-allowed'
                : 'bg-[#6e5773] text-[#fff5fc] hover:bg-[#614b66] active:scale-95'
            }`}
          >
            <span className="material-symbols-outlined text-sm">
              {isLoading ? 'progress_activity' : 'refresh'}
            </span>
            {isLoading ? 'Updating...' : 'Update Dispatch'}
          </button>
        </div>
      </div>

      {/* Stats */}
      <p className="text-[10px] text-[#5a6060] mb-8">
        {filteredNews.length} stories • {filter === 'all' ? 'All categories' : filters.find(f => f.value === filter)?.label}
      </p>

      {/* News List */}
      {filteredNews.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-[#5a6060] text-sm">No stories available</p>
        </div>
      ) : (
        <div>
          {filteredNews.map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
