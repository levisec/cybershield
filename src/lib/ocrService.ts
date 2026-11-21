import { createWorker } from 'tesseract.js';

export interface OcrProgress {
  status: string;
  progress: number; // 0 - 1
}

export interface OcrValidationResult {
  valid: boolean;
  error?: string;
}

const ALLOWED_MIME_TYPES = new Set([
  'image/png',
  'image/jpeg',
  'image/jpg',
  'image/webp',
]);

const MAX_FILE_SIZE_BYTES = 8 * 1024 * 1024; // 8 MB

export function validateImageFile(file: File): OcrValidationResult {
  if (!file) {
    return { valid: false, error: 'No file selected.' };
  }

  if (!ALLOWED_MIME_TYPES.has(file.type.toLowerCase())) {
    return {
      valid: false,
      error: `Unsupported format (${file.type || 'unknown'}). Please upload a PNG, JPEG, or WebP screenshot.`,
    };
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    return {
      valid: false,
      error: `File is too large (${(file.size / (1024 * 1024)).toFixed(1)} MB). Maximum allowed size is 8 MB.`,
    };
  }

  return { valid: true };
}

export async function extractTextFromImage(
  imageSource: File | string,
  onProgress?: (progress: OcrProgress) => void
): Promise<string> {
  try {
    const worker = await createWorker('eng');

    if (onProgress) {
      onProgress({ status: 'Recognizing text...', progress: 0.5 });
    }

    const ret = await worker.recognize(imageSource);
    await worker.terminate();

    return ret.data.text.trim();
  } catch (err: any) {
    console.error('OCR Worker Error:', err);
    throw new Error(
      'Text extraction failed. Ensure the image is clear and contains readable text.'
    );
  }
}
