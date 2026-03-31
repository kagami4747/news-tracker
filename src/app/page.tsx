import { fetchAllNews } from '@/lib/newsFetcher';
import NewsList from '@/components/NewsList';
import { NewsItem } from '@/lib/types';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const news: NewsItem[] = await fetchAllNews();
  const apiKey = process.env.ANTHROPIC_API_KEY || '';

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🔥</span>
            <h1 className="text-2xl font-bold text-gray-900">
              AI/科技/热点新闻追踪
            </h1>
          </div>
          <p className="mt-2 text-gray-600">
            追踪国内外最新的AI、科技以及热点事件资讯
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <NewsList initialNews={news} apiKey={apiKey} />
      </main>

      <footer className="bg-white border-t mt-auto">
        <div className="max-w-6xl mx-auto px-4 py-4 text-center text-sm text-gray-500">
          数据来源: Hacker News • Reddit | 每5分钟自动缓存
        </div>
      </footer>
    </div>
  );
}
