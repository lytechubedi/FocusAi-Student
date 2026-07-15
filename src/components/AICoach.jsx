'use client'

import { useState } from 'react'

export default function AICoach() {
  const [subject, setSubject] = useState('')
  const [timeAvailable, setTimeAvailable] = useState('2')
  const [examDate, setExamDate] = useState('')
  const [advice, setAdvice] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!subject.trim()) return

    setLoading(true)
    setAdvice('')

    try {
      const res = await fetch('/api/coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject, timeAvailable, examDate }),
      })
      const data = await res.json()
      setAdvice(data.advice || 'Erreur lors de la génération du conseil.')
    } catch (error) {
      setAdvice('Erreur de connexion. Réessaie.')
    }

    setLoading(false)
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-white mb-2">Coach IA 🎓</h2>
      <p className="text-gray-400 text-sm mb-6">
        Dis-moi ce que tu révises, je te fais un plan.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <input
          type="text"
          placeholder="Ex: Physique - Mécanique"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Heures disponibles aujourd'hui</label>
            <select
              value={timeAvailable}
              onChange={(e) => setTimeAvailable(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="1">1 heure</option>
              <option value="2">2 heures</option>
              <option value="4">4 heures</option>
              <option value="6">6+ heures</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Date examen (optionnel)</label>
            <input
              type="date"
              value={examDate}
              onChange={(e) => setExamDate(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-4 rounded-lg transition disabled:opacity-50"
        >
          {loading ? 'Génération...' : 'Générer mon plan 🚀'}
        </button>
      </form>

      {advice && (
        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-blue-500/30">
          <p className="text-white whitespace-pre-line leading-relaxed">{advice}</p>
        </div>
      )}
    </div>
  )
}
