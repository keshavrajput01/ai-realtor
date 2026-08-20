import axios from 'axios';
import FormData from 'form-data';
import { STTProvider, STTConfig, STTResult } from '../STTProvider';
import fs from 'fs';

/**
 * Whisper STT Provider
 * Uses OpenAI's Whisper model via API for speech-to-text conversion
 */
export class WhisperSTTProvider implements STTProvider {
  private apiKey: string;
  private apiUrl = 'https://api.openai.com/v1/audio/transcriptions';

  constructor(apiKey: string = process.env.OPENAI_API_KEY || '') {
    if (!apiKey) {
      throw new Error('OPENAI_API_KEY is required for Whisper STT Provider');
    }
    this.apiKey = apiKey;
  }

  async transcribe(audioBuffer: Buffer, config?: STTConfig): Promise<STTResult> {
    try {
      const form = new FormData();
      form.append('file', audioBuffer, 'audio.wav');
      form.append('model', 'whisper-1');
      form.append('language', config?.language || 'en');

      const response = await axios.post(this.apiUrl, form, {
        headers: {
          ...form.getHeaders(),
          Authorization: `Bearer ${this.apiKey}`,
        },
      });

      return {
        transcript: response.data.text,
        confidence: 0.95, // Whisper doesn't provide confidence scores
        isFinal: true,
        duration: 0, // Would need to calculate from audio buffer
      };
    } catch (error) {
      console.error('Whisper transcribe error:', error);
      throw new Error('Failed to transcribe audio');
    }
  }

  async streamTranscribe(
    audioStream: NodeJS.ReadableStream,
    config?: STTConfig,
    onResult?: (result: STTResult) => void
  ): Promise<STTResult> {
    // For streaming, we need to collect chunks and transcribe
    // This is a simplified implementation
    const chunks: Buffer[] = [];

    return new Promise((resolve, reject) => {
      audioStream.on('data', (chunk) => {
        chunks.push(chunk);
      });

      audioStream.on('end', async () => {
        try {
          const audioBuffer = Buffer.concat(chunks);
          const result = await this.transcribe(audioBuffer, config);
          if (onResult) onResult(result);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });

      audioStream.on('error', reject);
    });
  }

  async healthCheck(): Promise<boolean> {
    try {
      const response = await axios.get('https://api.openai.com/v1/models', {
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
        },
        timeout: 5000,
      });
      return response.status === 200;
    } catch (error) {
      console.error('Whisper health check failed:', error);
      return false;
    }
  }

  async getSupportedLanguages(): Promise<string[]> {
    return [
      'en', // English
      'hi', // Hindi
      'gu', // Gujarati
      'mr', // Marathi
      'pa', // Punjabi
      'ta', // Tamil
      'te', // Telugu
      'kn', // Kannada
      'ml', // Malayalam
    ];
  }
}
