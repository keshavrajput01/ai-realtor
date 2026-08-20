import { TTSProvider } from './TTSProvider';
import { GoogleTTSProvider } from './providers/GoogleTTSProvider';
import { ElevenLabsTTSProvider } from './providers/ElevenLabsTTSProvider';

/**
 * TTS Provider Factory
 * Creates and returns the appropriate TTS provider based on environment configuration
 */
export class TTSProviderFactory {
  private static instance: TTSProvider | null = null;

  /**
   * Get the configured TTS provider instance (singleton)
   */
  static getInstance(): TTSProvider {
    if (!this.instance) {
      this.instance = this.createProvider();
    }
    return this.instance;
  }

  /**
   * Create a new provider instance based on TTS_PROVIDER environment variable
   */
  private static createProvider(): TTSProvider {
    const provider = process.env.TTS_PROVIDER || 'elevenlabs';

    switch (provider.toLowerCase()) {
      case 'elevenlabs':
        console.log('✓ Using ElevenLabs TTS Provider');
        return new ElevenLabsTTSProvider();

      case 'google':
        console.log('✓ Using Google Cloud TTS Provider');
        return new GoogleTTSProvider();

      case 'mock':
        console.log('✓ Using Mock TTS Provider (testing)');
        return new MockTTSProvider();

      default:
        throw new Error(
          `Unknown TTS provider: ${provider}. Supported: elevenlabs, google, mock`
        );
    }
  }

  /**
   * Reset the singleton instance (useful for testing)
   */
  static reset(): void {
    this.instance = null;
  }
}

/**
 * Mock TTS Provider for testing
 */
class MockTTSProvider implements TTSProvider {
  async synthesize() {
    return {
      audioBuffer: Buffer.from('mock audio data'),
      format: 'mp3',
      duration: 2500,
    };
  }

  async streamSynthesize(text, config, onChunk) {
    return this.synthesize();
  }

  async healthCheck() {
    return true;
  }

  async getSupportedLanguages() {
    return ['en', 'hi', 'gu', 'mr', 'pa', 'ta', 'te', 'kn', 'ml'];
  }

  async getVoices(language: string) {
    return ['voice-1', 'voice-2', 'voice-3'];
  }
}
