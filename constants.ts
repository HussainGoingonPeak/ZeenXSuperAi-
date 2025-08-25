
import type { AspectRatio, GenerationStyle } from './types';

export const STYLES: GenerationStyle[] = [
  { name: 'Photorealistic', promptSuffix: 'ultra realistic 4k photo, cinematic lighting' },
  { name: 'Digital Art', promptSuffix: 'vibrant digital art, trending on artstation, detailed illustration' },
  { name: 'Cyberpunk', promptSuffix: 'cyberpunk city, neon lights, futuristic, high-tech, Blade Runner aesthetic' },
  { name: 'Anime', promptSuffix: 'anime style, key visual, beautiful detailed, by studio ghibli and makoto shinkai' },
  { name: 'Abstract', promptSuffix: 'abstract geometric art, colorful, complex patterns' },
  { name: '3D Render', promptSuffix: '3D render, octane render, high detail, physically based rendering' },
  { name: 'Fantasy', promptSuffix: 'epic fantasy art, majestic landscape, lord of the rings style, matte painting' },
];

export const DIMENSIONS: { label: string; value: AspectRatio }[] = [
  { label: 'Square (1:1)', value: '1:1' },
  { label: 'Widescreen (16:9)', value: '16:9' },
  { label: 'Portrait (9:16)', value: '9:16' },
  { label: 'Landscape (4:3)', value: '4:3' },
  { label: 'Tall (3:4)', value: '3:4' },
];
