export async function POST(request) {
  try {
    const { subject, timeAvailable, examDate } = await request.json()

    const prompt = `Tu es un coach d'étude pour un étudiant africain francophone.
Sujet: ${subject}
Temps disponible aujourd'hui: ${timeAvailable} heures
Date d'examen: ${examDate || 'non précisée'}

Donne un plan d'étude court et concret (max 100 mots) en français, motivant et pratique. Structure le temps en blocs Pomodoro (25 min). Sois direct et actionnable.`

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-5',
        max_tokens: 300,
        messages: [{ role: 'user', content: prompt }],
      }),
    })

    const data = await response.json()
    const advice = data.content?.[0]?.text || 'Pas de conseil disponible pour le moment.'

    return Response.json({ advice })
  } catch (error) {
    return Response.json({ error: 'Erreur lors de la génération du conseil' }, { status: 500 })
  }
}
