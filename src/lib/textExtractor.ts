import { createWorker } from 'tesseract.js';

export async function extractText(image: string): Promise<string> {
  const worker = await createWorker('eng');
  const ret = await worker.recognize(image)
  await worker.terminate();
  const text = ret.data.text;
  return text;
}