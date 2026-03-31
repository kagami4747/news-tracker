const ANTHROPIC_API_URL = 'https://api.anthropic.com/v1/messages';

export async function translateToChinese(
  text: string,
  apiKey: string
): Promise<string> {
  if (!text || text.trim().length === 0) return text;

  const truncatedText = text.slice(0, 2000);

  try {
    const response = await fetch(ANTHROPIC_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1024,
        messages: [
          {
            role: 'user',
            content: `Translate the following text to Simplified Chinese. Only provide the translation, no explanations.\n\nText: ${truncatedText}`,
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Translation API error:', response.status, errorData);
      return text;
    }

    const data = await response.json();
    return data.content?.[0]?.text || text;
  } catch (error) {
    console.error('Translation error:', error);
    return text;
  }
}

export function containsChinese(text: string): boolean {
  return /[\u4e00-\u9fa5]/.test(text);
}
