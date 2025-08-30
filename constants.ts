
import type { AspectRatio, GenerationStyle, EnhancementStyle } from './types';

export const STYLES: GenerationStyle[] = [
  { name: '3D Render', promptSuffix: '3D render, octane render, high detail, physically based rendering' },
  { name: 'Abstract', promptSuffix: 'abstract geometric art, colorful, complex patterns' },
  { name: 'Anime', promptSuffix: 'anime style, key visual, beautiful detailed, by studio ghibli and makoto shinkai' },
  { name: 'Art Deco', promptSuffix: 'art deco style, glamorous, geometric patterns, luxurious, 1920s Gatsby aesthetic' },
  { name: 'Claymation', promptSuffix: 'claymation style, stop-motion animation look, plasticine characters, detailed textures' },
  { name: 'Comic Book', promptSuffix: 'comic book art, bold outlines, halftone dots, dynamic action scene' },
  { name: 'Cyberpunk', promptSuffix: 'cyberpunk city, neon lights, futuristic, high-tech, Blade Runner aesthetic' },
  { name: 'Digital Art', promptSuffix: 'vibrant digital art, trending on artstation, detailed illustration' },
  { name: 'Fantasy', promptSuffix: 'epic fantasy art, majestic landscape, lord of the rings style, matte painting' },
  { name: 'Gothic', promptSuffix: 'gothic art, dark, moody, intricate details, medieval architecture, dramatic lighting' },
  { name: 'Impressionism', promptSuffix: 'impressionistic painting, visible brush strokes, focus on light and color, style of Monet' },
  { name: 'Line Art', promptSuffix: 'clean black and white line art, elegant, simple, vector illustration' },
  { name: 'Low Poly', promptSuffix: 'low poly 3D art, faceted surfaces, geometric, stylized' },
  { name: 'Minimalist', promptSuffix: 'minimalist design, clean lines, simple shapes, limited color palette' },
  { name: 'Photorealistic', promptSuffix: 'ultra realistic 4k photo, cinematic lighting' },
  { name: 'Pixel Art', promptSuffix: 'pixel art, 16-bit, retro video game style, limited palette' },
  { name: 'Pop Art', promptSuffix: 'pop art style, bold colors, graphic print, style of Andy Warhol' },
  { name: 'Steampunk', promptSuffix: 'steampunk illustration, gears, cogs, steam-powered machinery, Victorian era aesthetic' },
  { name: 'Surrealism', promptSuffix: 'surrealist art, dreamlike, bizarre, illogical scenes, style of Salvador Dali' },
  { name: 'Synthwave', promptSuffix: 'synthwave aesthetic, neon grid, retro-futuristic, 80s vibe, sunset background' },
  { name: 'Vintage', promptSuffix: 'vintage photograph, sepia tones, aged paper texture, 1920s style' },
  { name: 'Watercolor', promptSuffix: 'gentle watercolor painting, soft edges, layered washes of color' },
];

export const DIMENSIONS: { label: string; value: AspectRatio }[] = [
  { label: 'Square (1:1)', value: '1:1' },
  { label: 'Widescreen (16:9)', value: '16:9' },
  { label: 'Portrait (9:16)', value: '9:16' },
  { label: 'Landscape (4:3)', value: '4:3' },
  { label: 'Tall (3:4)', value: '3:4' },
];

export const ENHANCEMENT_STYLES: { label: string; value: EnhancementStyle }[] = [
  { label: 'Detailed', value: 'Detailed' },
  { label: 'JSON', value: 'JSON' },
  { label: 'XML', value: 'XML' },
];
