import { useState } from 'react';

// Imported articles
import article1 from '../data/articles/article1.md?raw';
import article2 from '../data/articles/article2.md?raw';
import article3 from '../data/articles/article3.md?raw';

interface ForumPost {
  id: number;
  author: string;
  timestamp: string;
  content: string;
  likes: number;
}

const articles = [
  {
    id: 1,
    title: 'The New Gold Rush - How Generative AI is Creating a Power Elite',
    excerpt: 'Generative artificial intelligence has burst onto the world stage not as a simple technological innovation, but as a transformative force with the power to redefine economies, cultures, and power structures.',
    content: article1,
    date: 'December 15, 2025',
    author: 'AIonXC Research'
  },
  {
    id: 2,
    title: 'The Black Box Dilemma - Can We Trust an AI We Don\'t Understand?',
    excerpt: 'Artificial intelligence is making increasingly critical decisions in our lives, from medical diagnoses and loan applications to content moderation and surveillance.',
    content: article2,
    date: 'December 15, 2025',
    author: 'AIonXC Research'
  },
  {
    id: 3,
    title: 'The Hidden Cost of "Free" - How AI is Turning Our Data into Corporate Power',
    excerpt: 'In the digital economy, one maxim has proven true time and again: if you\'re not paying for the product, you are the product.',
    content: article3,
    date: 'December 15, 2025',
    author: 'AIonXC Research'
  }
];

const mockForumPosts: ForumPost[] = [
  {
    id: 1,
    author: 'Elena M.',
    timestamp: '2 hours ago',
    content: 'Anyone else worried about how OpenAI is hoarding all the AI talent? They\'re hiring all the best researchers and leaving universities without resources.',
    likes: 24
  },
  {
    id: 2,
    author: 'Carlos R.',
    timestamp: '5 hours ago',
    content: 'The article about the "black box" is brilliant. I worked at an AI startup and can confirm that not even the engineers fully understand why models make certain decisions.',
    likes: 18
  }
];

export default function MagazinePage() {
  const [selectedArticle, setSelectedArticle] = useState<number | null>(null);
  const [forumPosts, setForumPosts] = useState<ForumPost[]>(mockForumPosts);
  const [newPost, setNewPost] = useState('');

  const handleSubmitPost = () => {
    if (newPost.trim()) {
      const post: ForumPost = {
        id: forumPosts.length + 1,
        author: 'Usuario Anónimo',
        timestamp: 'Ahora',
        content: newPost,
        likes: 0
      };
      setForumPosts([post, ...forumPosts]);
      setNewPost('');
    }
  };

  if (selectedArticle) {
    const article = articles.find(a => a.id === selectedArticle);
    if (!article) return null;

    return (
      <div className="min-h-screen bg-slate-950 text-slate-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => setSelectedArticle(null)}
            className="mb-6 text-primary-400 hover:text-primary-300 flex items-center gap-2"
          >
            ← Volver a Magazine & Research
          </button>
          
          <article className="prose prose-invert prose-lg max-w-none">
            <div className="mb-8">
              <p className="text-sm text-slate-400 mb-2">
                {article.author} | {article.date}
              </p>
            </div>
            
            <div 
              className="article-content"
              dangerouslySetInnerHTML={{ __html: article.content.replace(/^>$/gm, '').replace(/\n/g, '<br/>') }}
            />
          </article>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-2 text-center">Magazine & Research</h1>
        <p className="text-slate-400 text-center mb-12">
          Investigación profunda sobre el monopolio de la IA y su impacto en la sociedad
        </p>

        {/* Artículos */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {articles.map((article) => (
            <div
              key={article.id}
              className="bg-slate-900 border border-slate-800 rounded-lg p-6 hover:border-primary-500 transition-all cursor-pointer"
              onClick={() => setSelectedArticle(article.id)}
            >
              <h3 className="text-xl font-bold mb-3 text-primary-400">{article.title}</h3>
              <p className="text-sm text-slate-400 mb-4">
                {article.author} | {article.date}
              </p>
              <p className="text-slate-300 mb-4">{article.excerpt}</p>
              <button className="text-primary-400 hover:text-primary-300 font-semibold">
                Read more →
              </button>
            </div>
          ))}
        </div>

        {/* Community Forum */}
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-8">
          <h2 className="text-3xl font-bold mb-6">Community Forum</h2>
          <p className="text-slate-400 mb-6">
            Share your thoughts, concerns, and experiences about AI monopoly
          </p>

          {/* New post form */}
          <div className="mb-8">
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="Share your opinion about AI monopoly..."
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-4 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-primary-500 min-h-[120px]"
            />
            <button
              onClick={handleSubmitPost}
              className="mt-3 bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg font-semibold"
            >
              Publish
            </button>
          </div>

          {/* Forum posts */}
          <div className="space-y-4">
            {forumPosts.map((post) => (
              <div
                key={post.id}
                className="bg-slate-800 border border-slate-700 rounded-lg p-6"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="font-semibold text-primary-400">{post.author}</p>
                    <p className="text-sm text-slate-500">{post.timestamp}</p>
                  </div>
                  <button className="text-slate-400 hover:text-primary-400 flex items-center gap-1">
                    <span>👍</span>
                    <span>{post.likes}</span>
                  </button>
                </div>
                <p className="text-slate-200">{post.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
