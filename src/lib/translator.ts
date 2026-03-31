const MINIMAX_API_URL = 'https://api.minimaxi.com/v1/text/chatcompletion_v2';

export async function translateToChinese(
  text: string,
  apiKey: string
): Promise<string> {
  if (!text || text.trim().length === 0) return text;

  const truncatedText = text.slice(0, 2000);

  try {
    const response = await fetch(MINIMAX_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'M2-her',
        max_completion_tokens: 1024,
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
      console.error('MiniMax API error:', response.status, errorData);
      return text;
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || text;
  } catch (error) {
    console.error('Translation error:', error);
    return text;
  }
}

export function containsChinese(text: string): boolean {
  return /[\u4e00-\u9fa5]/.test(text);
}
