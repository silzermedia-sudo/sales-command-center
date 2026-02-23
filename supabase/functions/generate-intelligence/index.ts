import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, company, website } = await req.json();

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const systemPrompt = `Du bist ein Sales-Intelligence-Analyst. Der Nutzer gibt dir einen Firmennamen, optional einen Ansprechpartner und eine Website.

Recherchiere basierend auf deinem Wissen öffentlich verfügbare Informationen und erstelle eine strukturierte Analyse. Antworte NUR mit validem JSON, ohne Markdown-Codeblöcke.

Verwende dieses exakte Schema:
{
  "company": {
    "industry": "string",
    "employees": "string (z.B. '50-200')",
    "revenue": "string (Schätzung oder 'Nicht bekannt')",
    "hq": "string",
    "locations": ["string"],
    "recentNews": [{"title": "string", "date": "string"}]
  },
  "buyingSignals": {
    "hiring": {"label": "string", "trend": "up|down|neutral"},
    "expansion": "string",
    "funding": "string",
    "socialSpikes": "string",
    "confidenceScore": number (0-100)
  },
  "openers": [
    {"type": "personalized|roi|provocative|trust", "text": "string"}
  ],
  "painPoints": [
    {"pain": "string", "question": "string", "objection": "string"}
  ],
  "guide": [
    {"phase": "string", "content": "string"}
  ],
  "locations": [
    {"name": "string", "lat": number, "lng": number, "type": "hq|office"}
  ]
}

Wichtig:
- Generiere 4-6 Call-Opener (mix aus personalized, roi, provocative, trust)
- Generiere 3-5 Pain Points mit passenden Fragen und möglichen Einwänden
- Generiere 4-6 Gesprächsleitfaden-Schritte
- Verwende den Ansprechpartner-Namen in personalisierten Openern
- Alle Texte auf Deutsch
- Sei realistisch und basiere alles auf typischen Brancheninformationen`;

    const userPrompt = `Firma: ${company || "Unbekannt"}
Ansprechpartner: ${name || "Nicht angegeben"}
Website: ${website || "Nicht angegeben"}

Erstelle eine vollständige Sales-Intelligence-Analyse.`;

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit erreicht. Bitte warte kurz und versuche es erneut." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI-Kontingent erschöpft. Bitte Credits aufladen." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error("AI gateway error");
    }

    const aiData = await response.json();
    const content = aiData.choices?.[0]?.message?.content;

    if (!content) throw new Error("No content from AI");

    // Parse JSON - handle potential markdown code blocks
    let parsed;
    try {
      const cleanContent = content.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
      parsed = JSON.parse(cleanContent);
    } catch (e) {
      console.error("Failed to parse AI response:", content);
      throw new Error("Failed to parse AI response");
    }

    return new Response(JSON.stringify(parsed), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("generate-intelligence error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
