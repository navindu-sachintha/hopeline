import { createWorker } from 'tesseract.js';

export async function extractText(image: string): Promise<string> {
  try {
    const worker = await createWorker('eng');
    const ret = await worker.recognize(image)
    await worker.terminate();
    const text = ret.data.text;
    return text;
  } catch (error) {
    return `Error extracting text: ${error as string}`;
  }
}