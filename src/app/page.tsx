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
              <div className="hidden lg:flex items-center bg-[#f2f4f3] px-3 py-1.5 rounded-lg">
                <span className="material-symbols-outlined text-[#5a6060] text-sm mr-2">search</span>
                <input
                  className="bg-transparent border-none focus:ring-0 text-sm w-48 font-sans text-[#2d3433]"
                  placeholder="Search..."
                  type="text"
                />
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-20 max-w-screen-2xl mx-auto px-6 lg:px-12">
        {/* Hero Section */}
        <header className="relative mb-10">
          <div className="py-8 md:py-12">
            <div className="max-w-3xl">
              <span className="text-[#6e5773] font-bold tracking-[0.2em] text-[10px] uppercase mb-2 block">
                Daily Edition
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-[0.95] mb-6 tracking-tighter text-[#2d3433]">
                AI & Global Tech Review
              </h1>
              <div className="flex items-center gap-4">
                <div className="h-[1px] w-8 bg-[#2d3433]/40"></div>
                <p className="font-serif italic text-lg md:text-xl text-[#2d3433]">
                  Curating the frontiers of synthetic cognition.
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Navigation Tabs */}
        <section className="mb-10 border-b border-[#adb3b2]/15">
          <div className="flex gap-8 overflow-x-auto no-scrollbar">
            <button className="pb-3 border-b-2 border-[#6e5773] text-[#2d3433] font-semibold text-xs tracking-wide whitespace-nowrap">
              Artificial Intelligence
            </button>
            <button className="pb-3 border-b-2 border-transparent text-[#5a6060] hover:text-[#2d3433] transition-colors text-xs tracking-wide whitespace-nowrap">
              Technology Strategy
            </button>
            <button className="pb-3 border-b-2 border-transparent text-[#5a6060] hover:text-[#2d3433] transition-colors text-xs tracking-wide whitespace-nowrap">
              International Affairs
            </button>
          </div>
        </section>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-x-12 pb-16">
          {/* Main Content Area */}
          <div className="md:col-span-8">
            <NewsList initialNews={news} apiKey={apiKey} />
          </div>

          {/* Sidebar */}
          <aside className="md:col-span-4 pl-0 md:pl-10 md:border-l border-[#adb3b2]/10">
            {/* Top Dispatches */}
            <div className="mb-10">
              <h4 className="text-[10px] font-bold text-[#2d3433] uppercase tracking-[0.3em] mb-6 border-b border-[#2d3433]/5 pb-2">
                Top Dispatches
              </h4>
              <ul className="space-y-6">
                {news.slice(0, 5).map((item, index) => (
                  <li key={item.id} className="flex gap-4">
                    <span className="text-xl font-serif text-[#dde4e3] italic">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h5 className="text-xs font-bold text-[#2d3433] mb-1 hover:text-[#6e5773] transition-colors cursor-pointer line-clamp-2">
                        {item.isTranslated && item.translatedTitle ? item.translatedTitle : item.title}
                      </h5>
                      <p className="text-[10px] text-[#5a6060]">
                        {item.source === 'hackernews' ? 'Hacker News' : 'Reddit'}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter Signup */}
            <div className="bg-[#f2f4f3] p-6 rounded-lg mb-10">
              <h4 className="text-[10px] font-bold text-[#6e5773] uppercase tracking-[0.2em] mb-3">
                Curated Intelligence
              </h4>
              <p className="text-[11px] text-[#5a6060] leading-relaxed mb-4">
                Get the daily digest of AI and tech insights.
              </p>
              <div className="flex flex-col gap-2">
                <input
                  className="bg-[#f9f9f8] text-xs border border-[#adb3b2]/20 px-3 py-2 rounded-lg focus:ring-1 focus:ring-[#6e5773] focus:border-[#6e5773] outline-none"
                  placeholder="Email address"
                  type="email"
                />
                <button className="bg-[#6e5773] text-[#fff5fc] py-2 rounded-lg text-xs font-medium hover:bg-[#614b66] transition-colors">
                  Subscribe
                </button>
              </div>
            </div>

            {/* Archive */}
            <div className="space-y-4">
              <h4 className="text-[10px] font-bold text-[#2d3433] uppercase tracking-[0.2em] mb-3">
                Quick Links
              </h4>
              <div className="p-3 bg-[#f2f4f3] rounded-lg hover:bg-[#ebeeed] transition-all cursor-pointer">
                <span className="material-symbols-outlined text-[#6e5773] mb-1 text-lg">history_edu</span>
                <p className="text-xs font-serif font-semibold italic text-[#2d3433]">
                  Hacker News Top Stories
                </p>
              </div>
              <div className="p-3 bg-[#f2f4f3] rounded-lg hover:bg-[#ebeeed] transition-all cursor-pointer">
                <span className="material-symbols-outlined text-[#6e5773] mb-1 text-lg">article</span>
                <p className="text-xs font-serif font-semibold italic text-[#2d3433]">
                  Reddit r/MachineLearning
                </p>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#f9f9f8] w-full py-10 px-8 border-t border-[#2d3433]/5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center max-w-screen-2xl mx-auto">
          <div className="space-y-3">
            <p className="max-w-xs text-[10px] leading-relaxed text-[#2d3433]/50">
              A chronicle of contemporary thought and the digital frontier. Published for the intellectually curious.
            </p>
            <div className="flex gap-4 text-[10px] text-[#2d3433]/50">
              <a className="hover:text-[#2d3433] transition-colors" href="#">Ethics</a>
              <a className="hover:text-[#2d3433] transition-colors" href="#">Privacy</a>
              <a className="hover:text-[#2d3433] transition-colors" href="#">About</a>
            </div>
          </div>
          <div className="md:text-right">
            <p className="text-[10px] text-[#2d3433]/50">Data: Hacker News • Reddit</p>
            <p className="mt-1 font-serif italic text-[#6e5773]/40 text-xs">Finis coronat opus.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
