
export type AspectRatio = '1:1' | '16:9' | '9:16' | '4:3' | '3:4';

export interface GenerationStyle {
  name: string;
  promptSuffix: string;
}

export interface HistoryItem {
  id: string;
  prompt: string;
  fullPrompt: string;
  style: string;
  imageUrl: string;
}

export type EnhancementStyle = 'Detailed' | 'JSON' | 'XML';
