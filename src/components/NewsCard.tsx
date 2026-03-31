'use client';

import { NewsItem } from '@/lib/types';

interface NewsCardProps {
  item: NewsItem;
}

function timeAgo(timestamp: number): string {
  const seconds = Math.floor(Date.now() / 1000 - timestamp);
  if (seconds < 3600) return `${Math.floor(seconds / 60)}分钟前`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}小时前`;
  return `${Math.floor(seconds / 86400)}天前`;
}

function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    ai: 'AI',
    tech: '科技',
    international: '国际',
  };
  return labels[category] || category;
}

function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    ai: 'bg-purple-100 text-purple-800',
    tech: 'bg-blue-100 text-blue-800',
    international: 'bg-green-100 text-green-800',
  };
  return colors[category] || 'bg-gray-100 text-gray-800';
}

export default function NewsCard({ item }: NewsCardProps) {
  const displayTitle = item.isTranslated && item.translatedTitle
    ? item.translatedTitle
    : item.title;
  const displaySummary = item.isTranslated && item.translatedSummary
    ? item.translatedSummary
    : item.summary;

  return (
    <div className="bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 flex-1">
          {displayTitle}
        </h3>
        <span className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getCategoryColor(item.category)}`}>
          {getCategoryLabel(item.category)}
        </span>
      </div>

      <p className="text-gray-600 text-sm mb-3 line-clamp-3">
        {displaySummary}
      </p>

      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center gap-2">
          <span className="font-medium">
            {item.source === 'hackernews' ? 'Hacker News' : 'Reddit'}
          </span>
          <span>•</span>
          <span>{timeAgo(item.publishedAt)}</span>
          {item.isTranslated && (
            <>
              <span>•</span>
              <span className="text-blue-600">已翻译</span>
            </>
          )}
        </div>
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          查看原文 →
        </a>
      </div>
    </div>
  );
}
