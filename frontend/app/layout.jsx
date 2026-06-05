import '../src/index.css';
import Providers from './Providers';

export const metadata = {
  title: 'Web Summarizer',
  description: 'AI powered summarizer using Langchain and Groq',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-900 text-white antialiased min-h-screen transition-colors duration-300 selection:bg-blue-500/30">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
