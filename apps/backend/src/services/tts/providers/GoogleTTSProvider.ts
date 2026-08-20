import axios from 'axios';
import { TTSProvider, TTSConfig, TTSResult } from '../TTSProvider';

/**
 * Google Cloud Text-to-Speech Provider
 * Uses Google Cloud Text-to-Speech API for voice synthesis
 */
export class GoogleTTSProvider implements TTSProvider {
  private apiKey: string;
  private apiUrl = 'https://texttospeech.googleapis.com/v1/text:synthesize';

  constructor(apiKey: string = process.env.GOOGLE_CLOUD_TTS_API_KEY || '') {
    if (!apiKey) {
      throw new Error('GOOGLE_CLOUD_TTS_API_KEY is required for Google TTS Provider');
    }
    this.apiKey = apiKey;
  }

  async synthesize(text: string, config?: TTSConfig): Promise<TTSResult> {
    try {
      const language = config?.language || 'en-US';
      const voice = config?.voice || 'en-US-Neural2-A';

      const response = await axios.post(
        `${this.apiUrl}?key=${this.apiKey}`,
        {
          input: { text },
          voice: {
            languageCode: language,
            name: voice,
          },
          audioConfig: {
            audioEncoding: 'MP3',
            pitch: config?.pitch || 0,
            speakingRate: config?.speed || 1,
          },
        }
      );

      const audioContent = response.data.audioContent;
      const audioBuffer = Buffer.from(audioContent, 'base64');

      return {
        audioBuffer,
        format: 'mp3',
        duration: Math.ceil((text.length / 150) * 1000), // Rough estimate
      };
    } catch (error) {
      console.error('Google TTS synthesize error:', error);
      throw new Error('Failed to synthesize speech');
    }
  }

  async streamSynthesize(
    text: string,
    config?: TTSConfig,
    onChunk?: (chunk: Buffer) => void
  ): Promise<TTSResult> {
    const result = await this.synthesize(text, config);
    if (onChunk) onChunk(result.audioBuffer);
    return result;
  }

  async healthCheck(): Promise<boolean> {
    try {
      await axios.post(
        `${this.apiUrl}?key=${this.apiKey}`,
        {
          input: { text: 'health check' },
          voice: { languageCode: 'en-US', name: 'en-US-Neural2-A' },
          audioConfig: { audioEncoding: 'MP3' },
        },
        { timeout: 5000 }
      );
      return true;
    } catch (error) {
      console.error('Google TTS health check failed:', error);
      return false;
    }
  }

  async getSupportedLanguages(): Promise<string[]> {
    return [
      'en-US',
      'en-GB',
      'en-IN',
      'hi-IN',
      'gu-IN',
      'mr-IN',
      'pa-IN',
      'ta-IN',
      'te-IN',
      'kn-IN',
      'ml-IN',
    ];
  }

  async getVoices(language: string): Promise<string[]> {
    // These are common Google Cloud TTS voices
    const voiceMap: { [key: string]: string[] } = {
      'en-US': ['en-US-Neural2-A', 'en-US-Neural2-C', 'en-US-Neural2-E'],
      'en-GB': ['en-GB-Neural2-A', 'en-GB-Neural2-B'],
      'en-IN': ['en-IN-Neural2-A', 'en-IN-Neural2-B'],
      'hi-IN': ['hi-IN-Neural2-A', 'hi-IN-Neural2-B'],
    };
    return voiceMap[language] || [];
  }
}
