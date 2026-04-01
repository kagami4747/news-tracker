import { fetchAllNews } from '@/lib/newsFetcher';
import NewsList from '@/components/NewsList';
import { NewsItem } from '@/lib/types';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const news: NewsItem[] = await fetchAllNews();
  const apiKey = process.env.MINIMAX_API_KEY || '';

  return (
    <div className="min-h-screen bg-[#f9f9f8]">
      {/* Top Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#f9f9f8]/80 backdrop-blur-xl border-b border-[#2d3433]/5">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-2xl font-serif font-bold tracking-tight text-[#2d3433]">
                The Intellectual
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-[10px] text-[#5a6060] uppercase tracking-widest hidden md:block">
                AI & Global Tech Review
              </span>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-20 max-w-screen-2xl mx-auto px-6 lg:px-12 pb-16">
        {/* Hero Section */}
        <header className="mb-10">
          <div className="py-8 md:py-10">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-[0.95] mb-4 tracking-tight text-[#2d3433]">
                AI & Global Tech Review
              </h1>
              <div className="flex items-center gap-4">
                <div className="h-[1px] w-8 bg-[#2d3433]/40"></div>
                <p className="font-serif italic text-base md:text-lg text-[#5a6060]">
                  Curating the frontiers of synthetic cognition.
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* News Content */}
        <NewsList initialNews={news} apiKey={apiKey} />
      </main>

      {/* Footer */}
      <footer className="bg-[#f9f9f8] w-full py-8 px-8 border-t border-[#2d3433]/5">
        <div className="max-w-screen-2xl mx-auto flex justify-between items-center text-[10px] text-[#2d3433]/50">
          <p>Data: Hacker News • Reddit</p>
          <p className="font-serif italic text-[#6e5773]/40">Finis coronat opus.</p>
        </div>
      </footer>
    </div>
  );
}
