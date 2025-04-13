import { NextRequest } from "next/server";
import translate from "google-translate-api-x";

function forceChunk(text: string, chunkSize: number): string[] {
  const chunks = [];
  let start = 0;
  while (start < text.length) {
    chunks.push(text.slice(start, start + chunkSize));
    start += chunkSize;
  }
  return chunks;
}

function smartChunk(text: string, maxChunkSize: number): string[] {
  const sentences = text.split(/(?<=[.؟!])\s+/);
  const chunks: string[] = [];
  let current = "";

  for (const sentence of sentences) {
    if ((current + sentence).length <= maxChunkSize) {
      current += (current ? " " : "") + sentence;
    } else {
      if (current) chunks.push(current);
      current = sentence;
    }
  }

  if (current) chunks.push(current);

  // fallback: if any chunk is still too long, break it forcefully
  const finalChunks: string[] = [];
  for (const chunk of chunks) {
    if (chunk.length > maxChunkSize) {
      finalChunks.push(...forceChunk(chunk, maxChunkSize));
    } else {
      finalChunks.push(chunk);
    }
  }

  return finalChunks;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { text } = body;

    if (!text) {
      return new Response(JSON.stringify({ error: "Missing text" }), {
        status: 400,
      });
    }

    const isArabic = /[\u0600-\u06FF]/.test(text);
    const targetLang = isArabic ? "en" : "ar";

    const chunks = smartChunk(text, 400);
    const results: string[] = [];

    for (const part of chunks) {
      const result = await translate(part, { to: targetLang });
      results.push(result.text);
    }

    const translatedText = results.join(" ").replace(/\s+/g, " ").trim();

    return new Response(JSON.stringify({ translatedText }), { status: 200 });
  } catch (error: any) {
    console.error("❌ Translation error:", error?.message || error);
    return new Response(
      JSON.stringify({ error: "Translation failed", details: error?.message }),
      { status: 500 }
    );
  }
}
