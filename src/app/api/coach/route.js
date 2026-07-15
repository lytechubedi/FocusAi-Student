export async function POST(request) {
  try {
    const { subject, timeAvailable, examDate } = await request.json()

    const prompt = `Tu es un coach d'étude pour un étudiant africain francophone.
Sujet: ${subject}
Temps disponible aujourd'hui: ${timeAvailable} heures
Date d'examen: ${examDate || 'non précisée'}

Donne un plan d'étude court et concret (max 100 mots) en français, motivant et pratique. Structure le temps en blocs Pomodoro (25 min). Sois direct et actionnable.`

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
          generationConfig: {
            maxOutputTokens: 300,
            temperature: 0.7,
          },
        }),
      }
    )

    const data = await response.json()

    if (!response.ok) {
      console.error('Gemini API error:', data)
      return Response.json(
        { advice: 'Le coach est un peu occupé, réessaie dans quelques secondes.' },
        { status: 200 }
      )
    }

    const advice =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      'Pas de conseil disponible pour le moment.'

    return Response.json({ advice })
  } catch (error) {
    console.error('Coach API error:', error)
    return Response.json(
      { advice: 'Erreur lors de la génération du conseil. Réessaie.' },
      { status: 200 }
    )
  }
}
