import { NextResponse } from 'next/server';
import { fetchAllNews } from '@/lib/newsFetcher';
import { translateToChinese, containsChinese } from '@/lib/translator';
import { NewsItem } from '@/lib/types';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const forceTranslate = searchParams.get('translate') === 'true';
    const apiKey = request.headers.get('x-api-key') || process.env.MINIMAX_API_KEY || '';

    const news = await fetchAllNews();

    if (!apiKey) {
      return NextResponse.json({
        news,
        timestamp: Date.now(),
        warning: 'No API key provided, translations disabled',
      });
    }

    const translatedNews: NewsItem[] = await Promise.all(
      news.map(async (item) => {
        if (containsChinese(item.title) && containsChinese(item.summary)) {
          return item;
        }

        if (forceTranslate || item.source === 'reddit') {
          const [translatedTitle, translatedSummary] = await Promise.all([
            translateToChinese(item.title, apiKey),
            translateToChinese(item.summary, apiKey),
          ]);

          return {
            ...item,
            isTranslated: true,
            translatedTitle,
            translatedSummary,
          };
        }

        return item;
      })
    );

    return NextResponse.json({
      news: translatedNews,
      timestamp: Date.now(),
    });
  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json(
      { error: 'Failed to fetch news' },
      { status: 500 }
    );
  }
}
