'use client';

import { NewsItem } from '@/lib/types';

interface NewsCardProps {
  item: NewsItem;
}

function timeAgo(timestamp: number): string {
  const seconds = Math.floor(Date.now() / 1000 - timestamp);
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}

function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    ai: 'AI',
    tech: 'Tech',
    international: 'World',
  };
  return labels[category] || category;
}

export default function NewsCard({ item }: NewsCardProps) {
  const displayTitle = item.isTranslated && item.translatedTitle
    ? item.translatedTitle
    : item.title;
  const displaySummary = item.isTranslated && item.translatedSummary
    ? item.translatedSummary
    : item.summary;

  return (
    <article className="group bg-[#ffffff] rounded-lg p-5 hover:shadow-sm transition-shadow duration-200">
      {/* Meta info */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-[10px] font-bold text-[#6e5773] uppercase tracking-wider">
          {getCategoryLabel(item.category)}
        </span>
        <span className="w-1 h-1 bg-[#adb3b2] rounded-full"></span>
        <span className="text-[10px] text-[#5a6060]">
          {item.source === 'hackernews' ? 'HN' : 'Reddit'}
        </span>
        <span className="w-1 h-1 bg-[#adb3b2] rounded-full"></span>
        <span className="text-[10px] text-[#5a6060]">{timeAgo(item.publishedAt)}</span>
        {item.isTranslated && (
          <>
            <span className="w-1 h-1 bg-[#adb3b2] rounded-full"></span>
            <span className="text-[10px] text-[#6e5773]">CN</span>
          </>
        )}
      </div>

      {/* Title */}
      <h2 className="text-lg font-serif text-[#2d3433] leading-snug mb-3 group-hover:text-[#6e5773] transition-colors cursor-pointer line-clamp-2">
        {displayTitle}
      </h2>

      {/* Summary */}
      <p className="text-xs text-[#5a6060] leading-relaxed mb-4 line-clamp-3">
        {displaySummary}
      </p>

      {/* Source link */}
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[10px] uppercase tracking-widest text-[#6e5773] font-bold hover:text-[#614b66] transition-colors"
      >
        Read Article →
      </a>
    </article>
  );
}
