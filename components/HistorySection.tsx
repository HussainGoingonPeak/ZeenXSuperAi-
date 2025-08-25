
import React from 'react';
import type { HistoryItem } from '../types';

interface HistorySectionProps {
  history: HistoryItem[];
  onSelect: (item: HistoryItem) => void;
}

export const HistorySection: React.FC<HistorySectionProps> = ({ history, onSelect }) => {
  if (history.length === 0) {
    return null;
  }

  return (
    <div className="mt-12">
      <h3 className="text-2xl font-bold uppercase tracking-widest text-center mb-6 animate-pulse-glow">
        Generation History
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {history.map((item) => (
          <div
            key={item.id}
            className="relative aspect-square group cursor-pointer overflow-hidden border-2 border-lime-400/20 hover:border-lime-400 transition-all duration-300"
            onClick={() => onSelect(item)}
          >
            <img src={item.imageUrl} alt={item.prompt} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/80 flex items-center justify-center p-2 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="text-xs text-lime-300 line-clamp-3">"{item.prompt}"</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
