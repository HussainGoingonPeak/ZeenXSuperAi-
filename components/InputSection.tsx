
import React from 'react';
import { STYLES, DIMENSIONS } from '../constants';
import type { AspectRatio, GenerationStyle } from '../types';
import { Spinner } from './Spinner';

interface InputSectionProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  style: GenerationStyle;
  setStyle: (style: GenerationStyle) => void;
  aspectRatio: AspectRatio;
  setAspectRatio: (ratio: AspectRatio) => void;
  isLoading: boolean;
  error: string | null;
  onGenerate: () => void;
}

const CyberControlWrapper: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div className="flex-1">
    <label className="block text-sm font-bold uppercase tracking-wider mb-2 text-lime-400/80">{label}</label>
    {children}
  </div>
);

export const InputSection: React.FC<InputSectionProps> = ({
  prompt,
  setPrompt,
  style,
  setStyle,
  aspectRatio,
  setAspectRatio,
  isLoading,
  error,
  onGenerate,
}) => {
  return (
    <div className="bg-lime-400/5 border border-lime-400/20 p-6 space-y-6 backdrop-blur-sm">
      <h2 className="text-2xl font-bold uppercase tracking-widest text-center animate-pulse-glow">Neural Input</h2>
      
      <div>
        <label htmlFor="promptInput" className="block text-sm font-bold uppercase tracking-wider mb-2 text-lime-400/80">
          Prompt Matrix
        </label>
        <textarea
          id="promptInput"
          className="w-full h-32 p-3 bg-black border-2 border-lime-400/50 text-lime-300 focus:ring-2 focus:ring-lime-400 focus:border-lime-400 focus:outline-none transition-all duration-300 cyber-input"
          placeholder="Describe your vision to the AI..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          disabled={isLoading}
        />
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <CyberControlWrapper label="Generation Style">
          <select
            id="styleSelect"
            className="w-full p-3 bg-black border-2 border-lime-400/50 text-lime-300 focus:ring-2 focus:ring-lime-400 focus:border-lime-400 focus:outline-none transition-all duration-300 appearance-none bg-no-repeat bg-right-4"
            style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%2384cc16' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")` }}
            value={style.name}
            onChange={(e) => setStyle(STYLES.find(s => s.name === e.target.value) || STYLES[0])}
            disabled={isLoading}
          >
            {STYLES.map((s) => (
              <option key={s.name} value={s.name}>{s.name}</option>
            ))}
          </select>
        </CyberControlWrapper>

        <CyberControlWrapper label="Dimensions">
          <select
            id="dimensionSelect"
            className="w-full p-3 bg-black border-2 border-lime-400/50 text-lime-300 focus:ring-2 focus:ring-lime-400 focus:border-lime-400 focus:outline-none transition-all duration-300 appearance-none bg-no-repeat bg-right-4"
            style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%2384cc16' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")` }}
            value={aspectRatio}
            onChange={(e) => setAspectRatio(e.target.value as AspectRatio)}
            disabled={isLoading}
          >
            {DIMENSIONS.map((d) => (
              <option key={d.value} value={d.value}>{d.label}</option>
            ))}
          </select>
        </CyberControlWrapper>
      </div>

      <button
        id="generateButton"
        onClick={onGenerate}
        disabled={isLoading}
        className="w-full flex items-center justify-center gap-3 p-4 text-lg font-black text-black uppercase tracking-widest bg-lime-400 border-2 border-lime-400 transition-all duration-300 ease-in-out hover:bg-lime-300 hover:shadow-[0_0_30px_rgba(50,255,50,0.7)] disabled:bg-lime-400/50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <Spinner />
            <span>Generating...</span>
          </>
        ) : (
          <span>Generate Image</span>
        )}
      </button>

      {error && <p className="text-red-500 text-center text-sm mt-2">{error}</p>}
    </div>
  );
};
