import axios from 'axios';
import { TTSProvider, TTSConfig, TTSResult } from '../TTSProvider';

/**
 * ElevenLabs TTS Provider
 * Uses ElevenLabs API for high-quality voice synthesis
 * Supports Indian language voices and cloning
 */
export class ElevenLabsTTSProvider implements TTSProvider {
  private apiKey: string;
  private apiUrl = 'https://api.elevenlabs.io/v1';

  constructor(apiKey: string = process.env.ELEVENLABS_API_KEY || '') {
    if (!apiKey) {
      throw new Error('ELEVENLABS_API_KEY is required for ElevenLabs TTS Provider');
    }
    this.apiKey = apiKey;
  }

  async synthesize(text: string, config?: TTSConfig): Promise<TTSResult> {
    try {
      const voiceId = config?.voice || 'EXAVITQu4vr4xnSDxMaL'; // Default voice

      const response = await axios.post(
        `${this.apiUrl}/text-to-speech/${voiceId}`,
        {
          text,
          model_id: 'eleven_monolingual_v1',
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.75,
          },
        },
        {
          headers: {
            'xi-api-key': this.apiKey,
          },
          responseType: 'arraybuffer',
        }
      );

      const audioBuffer = Buffer.from(response.data);

      return {
        audioBuffer,
        format: 'mp3',
        duration: Math.ceil((text.length / 150) * 1000),
      };
    } catch (error) {
      console.error('ElevenLabs TTS synthesize error:', error);
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
      const response = await axios.get(`${this.apiUrl}/user`, {
        headers: {
          'xi-api-key': this.apiKey,
        },
        timeout: 5000,
      });
      return response.status === 200;
    } catch (error) {
      console.error('ElevenLabs TTS health check failed:', error);
      return false;
    }
  }

  async getSupportedLanguages(): Promise<string[]> {
    return [
      'en',
      'en-US',
      'en-GB',
      'hi',
      'gu',
      'mr',
      'pa',
      'ta',
      'te',
      'kn',
      'ml',
    ];
  }

  async getVoices(language: string): Promise<string[]> {
    try {
      const response = await axios.get(`${this.apiUrl}/voices`, {
        headers: {
          'xi-api-key': this.apiKey,
        },
      });

      return response.data.voices.map((v: any) => v.voice_id);
    } catch (error) {
      console.error('ElevenLabs getVoices error:', error);
      return [];
    }
  }
}
