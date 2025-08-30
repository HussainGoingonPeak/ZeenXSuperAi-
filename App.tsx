
import React, { useState, useCallback } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { InputSection } from './components/InputSection';
import { OutputSection } from './components/OutputSection';
import { HistorySection } from './components/HistorySection';
import { generateImage as generateImageService, upscaleImage as upscaleImageService, editImageWithPrompt as editImageWithPromptService } from './services/geminiService';
import type { HistoryItem, AspectRatio, GenerationStyle } from './types';
import { STYLES, DIMENSIONS } from './constants';

const App: React.FC = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const [prompt, setPrompt] = useState<string>('');
  const [style, setStyle] = useState<GenerationStyle>(STYLES.find(s => s.name === 'Cyberpunk') || STYLES[0]);
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>(DIMENSIONS[0].value);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isUpscaling, setIsUpscaling] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<HistoryItem | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const handleEnterApp = () => {
    setShowWelcome(false);
  };

  const handleGenerate = useCallback(async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      let imageUrl: string;
      let newImage: HistoryItem;

      if (uploadedImage) {
        // Image editing flow
        imageUrl = await editImageWithPromptService(uploadedImage, prompt);
        newImage = {
          id: `edit_${Date.now()}`,
          prompt: prompt,
          fullPrompt: `Edit applied: "${prompt}"`,
          style: 'Image Edit',
          imageUrl: imageUrl,
        };
      } else {
        // Text-to-image flow
        const fullPrompt = `${prompt}, ${style.promptSuffix}`;
        imageUrl = await generateImageService(fullPrompt, aspectRatio);
        newImage = {
          id: `gen_${Date.now()}`,
          prompt: prompt,
          fullPrompt: fullPrompt,
          style: style.name,
          imageUrl: imageUrl,
        };
      }
      
      setGeneratedImage(newImage);
      setHistory(prevHistory => [newImage, ...prevHistory.slice(0, 8)]); // Keep history to 9 items
      setUploadedImage(null); // Clear uploaded image after generation
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred during image generation/editing.');
    } finally {
      setIsLoading(false);
    }
  }, [prompt, style, aspectRatio, uploadedImage]);
  
  const handleUpscale = useCallback(async () => {
    if (!generatedImage) {
      setError('No image to upscale.');
      return;
    }
    setIsUpscaling(true);
    setError(null);

    try {
      const upscaledImageUrl = await upscaleImageService(generatedImage.imageUrl);
      const upscaledImage: HistoryItem = {
        ...generatedImage,
        id: `upscaled_${generatedImage.id}`, // Give it a new ID to differentiate
        imageUrl: upscaledImageUrl,
      };
      setGeneratedImage(upscaledImage);

      // Update the item in history with its upscaled version
      setHistory(prev => 
        prev.map(item => item.id === generatedImage.id ? upscaledImage : item)
      );

    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred during image upscaling.');
    } finally {
      setIsUpscaling(false);
    }
  }, [generatedImage]);

  const handleSelectHistoryItem = (item: HistoryItem) => {
    setGeneratedImage(item);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (showWelcome) {
    return <WelcomeScreen onEnter={handleEnterApp} />;
  }

  return (
    <div className="min-h-screen bg-black text-lime-400 cyber-grid overflow-hidden">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>
      <div className="relative container mx-auto p-4 md:p-8 z-10">
        <header className="text-center mb-8 md:mb-12">
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-widest animate-pulse-glow text-shadow-lime">
            ZeenXSuperAi
          </h1>
          <p className="text-lime-400/70 mt-2 text-sm md:text-base tracking-wider">
            Next-Gen AI Image Generator
          </p>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          <div className="flex flex-col gap-8">
            <InputSection
              prompt={prompt}
              setPrompt={setPrompt}
              style={style}
              setStyle={setStyle}
              aspectRatio={aspectRatio}
              setAspectRatio={setAspectRatio}
              isLoading={isLoading}
              isUpscaling={isUpscaling}
              error={error}
              onGenerate={handleGenerate}
              uploadedImage={uploadedImage}
              setUploadedImage={setUploadedImage}
            />
          </div>
          <div className="flex flex-col gap-8">
            <OutputSection
              generatedImage={generatedImage}
              isLoading={isLoading}
              isUpscaling={isUpscaling}
              onUpscale={handleUpscale}
            />
          </div>
        </main>
        
        <HistorySection history={history} onSelect={handleSelectHistoryItem} />
      </div>
    </div>
  );
};

export default App;
