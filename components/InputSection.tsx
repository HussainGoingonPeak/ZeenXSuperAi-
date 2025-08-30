
import React, { useState, useRef } from 'react';
import { STYLES, DIMENSIONS, ENHANCEMENT_STYLES } from '../constants';
import type { AspectRatio, GenerationStyle, EnhancementStyle } from '../types';
import { Spinner } from './Spinner';
import { EnhanceIcon } from './icons/EnhanceIcon';
import { UploadIcon } from './icons/UploadIcon';
import { CloseIcon } from './icons/CloseIcon';
import { enhancePrompt as enhancePromptService } from '../services/geminiService';

interface InputSectionProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  style: GenerationStyle;
  setStyle: (style: GenerationStyle) => void;
  aspectRatio: AspectRatio;
  setAspectRatio: (ratio: AspectRatio) => void;
  isLoading: boolean;
  isUpscaling: boolean;
  error: string | null;
  onGenerate: () => void;
  uploadedImage: string | null;
  setUploadedImage: (image: string | null) => void;
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
  isUpscaling,
  error,
  onGenerate,
  uploadedImage,
  setUploadedImage,
}) => {
  const [isEnhancing, setIsEnhancing] = useState<boolean>(false);
  const [enhancementStyle, setEnhancementStyle] = useState<EnhancementStyle>('Detailed');
  const [enhancementError, setEnhancementError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleEnhance = async () => {
      if (!prompt.trim()) {
          setEnhancementError('Please enter a prompt to enhance.');
          return;
      }
      setIsEnhancing(true);
      setEnhancementError(null);
      try {
          const enhanced = await enhancePromptService(prompt, enhancementStyle);
          setPrompt(enhanced);
      } catch (err) {
          setEnhancementError(err instanceof Error ? err.message : 'An unknown error occurred during enhancement.');
      } finally {
          setIsEnhancing(false);
      }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
      };
      reader.onerror = () => {
        setEnhancementError("Failed to read the image file.");
      };
      reader.readAsDataURL(file);
    }
    if (event.target) {
      event.target.value = '';
    }
  };

  const controlsDisabled = isLoading || isEnhancing || isUpscaling;

  return (
    <div className="bg-lime-400/5 border border-lime-400/20 p-6 space-y-6 backdrop-blur-sm">
      <h2 className="text-2xl font-bold uppercase tracking-widest text-center animate-pulse-glow">Neural Input</h2>
      
      <div>
        <label htmlFor="promptInput" className="block text-sm font-bold uppercase tracking-wider mb-2 text-lime-400/80">
          {uploadedImage ? 'Describe Your Edit' : 'Prompt Matrix'}
        </label>
        <textarea
          id="promptInput"
          className="w-full h-32 p-3 bg-black border-2 border-lime-400/50 text-lime-300 focus:ring-2 focus:ring-lime-400 focus:border-lime-400 focus:outline-none transition-all duration-300 cyber-input"
          placeholder={uploadedImage ? "e.g., 'add a futuristic helmet'" : "Describe your vision to the AI..."}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          disabled={controlsDisabled}
        />
      </div>

      {uploadedImage ? (
        <div className="relative w-32 h-32 mx-auto border-2 border-lime-400/50 p-1">
          <img src={uploadedImage} alt="Uploaded preview" className="w-full h-full object-cover" />
          <button 
              onClick={() => setUploadedImage(null)}
              className="absolute -top-3 -right-3 bg-black rounded-full p-1 border border-lime-400 text-lime-400 hover:bg-lime-400 hover:text-black transition-colors"
              aria-label="Remove uploaded image"
          >
              <CloseIcon />
          </button>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row gap-4">
          <CyberControlWrapper label="Generation Style">
            <select
              id="styleSelect"
              className="w-full p-3 bg-black border-2 border-lime-400/50 text-lime-300 focus:ring-2 focus:ring-lime-400 focus:border-lime-400 focus:outline-none transition-all duration-300 appearance-none bg-no-repeat bg-right-4 hover:border-lime-400 hover:shadow-[0_0_10px_rgba(50,255,50,0.4)]"
              style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%2384cc16' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")` }}
              value={style.name}
              onChange={(e) => setStyle(STYLES.find(s => s.name === e.target.value) || STYLES[0])}
              disabled={controlsDisabled}
            >
              {STYLES.map((s) => (
                <option key={s.name} value={s.name}>{s.name}</option>
              ))}
            </select>
          </CyberControlWrapper>

          <CyberControlWrapper label="Dimensions">
            <select
              id="dimensionSelect"
              className="w-full p-3 bg-black border-2 border-lime-400/50 text-lime-300 focus:ring-2 focus:ring-lime-400 focus:border-lime-400 focus:outline-none transition-all duration-300 appearance-none bg-no-repeat bg-right-4 hover:border-lime-400 hover:shadow-[0_0_10px_rgba(50,255,50,0.4)]"
              style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%2384cc16' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")` }}
              value={aspectRatio}
              onChange={(e) => setAspectRatio(e.target.value as AspectRatio)}
              disabled={controlsDisabled}
            >
              {DIMENSIONS.map((d) => (
                <option key={d.value} value={d.value}>{d.label}</option>
              ))}
            </select>
          </CyberControlWrapper>
        </div>
      )}
      
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            id="uploadButton"
            onClick={handleUploadClick}
            disabled={controlsDisabled}
            className="w-full flex items-center justify-center gap-3 p-3 text-base font-bold text-lime-400 uppercase tracking-widest bg-transparent border-2 border-lime-400/50 transition-all duration-300 ease-in-out hover:bg-lime-400/10 hover:border-lime-400 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <UploadIcon />
            <span>Upload Image</span>
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/png, image/jpeg, image/webp"
            className="hidden"
          />

          <button
            id="enhanceButton"
            onClick={handleEnhance}
            disabled={controlsDisabled}
            className="w-full flex items-center justify-center gap-3 p-3 text-base font-bold text-lime-400 uppercase tracking-widest bg-transparent border-2 border-lime-400/50 transition-all duration-300 ease-in-out hover:bg-lime-400/10 hover:border-lime-400 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isEnhancing ? (
              <>
                <Spinner colorClass="text-lime-400" />
                <span>Enhancing...</span>
              </>
            ) : (
              <>
                <EnhanceIcon />
                <span>Enhance Prompt</span>
              </>
            )}
          </button>
        </div>

        <button
          id="generateButton"
          onClick={onGenerate}
          disabled={controlsDisabled}
          className="w-full flex items-center justify-center gap-3 p-4 text-lg font-black text-black uppercase tracking-widest bg-lime-400 border-2 border-lime-400 transition-all duration-300 ease-in-out hover:bg-lime-300 hover:shadow-[0_0_30px_rgba(50,255,50,0.7)] disabled:bg-lime-400/50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Spinner />
              <span>{uploadedImage ? 'Applying...' : 'Generating...'}</span>
            </>
          ) : (
            <span>{uploadedImage ? 'Apply Edit' : 'Generate Image'}</span>
          )}
        </button>
      </div>

      {(error || enhancementError) && <p className="text-red-500 text-center text-sm">{error || enhancementError}</p>}
    </div>
  );
};
