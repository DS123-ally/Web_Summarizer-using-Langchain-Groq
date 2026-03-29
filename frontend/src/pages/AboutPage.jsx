export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-20">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <p className="mb-4 inline-block rounded-full bg-white/10 px-4 py-2 text-sm font-semibold uppercase tracking-wide text-blue-300">
            About the Project
          </p>
          <h1 className="mb-6 text-4xl font-bold text-white md:text-5xl">
            AI-Powered Website
            <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Intelligence Platform
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-xl text-slate-300">
            A demonstration of cutting-edge AI technology combining LangChain, Groq, and RAG architecture
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-12">
          {/* Project Overview */}
          <section className="glow-card p-8">
            <h2 className="mb-6 text-2xl font-bold text-white">Project Overview</h2>
            <div className="space-y-4 text-slate-300">
              <p className="text-lg">
                This application showcases the power of Retrieval-Augmented Generation (RAG) by transforming
                any website into an interactive, AI-powered knowledge base. Users can summarize web content,
                ask questions, and receive grounded answers based on the actual source material.
              </p>
              <p>
                Built as a full-stack application, it demonstrates modern AI engineering practices with
                a focus on speed, accuracy, and user experience.
              </p>
            </div>
          </section>

          {/* Technology Stack */}
          <section className="glow-card p-8">
            <h2 className="mb-6 text-2xl font-bold text-white">Technology Stack</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="mb-3 text-lg font-semibold text-blue-300">Frontend</h3>
                <ul className="space-y-2 text-slate-300">
                  <li>• React 18 with modern hooks</li>
                  <li>• Tailwind CSS for styling</li>
                  <li>• React Router for navigation</li>
                  <li>• Framer Motion for animations</li>
                  <li>• Vite for fast development</li>
                </ul>
              </div>
              <div>
                <h3 className="mb-3 text-lg font-semibold text-blue-300">Backend</h3>
                <ul className="space-y-2 text-slate-300">
                  <li>• FastAPI (Python async framework)</li>
                  <li>• LangChain for AI orchestration</li>
                  <li>• Groq for ultra-fast LLM inference</li>
                  <li>• FAISS for vector similarity search</li>
                  <li>• MongoDB for persistent storage</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Key Features */}
          <section className="glow-card p-8">
            <h2 className="mb-6 text-2xl font-bold text-white">Key Capabilities</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[
                'Intelligent web content extraction',
                'Semantic embedding generation',
                'Multi-query RAG implementation',
                'Flexible summarization strategies',
                'Persistent vector memory',
                'Real-time conversational AI',
                'RESTful API architecture',
                'Modern responsive UI/UX'
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-3 text-slate-300">
                  <span className="h-2 w-2 rounded-full bg-blue-400" />
                  {feature}
                </div>
              ))}
            </div>
          </section>

          {/* Architecture */}
          <section className="glow-card p-8">
            <h2 className="mb-6 text-2xl font-bold text-white">Architecture Highlights</h2>
            <div className="space-y-4 text-slate-300">
              <div>
                <h3 className="mb-2 text-lg font-semibold text-blue-300">RAG Pipeline</h3>
                <p>
                  Implements a complete RAG workflow: content ingestion → chunking → embedding →
                  vector storage → retrieval → generation. Uses FAISS for efficient similarity search
                  and MongoDB for metadata persistence.
                </p>
              </div>
              <div>
                <h3 className="mb-2 text-lg font-semibold text-blue-300">AI Integration</h3>
                <p>
                  Leverages Groq's LPU technology for sub-second inference times, combined with
                  LangChain's modular architecture for flexible AI workflows and prompt engineering.
                </p>
              </div>
              <div>
                <h3 className="mb-2 text-lg font-semibold text-blue-300">Scalability</h3>
                <p>
                  Designed for horizontal scaling with async processing, connection pooling, and
                  efficient caching strategies to handle multiple concurrent users and large websites.
                </p>
              </div>
            </div>
          </section>

          {/* Future Enhancements */}
          <section className="glow-card p-8">
            <h2 className="mb-6 text-2xl font-bold text-white">Future Enhancements</h2>
            <div className="space-y-3 text-slate-300">
              <p>• Multi-language support for international websites</p>
              <p>• Advanced filtering and content categorization</p>
              <p>• Integration with additional AI models and providers</p>
              <p>• Real-time collaborative features</p>
              <p>• Advanced analytics and usage insights</p>
              <p>• Mobile application development</p>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}