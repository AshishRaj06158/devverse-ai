import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;

let model: any = null;

if (apiKey) {
  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    console.log('Gemini AI successfully initialized using @google/generative-ai.');
  } catch (error) {
    console.error('Failed to initialize Gemini AI:', error);
  }
} else {
  console.warn('GEMINI_API_KEY not found in environment. The backend will operate in MOCK/DEMO mode.');
}

export { model };
