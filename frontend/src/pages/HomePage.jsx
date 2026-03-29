import { useState } from 'react'
import { Link } from 'react-router-dom'
import AuthModal from '../components/AuthModal'

export default function HomePage() {
  const [authModalOpen, setAuthModalOpen] = useState(false)

  return (
    <>
      <main className="min-h-screen bg-slate-950">
        {/* Hero Section */}
        <section className="relative overflow-hidden px-4 py-20 md:py-32">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-cyan-500/10" />
          <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="absolute -left-32 -bottom-32 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl" />

          <div className="relative mx-auto max-w-6xl text-center">
            <p className="mb-6 inline-block rounded-full bg-white/10 px-4 py-2 text-sm font-semibold uppercase tracking-wide text-blue-300">
              AI-Powered Website Intelligence
            </p>
            <h1 className="mb-6 text-4xl font-bold leading-tight text-white md:text-6xl lg:text-7xl">
              Website Summarizer
              <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                with RAG Architecture
              </span>
            </h1>
            <p className="mx-auto mb-8 max-w-3xl text-xl text-slate-300 md:text-2xl">
              Transform any website into actionable insights using LangChain, Groq AI, and persistent vector memory.
              Get instant summaries, ask questions, and explore content with AI-powered precision.
            </p>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <button
                onClick={() => setAuthModalOpen(true)}
                className="neon-btn text-lg px-8 py-4"
              >
                Start Summarizing Free
              </button>
              <Link
                to="/features"
                className="rounded-lg border border-white/20 px-6 py-3 font-semibold text-slate-200 hover:bg-white/10 transition-colors"
              >
                Explore Features
              </Link>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="px-4 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
                Powerful AI Capabilities
              </h2>
              <p className="text-xl text-slate-300">
                Everything you need to understand and analyze websites at scale
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: 'Lightning Fast Summaries',
                  description: 'Generate comprehensive website summaries in seconds using Groq\'s ultra-fast inference and persistent FAISS vector caching.',
                  icon: '⚡'
                },
                {
                  title: 'RAG-Powered Q&A',
                  description: 'Ask questions about any website content and get grounded answers from the actual source material, not hallucinations.',
                  icon: '🤖'
                },
                {
                  title: 'Multi-Strategy Analysis',
                  description: 'Choose from different summarization strategies - extractive, abstractive, or hybrid approaches for optimal results.',
                  icon: '🎯'
                },
                {
                  title: 'Persistent Memory',
                  description: 'Vector embeddings stored in FAISS indexes ensure instant responses for repeated queries and maintain context across sessions.',
                  icon: '🧠'
                },
                {
                  title: 'LangChain Integration',
                  description: 'Built on LangChain\'s robust framework with custom chains optimized for website content processing and analysis.',
                  icon: '🔗'
                },
                {
                  title: 'Batch Processing',
                  description: 'Process multiple websites simultaneously with intelligent queuing and parallel processing capabilities.',
                  icon: '📊'
                }
              ].map((feature, index) => (
                <article key={index} className="glow-card group p-6 hover:scale-105 transition-transform">
                  <div className="mb-4 text-4xl">{feature.icon}</div>
                  <h3 className="mb-3 text-xl font-semibold text-white">{feature.title}</h3>
                  <p className="text-slate-300">{feature.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="bg-slate-900/50 px-4 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
                How It Works
              </h2>
              <p className="text-xl text-slate-300">
                Simple workflow, powerful results
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {[
                {
                  step: '01',
                  title: 'Input Website URL',
                  description: 'Paste any website URL and our AI crawls, processes, and analyzes the content using advanced web scraping techniques.'
                },
                {
                  step: '02',
                  title: 'AI Processing',
                  description: 'LangChain orchestrates the workflow: content extraction, chunking, embedding generation, and vector storage in FAISS.'
                },
                {
                  step: '03',
                  title: 'Get Insights',
                  description: 'Receive instant summaries, ask questions, or explore the content with RAG-powered conversational AI responses.'
                }
              ].map((step, index) => (
                <div key={index} className="text-center">
                  <div className="mb-4 inline-block rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 px-4 py-2 text-2xl font-bold text-white">
                    {step.step}
                  </div>
                  <h3 className="mb-3 text-xl font-semibold text-white">{step.title}</h3>
                  <p className="text-slate-300">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 py-20">
          <div className="glow-card mx-auto max-w-4xl p-8 text-center md:p-12">
            <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
              Ready to Transform Website Analysis?
            </h2>
            <p className="mb-8 text-xl text-slate-300">
              Join thousands of users who are already using AI-powered website intelligence
            </p>
            <button
              onClick={() => setAuthModalOpen(true)}
              className="neon-btn text-lg px-8 py-4"
            >
              Get Started Now
            </button>
          </div>
        </section>
      </main>

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />
    </>
  )
}