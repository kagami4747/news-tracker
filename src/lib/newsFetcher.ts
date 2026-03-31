import { NewsItem } from './types';

const HACKER_NEWS_API = 'https://hacker-news.firebaseio.com/v0';
const REDDIT_API = 'https://www.reddit.com/r';

const ONE_DAY_MS = 24 * 60 * 60 * 1000;

function isWithin24Hours(timestamp: number): boolean {
  return Date.now() - timestamp * 1000 < ONE_DAY_MS;
}

function generateId(source: string, index: number): string {
  return `${source}-${index}-${Date.now()}`;
}

async function fetchHackerNewsAI(): Promise<NewsItem[]> {
  const keywords = ['AI', 'artificial', 'intelligence', 'machine', 'learning', 'GPT', 'LLM', 'neural', 'deep learning'];

  try {
    const topStoriesRes = await fetch(`${HACKER_NEWS_API}/topstories.json`);
    const storyIds: number[] = await topStoriesRes.json();

    const recentStories = storyIds.slice(0, 100);
    const storyPromises = recentStories.map(async (id) => {
      try {
        const storyRes = await fetch(`${HACKER_NEWS_API}/item/${id}.json`);
        return await storyRes.json();
      } catch {
        return null;
      }
    });

    const stories = await Promise.all(storyPromises);

    return stories
      .filter((story): story is NonNullable<typeof story> => {
        if (!story || !story.title || !story.url) return false;
        const titleLower = story.title.toLowerCase();
        const matchesKeyword = keywords.some(k => titleLower.includes(k.toLowerCase()));
        const timeValid = isWithin24Hours(story.time);
        return matchesKeyword && timeValid;
      })
      .map((story, index) => ({
        id: generateId('hackernews', index),
        title: story.title,
        summary: story.text?.slice(0, 300) || `Discuss ${story.descendants || 0} comments`,
        url: story.url,
        source: 'hackernews' as const,
        category: 'ai' as const,
        publishedAt: story.time,
      }));
  } catch (error) {
    console.error('Error fetching Hacker News:', error);
    return [];
  }
}

async function fetchRedditNews(subreddit: string, category: 'ai' | 'tech' | 'international'): Promise<NewsItem[]> {
  try {
    const res = await fetch(
      `${REDDIT_API}/${subreddit}/hot.json?limit=25`,
      {
        headers: { 'User-Agent': 'NewsTrackerApp/1.0' },
        next: { revalidate: 300 },
      }
    );

    if (!res.ok) return [];

    const data = await res.json();
    const posts = data.data?.children || [];

    return posts
      .filter((post: { data: { created_utc: number; title: string; selftext: string; url: string } }) => {
        return isWithin24Hours(post.data.created_utc);
      })
      .map((post: { data: { created_utc: number; title: string; selftext: string; url: string } }, index: number) => ({
        id: generateId(`reddit-${subreddit}`, index),
        title: post.data.title,
        summary: post.data.selftext?.slice(0, 300) || 'View discussion on Reddit',
        url: post.data.url.startsWith('/') ? `https://reddit.com${post.data.url}` : post.data.url,
        source: 'reddit' as const,
        category,
        publishedAt: Math.floor(post.data.created_utc),
      }));
  } catch (error) {
    console.error(`Error fetching Reddit ${subreddit}:`, error);
    return [];
  }
}

export async function fetchAllNews(): Promise<NewsItem[]> {
  const [hnNews, aiNews, techNews, worldNews] = await Promise.all([
    fetchHackerNewsAI(),
    fetchRedditNews('MachineLearning', 'ai'),
    fetchRedditNews('technology', 'tech'),
    fetchRedditNews('worldnews', 'international'),
  ]);

  const allNews = [...hnNews, ...aiNews, ...techNews, ...worldNews];

  allNews.sort((a, b) => b.publishedAt - a.publishedAt);

  return allNews.slice(0, 50);
}
