import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { motion } from 'framer-motion'
import { api } from '../lib/api'

export default function DashboardPage() {
  const [url, setUrl] = useState('')
  const [strategy, setStrategy] = useState('stuff')
  const [summaryLength, setSummaryLength] = useState('medium')
  const [customLength, setCustomLength] = useState('')
  const [summary, setSummary] = useState('')
  const [summaryMeta, setSummaryMeta] = useState(null)
  const [question, setQuestion] = useState('')
  const [messages, setMessages] = useState([])
  const [loadingSummary, setLoadingSummary] = useState(false)
  const [loadingChat, setLoadingChat] = useState(false)
  const [loadingHistory, setLoadingHistory] = useState(false)
  const [recentChats, setRecentChats] = useState([])
  const [error, setError] = useState('')

  async function loadHistory() {
    setLoadingHistory(true)
    try {
      const data = await api.chatHistory()
      setRecentChats(data.items || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoadingHistory(false)
    }
  }

  useEffect(() => {
    loadHistory()
  }, [])

  async function handleSummarize() {
    setError('')
    setLoadingSummary(true)
    try {
      const data = await api.summarize({
        url,
        strategy,
        summary_length: customLength ? Number(customLength) : summaryLength,
      })
      setSummary(data.summary || '')
      setSummaryMeta(data)
      toast.success(data.cached ? 'Loaded cached summary' : 'Summary generated')
    } catch (err) {
      setError(err.message)
      toast.error(err.message || 'Summarization failed')
    } finally {
      setLoadingSummary(false)
    }
  }

  async function handleAsk() {
    if (!question.trim()) return
    const q = question.trim()
    setQuestion('')
    const next = [...messages, { role: 'user', content: q }]
    setMessages(next)
    setLoadingChat(true)
    setError('')
    try {
      const history = next.map((m) => `${m.role}: ${m.content}`)
      const data = await api.chat({ url, question: q, history })
      setMessages((prev) => [...prev, { role: 'assistant', content: data.answer }])
      toast.success('Answer ready')
      loadHistory()
    } catch (err) {
      setError(err.message)
      toast.error(err.message || 'Chat failed')
    } finally {
      setLoadingChat(false)
    }
  }

  return (
    <main className="mx-auto max-w-6xl p-4 md:p-6">
      <div className="mb-4">
        <h1 className="app-text text-3xl font-semibold">Dashboard</h1>
        <p className="app-muted text-sm">Summarize and chat with web content using RAG.</p>
      </div>

      <section className="glow-card space-y-3 p-4">
        <label className="app-muted text-sm font-medium">Website URL</label>
        <input
          className="app-input w-full rounded-lg px-3 py-2"
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
        />
        <div className="grid gap-3 md:grid-cols-3">
          <select
            className="app-input rounded-lg px-3 py-2"
            value={strategy}
            onChange={(e) => setStrategy(e.target.value)}
          >
            <option value="stuff">stuff</option>
            <option value="map_reduce">map_reduce</option>
            <option value="refine">refine</option>
          </select>
          <select
            className="app-input rounded-lg px-3 py-2"
            value={summaryLength}
            onChange={(e) => setSummaryLength(e.target.value)}
            disabled={Boolean(customLength)}
          >
            <option value="short">short</option>
            <option value="medium">medium</option>
            <option value="long">long</option>
          </select>
          <button
            onClick={handleSummarize}
            disabled={!url.trim() || loadingSummary}
            className="neon-btn disabled:opacity-60"
          >
            {loadingSummary ? 'Summarizing...' : 'Summarize'}
          </button>
        </div>
        <div className="mt-1">
          <input
            className="app-input w-full rounded-lg px-3 py-2"
            type="number"
            min="80"
            max="900"
            placeholder="Optional custom summary length in words (80-900)"
            value={customLength}
            onChange={(e) => setCustomLength(e.target.value)}
          />
        </div>
        {summaryMeta && (
          <p className="app-muted text-sm">
            Strategy: {summaryMeta.strategy} | Length: {summaryMeta.summary_length} | Cached:{' '}
            {summaryMeta.cached ? 'Yes' : 'No'}
          </p>
        )}
        {loadingSummary ? (
          <div className="space-y-2">
            <div className="h-4 w-full animate-pulse rounded bg-white/10" />
            <div className="h-4 w-5/6 animate-pulse rounded bg-white/10" />
            <div className="h-4 w-4/6 animate-pulse rounded bg-white/10" />
          </div>
        ) : summary ? (
          <pre className="app-panel whitespace-pre-wrap rounded-lg p-3 text-sm app-text">
            {summary}
          </pre>
        ) : null}
      </section>

      <section className="glow-card mt-4 p-4">
        <h2 className="app-text text-lg font-semibold">Chat with website</h2>
        <div className="app-panel my-3 h-72 overflow-y-auto rounded-lg p-3">
          {messages.length === 0 ? (
            <div className="grid h-full place-items-center text-center">
              <div>
                <div className="mx-auto mb-3 text-4xl">💬</div>
                <p className="app-muted text-sm">Ask a question about the URL content.</p>
              </div>
            </div>
          ) : (
            messages.map((m, i) => (
              <motion.div
                key={i}
                className="mb-2"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <p className="app-muted text-xs uppercase tracking-wide">{m.role}</p>
                <p className="app-text">{m.content}</p>
              </motion.div>
            ))
          )}
        </div>
        <div className="flex gap-2">
          <input
            className="app-input w-full rounded-lg px-3 py-2"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
            placeholder="Ask something..."
          />
          <button
            onClick={handleAsk}
            disabled={!url.trim() || !question.trim() || loadingChat}
            className="rounded-lg bg-emerald-500 px-4 py-2 font-medium text-white transition hover:bg-emerald-400 hover:shadow-[0_0_20px_rgba(16,185,129,0.45)] disabled:opacity-60"
          >
            {loadingChat ? 'Sending...' : 'Send'}
          </button>
        </div>
      </section>

      <section className="glow-card mt-4 p-4">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="app-text text-lg font-semibold">Recent chats</h2>
          <button
            onClick={loadHistory}
            className="app-input rounded-md px-2 py-1 text-xs"
          >
            Refresh
          </button>
        </div>
        {loadingHistory ? (
          <div className="space-y-2">
            <div className="h-12 animate-pulse rounded bg-white/10" />
            <div className="h-12 animate-pulse rounded bg-white/10" />
          </div>
        ) : recentChats.length === 0 ? (
          <div className="grid h-28 place-items-center rounded-lg border border-dashed border-white/15 app-muted">
            <div className="text-center">
              <div className="text-3xl">🗂️</div>
              <p className="text-sm">No chat history yet</p>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            {recentChats.map((c, idx) => (
              <div key={`${c.created_at}-${idx}`} className="app-panel rounded-lg p-3">
                <p className="app-muted line-clamp-1 text-xs">{c.url}</p>
                <p className="app-text line-clamp-1 text-sm">{c.question}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {error && <p className="mt-3 text-sm text-rose-400">{error}</p>}
    </main>
  )
}
