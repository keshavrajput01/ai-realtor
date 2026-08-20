import { STTProvider } from './STTProvider';
import { WhisperSTTProvider } from './providers/WhisperSTTProvider';
import { GoogleSTTProvider } from './providers/GoogleSTTProvider';

/**
 * STT Provider Factory
 * Creates and returns the appropriate STT provider based on environment configuration
 */
export class STTProviderFactory {
  private static instance: STTProvider | null = null;

  /**
   * Get the configured STT provider instance (singleton)
   */
  static getInstance(): STTProvider {
    if (!this.instance) {
      this.instance = this.createProvider();
    }
    return this.instance;
  }

  /**
   * Create a new provider instance based on STT_PROVIDER environment variable
   */
  private static createProvider(): STTProvider {
    const provider = process.env.STT_PROVIDER || 'whisper';

    switch (provider.toLowerCase()) {
      case 'whisper':
        console.log('✓ Using Whisper STT Provider');
        return new WhisperSTTProvider();

      case 'google':
        console.log('✓ Using Google Cloud STT Provider');
        return new GoogleSTTProvider();

      case 'mock':
        console.log('✓ Using Mock STT Provider (testing)');
        return new MockSTTProvider();

      default:
        throw new Error(
          `Unknown STT provider: ${provider}. Supported: whisper, google, mock`
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
 * Mock STT Provider for testing
 */
class MockSTTProvider implements STTProvider {
  async transcribe() {
    return {
      transcript: 'I am interested in a 2BHK apartment in Mumbai',
      confidence: 0.95,
      isFinal: true,
      duration: 2500,
    };
  }

  async streamTranscribe(audioStream, config, onResult) {
    return this.transcribe();
  }

  async healthCheck() {
    return true;
  }

  async getSupportedLanguages() {
    return ['en', 'hi', 'gu', 'mr', 'pa', 'ta', 'te', 'kn', 'ml'];
  }
}
