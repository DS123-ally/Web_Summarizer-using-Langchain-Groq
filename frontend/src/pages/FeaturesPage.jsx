import { Link } from 'react-router-dom'

const features = [
  {
    title: 'Intelligent Content Extraction',
    description: 'Advanced web scraping with smart content detection, automatic HTML parsing, and noise filtering to extract only the meaningful content from any website.',
    icon: '🔍',
    details: [
      'Automatic HTML cleaning and content extraction',
      'Smart detection of main content vs navigation/ads',
      'Support for dynamic JavaScript-rendered content',
      'Multi-format output (text, markdown, structured data)'
    ]
  },
  {
    title: 'LangChain-Powered Processing',
    description: 'Built on LangChain\'s robust framework with custom chains optimized for website analysis, document processing, and conversational AI workflows.',
    icon: '🔗',
    details: [
      'Modular chain architecture for flexible processing',
      'Custom document loaders for web content',
      'Advanced text splitting and chunking strategies',
      'Integration with multiple AI models and providers'
    ]
  },
  {
    title: 'Groq Ultra-Fast Inference',
    description: 'Leverage Groq\'s cutting-edge LPU technology for lightning-fast AI inference, enabling real-time website analysis and instant responses.',
    icon: '⚡',
    details: [
      'Sub-second response times for all operations',
      'Optimized for large language models',
      'Cost-effective high-performance computing',
      'Seamless integration with existing workflows'
    ]
  },
  {
    title: 'RAG Architecture',
    description: 'Retrieval-Augmented Generation ensures answers are grounded in source material, providing accurate, contextual responses to your questions.',
    icon: '🎯',
    details: [
      'Multi-query retrieval for comprehensive answers',
      'Semantic search across website content',
      'Context-aware response generation',
      'Reduces hallucinations and improves accuracy'
    ]
  },
  {
    title: 'Persistent Vector Memory',
    description: 'FAISS vector database with MongoDB integration provides persistent storage, enabling instant responses for repeated queries and cross-session memory.',
    icon: '🧠',
    details: [
      'Persistent FAISS indexes across sessions',
      'MongoDB integration for metadata storage',
      'Efficient similarity search algorithms',
      'Scalable vector storage and retrieval'
    ]
  },
  {
    title: 'Flexible Summary Strategies',
    description: 'Choose from multiple summarization approaches - extractive, abstractive, or hybrid methods - tailored to different content types and use cases.',
    icon: '📝',
    details: [
      'Stuff: Simple concatenation for short content',
      'Map-Reduce: Parallel processing for large documents',
      'Refine: Iterative improvement for complex content',
      'Custom strategies for specialized needs'
    ]
  },
  {
    title: 'Conversational AI Interface',
    description: 'Natural language interface for asking questions about website content, with context-aware follow-up questions and multi-turn conversations.',
    icon: '💬',
    details: [
      'Natural language query processing',
      'Context-aware conversation memory',
      'Multi-turn dialogue support',
      'Intelligent question routing and answering'
    ]
  },
  {
    title: 'Batch Processing & APIs',
    description: 'Process multiple websites simultaneously with RESTful APIs, webhooks, and batch processing capabilities for enterprise-scale operations.',
    icon: '📊',
    details: [
      'RESTful API endpoints for all features',
      'Batch processing for multiple URLs',
      'Webhook integrations for automation',
      'Rate limiting and queue management'
    ]
  }
]

export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-20">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <p className="mb-4 inline-block rounded-full bg-white/10 px-4 py-2 text-sm font-semibold uppercase tracking-wide text-blue-300">
            Powerful Features
          </p>
          <h1 className="mb-6 text-4xl font-bold text-white md:text-5xl">
            Everything You Need for
            <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              AI Website Intelligence
            </span>
          </h1>
          <p className="mx-auto max-w-3xl text-xl text-slate-300">
            Comprehensive toolkit for website analysis, content summarization, and AI-powered insights
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-8 md:grid-cols-2">
          {features.map((feature, index) => (
            <article key={index} className="glow-card group overflow-hidden p-8 hover:scale-105 transition-transform">
              <div className="mb-6 flex items-center gap-4">
                <div className="text-4xl">{feature.icon}</div>
                <h3 className="text-2xl font-bold text-white">{feature.title}</h3>
              </div>

              <p className="mb-6 text-slate-300 text-lg">{feature.description}</p>

              <ul className="space-y-2">
                {feature.details.map((detail, detailIndex) => (
                  <li key={detailIndex} className="flex items-start gap-3 text-slate-400">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                    {detail}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <div className="glow-card mx-auto max-w-2xl p-8">
            <h2 className="mb-4 text-2xl font-bold text-white">
              Ready to Experience These Features?
            </h2>
            <p className="mb-6 text-slate-300">
              Start analyzing websites with AI-powered intelligence today
            </p>
            <Link
              to="/"
              className="neon-btn inline-block px-8 py-3"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}