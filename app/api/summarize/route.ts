import { NextRequest, NextResponse } from "next/server";

function isArabic(text: string) {
  const arabicPattern = /[\u0600-\u06FF]/;
  return arabicPattern.test(text);
}

function buildPrompt(text: string, language: "ar" | "en") {
  if (language === "ar") {
    return `
اكتب ملخصًا (Abstract) احترافيًا باللغة العربية الفصحى لمحتوى المشروع التالي.
يجب أن يكون الملخص بصيغة أكاديمية واضحة، كما يُكتب في الوثائق الرسمية والتقارير الجامعية.
استخدم أسلوبًا رسميًا منظمًا، دون استخدام ضمائر المتكلم أو السؤال.
ركّز على الأهداف، الفكرة العامة، التقنيات المستخدمة (إن وُجدت)، وأهمية المشروع.
تجنب التكرار أو الحشو، ويجب أن تكون الفقرة مختصرة ومباشرة، لا تتجاوز 5 أسطر.

النص:
${text}
    `.trim();
  } else {
    return `
Write a professional project abstract based on the following description.
The abstract should be concise, formal, and informative — suitable for academic documentation.
Focus on the project's objectives, core idea, technologies (if any), and significance.
Avoid questions, first-person language, or repetition. Keep it to 4–5 lines maximum.

Text:
${text}
    `.trim();
  }
}

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();
    const language = isArabic(text) ? "ar" : "en";
    const prompt = buildPrompt(text, language);

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    const result = await response.json();
    const summary = result?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!summary) throw new Error("No summary returned");

    return NextResponse.json({ summary });
  } catch (error) {
    console.error("❌ Gemini Summarization Error:", error);
    return NextResponse.json(
      { summary: "❌ لم نتمكن من توليد الملخص." },
      { status: 500 }
    );
  }
}
