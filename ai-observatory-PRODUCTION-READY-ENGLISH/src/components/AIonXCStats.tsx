import { useEffect, useState } from 'react';

interface StatProps {
  value: string;
  label: string;
  description: string;
  icon: string;
  delay: number;
}

function AnimatedStat({ value, label, description, icon, delay }: StatProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`transform transition-all duration-1000 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}
    >
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 backdrop-blur-sm border-2 border-primary-500/30 rounded-xl p-6 hover:border-primary-400/50 transition-all hover:scale-105">
        <div className="text-5xl mb-3">{icon}</div>
        <div className="text-6xl font-bold bg-gradient-to-r from-primary-400 to-purple-600 bg-clip-text text-transparent mb-2">
          {value}
        </div>
        <h3 className="text-xl font-semibold text-primary-300 mb-2">
          {label}
        </h3>
        <p className="text-gray-300 text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

export default function AIonXCStats() {
  return (
    <div className="w-full max-w-7xl mx-auto my-16 px-4">
      {/* Section Title */}
      <div className="text-center mb-12">
        <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
          The Scale of Concentration
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Quantitative evidence of extreme power consolidation in the AI industry
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <AnimatedStat
          value="80%"
          label="AI Computing Power"
          description="Controlled by just 5 companies: Google, Amazon, Microsoft, Meta, and NVIDIA"
          icon="🖥️"
          delay={0}
        />
        
        <AnimatedStat
          value="70%"
          label="AI Chip Market"
          description="NVIDIA's dominance in AI-specific GPUs, creating massive barriers to entry"
          icon="💎"
          delay={200}
        />
        
        <AnimatedStat
          value="80%"
          label="Digital Data"
          description="Processed or stored by the top 5 tech giants, giving unparalleled training advantages"
          icon="📊"
          delay={400}
        />
        
        <AnimatedStat
          value="75%"
          label="Global AI Patents"
          description="Filed by US and China, concentrating innovation geographically"
          icon="📜"
          delay={600}
        />
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AnimatedStat
          value="70%"
          label="Startup Acquisitions"
          description="AI startups valued over $1B acquired by major tech companies (2020-2024)"
          icon="🏢"
          delay={800}
        />
        
        <AnimatedStat
          value="$1M+"
          label="Top AI Talent Salaries"
          description="Annual compensation for specialists at major tech companies, creating talent drain"
          icon="💰"
          delay={1000}
        />
        
        <AnimatedStat
          value="5"
          label="Companies Control All"
          description="OpenAI, Google, Microsoft, Anthropic, Meta develop most advanced LLMs"
          icon="🏛️"
          delay={1200}
        />
      </div>
    </div>
  );
}
