
import React from 'react';
import type { HistoryItem } from '../types';
import { Spinner } from './Spinner';
import { DownloadIcon } from './icons/DownloadIcon';
import { ShareIcon } from './icons/ShareIcon';

interface OutputSectionProps {
  generatedImage: HistoryItem | null;
  isLoading: boolean;
}

const ActionButton: React.FC<{
  onClick: () => void;
  children: React.ReactNode;
  disabled: boolean;
}> = ({ onClick, children, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className="flex-1 flex items-center justify-center gap-2 p-3 text-sm font-bold uppercase tracking-wider bg-black border-2 border-lime-400/50 text-lime-300 transition-all duration-300 hover:bg-lime-400/10 hover:border-lime-400 disabled:opacity-50 disabled:cursor-not-allowed"
  >
    {children}
  </button>
);


export const OutputSection: React.FC<OutputSectionProps> = ({ generatedImage, isLoading }) => {
  
  const handleDownload = () => {
    if (!generatedImage) return;
    const link = document.createElement('a');
    link.href = generatedImage.imageUrl;
    link.download = `zeenx-generated-${generatedImage.id}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const handleShare = async () => {
    if (!navigator.share || !generatedImage) {
        alert("Web Share API is not supported in your browser, or there's no image to share.");
        return;
    }
    try {
        const response = await fetch(generatedImage.imageUrl);
        const blob = await response.blob();
        const file = new File([blob], `zeenx-generated-${generatedImage.id}.png`, { type: 'image/png' });

        await navigator.share({
            title: 'AI Generated Image by ZeenXSuperAi',
            text: `Check out this image I generated with the prompt: "${generatedImage.prompt}"`,
            files: [file],
        });
    } catch (error) {
        console.error('Error sharing:', error);
    }
  };


  return (
    <div className="bg-lime-400/5 border border-lime-400/20 p-6 backdrop-blur-sm flex flex-col gap-4 h-full">
      <h2 className="text-2xl font-bold uppercase tracking-widest text-center animate-pulse-glow">Visual Output</h2>
      <div className="aspect-square w-full bg-black border-2 border-lime-400/50 flex items-center justify-center overflow-hidden">
        {isLoading && (
          <div className="text-center">
            <Spinner large={true} />
            <p className="mt-4 text-lime-400/80 animate-pulse">Engaging neural network...</p>
          </div>
        )}
        {!isLoading && !generatedImage && (
          <div className="text-center text-lime-400/50 p-4">
            <div className="text-6xl mb-4">🎭</div>
            <p>Your AI-generated masterpiece will appear here</p>
          </div>
        )}
        {generatedImage && (
           <div className="relative group w-full h-full">
            <img 
              src={generatedImage.imageUrl} 
              alt={generatedImage.prompt}
              className="w-full h-full object-contain" 
            />
            <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
              <p className="text-sm font-bold text-lime-300 line-clamp-3">"{generatedImage.prompt}"</p>
              <p className="text-xs text-lime-400/70 mt-1">Style: {generatedImage.style}</p>
            </div>
           </div>
        )}
      </div>
      <div className="flex gap-4">
        <ActionButton onClick={handleDownload} disabled={!generatedImage}>
          <DownloadIcon />
          <span>Download</span>
        </ActionButton>
        <ActionButton onClick={handleShare} disabled={!generatedImage || !navigator.share}>
          <ShareIcon />
          <span>Share</span>
        </ActionButton>
      </div>
    </div>
  );
};
