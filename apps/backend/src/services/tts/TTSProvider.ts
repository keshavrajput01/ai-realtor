/**
 * Text-to-Speech (TTS) Provider abstraction layer
 * Allows swapping TTS providers without changing application code
 */

export interface TTSConfig {
  language?: string;
  voice?: string; // e.g., "male", "female"
  speed?: number; // 0.5 - 2.0
  pitch?: number; // -20 - 20
  volumeGain?: number; // -20 - 20 dB
}

export interface TTSResult {
  audioBuffer: Buffer;
  format: string; // e.g., "mp3", "wav", "ogg"
  duration: number; // milliseconds
}

export interface TTSProvider {
  /**
   * Convert text to speech
   */
  synthesize(text: string, config?: TTSConfig): Promise<TTSResult>;

  /**
   * Stream text-to-speech output
   */
  streamSynthesize(
    text: string,
    config?: TTSConfig,
    onChunk?: (chunk: Buffer) => void
  ): Promise<TTSResult>;

  /**
   * Health check
   */
  healthCheck(): Promise<boolean>;

  /**
   * Get supported languages
   */
  getSupportedLanguages(): Promise<string[]>;

  /**
   * Get available voices for a language
   */
  getVoices(language: string): Promise<string[]>;
}
