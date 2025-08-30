
import { GoogleGenAI, Modality } from "@google/genai";
import type { AspectRatio, EnhancementStyle } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const enhancementInstructions: Record<EnhancementStyle, string> = {
    Detailed: `Take the following user prompt and expand it into a detailed, vivid, and descriptive paragraph suitable for a powerful AI image generator. Focus on creating a rich scene with details about the subject, environment, lighting, colors, and mood. Do not add any preamble, just return the enhanced prompt. User prompt: `,
    JSON: `Convert the following user prompt into a structured JSON object for an AI image generator. The JSON should be a single block of code. Keys should include "subject", "setting", "style", "composition", "lighting", and "color_palette". Provide rich details for each value. Do not add any preamble or markdown formatting like \`\`\`json. Just return the raw JSON object. User prompt: `,
    XML: `Convert the following user prompt into a structured XML format for an AI image generator. The XML should be a single block of code. Tags should include <scene>, <subject>, <setting>, <style>, <composition>, <lighting>, and <colorPalette>. Provide rich details for each tag. Do not add any preamble or markdown formatting like \`\`\`xml. Just return the raw XML. User prompt: `,
};

export const enhancePrompt = async (prompt: string, style: EnhancementStyle): Promise<string> => {
    if (!prompt.trim()) {
        throw new Error("Prompt cannot be empty.");
    }
    try {
        const instruction = enhancementInstructions[style];
        const fullPrompt = `${instruction}"${prompt}"`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: fullPrompt,
            config: {
                temperature: 0.8,
                topP: 0.95,
            }
        });

        return response.text.trim();
    } catch (error) {
        console.error("Error enhancing prompt with Gemini:", error);
        if (error instanceof Error) {
            throw new Error(`Prompt enhancement failed: ${error.message}`);
        }
        throw new Error("An unknown error occurred during prompt enhancement.");
    }
};


export const generateImage = async (prompt: string, aspectRatio: AspectRatio): Promise<string> => {
  try {
    const response = await ai.models.generateImages({
      model: 'imagen-4.0-generate-001',
      prompt: prompt,
      config: {
        numberOfImages: 1,
        aspectRatio: aspectRatio,
      },
    });

    if (response.generatedImages && response.generatedImages.length > 0) {
      const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
      return `data:image/png;base64,${base64ImageBytes}`;
    } else {
      throw new Error("No image was generated. The prompt may have been blocked by safety filters.");
    }
  } catch (error) {
    console.error("Error generating image with Gemini:", error);
    if (error instanceof Error) {
        throw new Error(`Image generation failed: ${error.message}`);
    }
    throw new Error("An unknown error occurred during image generation.");
  }
};

export const upscaleImage = async (base64ImageUrl: string): Promise<string> => {
  try {
    if (!base64ImageUrl.startsWith('data:image/')) {
      throw new Error("Invalid base64 image URL format.");
    }

    const [header, data] = base64ImageUrl.split(',');
    if (!header || !data) {
      throw new Error("Invalid base64 image data.");
    }
    
    const mimeTypeMatch = header.match(/data:(image\/\w+);base64/);
    if (!mimeTypeMatch || !mimeTypeMatch[1]) {
      throw new Error("Could not determine mime type from base64 string.");
    }
    const mimeType = mimeTypeMatch[1];
    
    const imagePart = {
      inlineData: {
        data: data,
        mimeType: mimeType,
      },
    };

    const textPart = {
      text: 'Upscale this image to 4K resolution, enhancing details, clarity, and overall quality without changing the content, composition, or artistic style.',
    };

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image-preview',
      contents: {
        parts: [imagePart, textPart],
      },
      config: {
        responseModalities: [Modality.IMAGE, Modality.TEXT],
      },
    });
    
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        const base64ImageBytes: string = part.inlineData.data;
        return `data:${part.inlineData.mimeType};base64,${base64ImageBytes}`;
      }
    }

    throw new Error("No upscaled image was returned from the model.");

  } catch (error) {
    console.error("Error upscaling image with Gemini:", error);
    if (error instanceof Error) {
        throw new Error(`Image upscaling failed: ${error.message}`);
    }
    throw new Error("An unknown error occurred during image upscaling.");
  }
};

export const editImageWithPrompt = async (base64ImageUrl: string, prompt: string): Promise<string> => {
  try {
    if (!base64ImageUrl.startsWith('data:image/')) {
      throw new Error("Invalid base64 image URL format.");
    }

    const [header, data] = base64ImageUrl.split(',');
    if (!header || !data) {
      throw new Error("Invalid base64 image data.");
    }
    
    const mimeTypeMatch = header.match(/data:(image\/\w+);base64/);
    if (!mimeTypeMatch || !mimeTypeMatch[1]) {
      throw new Error("Could not determine mime type from base64 string.");
    }
    const mimeType = mimeTypeMatch[1];
    
    const imagePart = {
      inlineData: {
        data: data,
        mimeType: mimeType,
      },
    };

    const textPart = {
      text: prompt,
    };

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image-preview',
      contents: {
        parts: [imagePart, textPart],
      },
      config: {
        responseModalities: [Modality.IMAGE, Modality.TEXT],
      },
    });
    
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        const base64ImageBytes: string = part.inlineData.data;
        return `data:${part.inlineData.mimeType};base64,${base64ImageBytes}`;
      }
    }

    throw new Error("No edited image was returned from the model.");

  } catch (error) {
    console.error("Error editing image with Gemini:", error);
    if (error instanceof Error) {
        throw new Error(`Image editing failed: ${error.message}`);
    }
    throw new Error("An unknown error occurred during image editing.");
  }
};
