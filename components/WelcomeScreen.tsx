
import React from 'react';

interface WelcomeScreenProps {
  onEnter: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onEnter }) => {
  return (
    <div className="h-screen w-screen bg-black flex items-center justify-center p-4 cyber-grid">
       <div className="absolute inset-0 bg-black/60"></div>
      <div className="text-center z-10 flex flex-col items-center">
        <div className="logo-container animate-pulse-glow mb-8">
          <h1 className="text-5xl md:text-8xl font-black text-lime-400 uppercase tracking-widest">
            ZeenXSuperAi
          </h1>
          <p className="text-lime-400/80 mt-2 text-lg md:text-xl tracking-wider">
            Next-Gen AI Image Generator
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mb-12">
          <FeatureCard icon="🎨" title="AI-Powered Creation" description="Transform your ideas into stunning visuals" />
          <FeatureCard icon="⚡" title="Real-time Generation" description="Instant results with advanced algorithms" />
          <FeatureCard icon="🚀" title="Futuristic Interface" description="Cyberpunk-inspired user experience" />
        </div>

        <button
          onClick={onEnter}
          className="cyber-button group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-lime-400 uppercase tracking-widest bg-black border-2 border-lime-400 overflow-hidden transition-all duration-300 ease-in-out hover:bg-lime-400 hover:text-black hover:shadow-[0_0_30px_rgba(50,255,50,0.7)]"
        >
          <span className="relative z-10">Enter The Matrix</span>
          <div className="absolute inset-0 bg-lime-400 opacity-0 transition-opacity duration-300 group-hover:opacity-20"></div>
        </button>
      </div>
    </div>
  );
};

interface FeatureCardProps {
    icon: string;
    title: string;
    description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
    <div className="bg-lime-400/5 border border-lime-400/20 p-6 text-center backdrop-blur-sm transition-all duration-300 hover:border-lime-400/50 hover:bg-lime-400/10 animate-pulse-glow">
        <div className="text-4xl mb-4">{icon}</div>
        <h3 className="text-xl font-bold mb-2 uppercase">{title}</h3>
        <p className="text-lime-400/70">{description}</p>
    </div>
)
