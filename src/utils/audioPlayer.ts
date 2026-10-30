/**
 * Wedding Background Music Manager
 * Plays the licensed song: "Kesariya (Brahmāstra)" from /assets/aistudio/Kesariya_Brahmastra_128_Kbps_3f004c1c.mp3
 * Supports seamless navigation, sessionStorage state persistence, play/pause, mute/unmute, and volume control.
 */

export interface AudioState {
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  currentTime: number;
  duration: number;
  hasStarted: boolean;
  trackTitle: string;
  artist: string;
}

type AudioListener = (state: AudioState) => void;

const STORAGE_KEY_VOLUME = 'mahima_harsh_audio_vol';
const STORAGE_KEY_MUTED = 'mahima_harsh_audio_muted';
const STORAGE_KEY_STARTED = 'mahima_harsh_audio_started';

class WeddingAudioPlayer {
  private audio: HTMLAudioElement | null = null;
  private listeners: Set<AudioListener> = new Set();
  private isPlaying: boolean = false;
  private isMuted: boolean = false;
  private volume: number = 0.65;
  private currentTime: number = 0;
  private duration: number = 0;
  private hasStarted: boolean = false;

  public readonly trackTitle = 'Kesariya';
  public readonly artist = 'Brahmāstra · Arijit Singh';
  public readonly src = '/assets/aistudio/Kesariya_Brahmastra_128_Kbps_3f004c1c.mp3';

  constructor() {
    this.loadPersistedState();
    if (typeof window !== 'undefined') {
      this.initAudioElement();
    }
  }

  private loadPersistedState() {
    try {
      const savedVol = sessionStorage.getItem(STORAGE_KEY_VOLUME);
      if (savedVol !== null) {
        this.volume = parseFloat(savedVol);
      }
      const savedMuted = sessionStorage.getItem(STORAGE_KEY_MUTED);
      if (savedMuted !== null) {
        this.isMuted = savedMuted === 'true';
      }
      const savedStarted = sessionStorage.getItem(STORAGE_KEY_STARTED);
      if (savedStarted !== null) {
        this.hasStarted = savedStarted === 'true';
      }
    } catch {
      // Safe fallback
    }
  }

  private initAudioElement() {
    if (this.audio) return;
    this.audio = new Audio(this.src);
    this.audio.loop = true;
    this.audio.preload = 'auto';
    this.audio.volume = this.isMuted ? 0 : this.volume;

    this.audio.addEventListener('play', () => {
      this.isPlaying = true;
      this.notifyListeners();
    });

    this.audio.addEventListener('pause', () => {
      this.isPlaying = false;
      this.notifyListeners();
    });

    this.audio.addEventListener('timeupdate', () => {
      if (this.audio) {
        this.currentTime = this.audio.currentTime;
        this.notifyListeners();
      }
    });

    this.audio.addEventListener('loadedmetadata', () => {
      if (this.audio) {
        this.duration = this.audio.duration;
        this.notifyListeners();
      }
    });

    this.audio.addEventListener('volumechange', () => {
      if (this.audio) {
        this.isMuted = this.audio.muted;
        this.volume = this.audio.volume;
        this.notifyListeners();
      }
    });

    this.audio.addEventListener('ended', () => {
      // loop handles this, but keep as failsafe
      this.audio?.play().catch(() => {});
    });
  }

  public subscribe(listener: AudioListener): () => void {
    this.listeners.add(listener);
    listener(this.getState());
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notifyListeners() {
    const state = this.getState();
    this.listeners.forEach((listener) => listener(state));
  }

  public getState(): AudioState {
    return {
      isPlaying: this.isPlaying,
      isMuted: this.isMuted,
      volume: this.volume,
      currentTime: this.currentTime,
      duration: this.duration,
      hasStarted: this.hasStarted,
      trackTitle: this.trackTitle,
      artist: this.artist,
    };
  }

  /**
   * Called specifically when the user taps "Tap to Open Invitation"
   * Complies with browser autoplay policy and user's instruction.
   */
  public startOnUserOpen() {
    this.hasStarted = true;
    try {
      sessionStorage.setItem(STORAGE_KEY_STARTED, 'true');
    } catch {
      // Failsafe
    }

    if (!this.audio) {
      this.initAudioElement();
    }

    if (this.audio) {
      this.audio.volume = this.isMuted ? 0 : this.volume;
      this.audio.play().then(() => {
        this.isPlaying = true;
        this.notifyListeners();
      }).catch((err) => {
        console.warn('Audio playback waiting for further user gesture:', err);
      });
    }
  }

  public play() {
    if (!this.audio) {
      this.initAudioElement();
    }
    if (this.audio) {
      this.hasStarted = true;
      this.audio.play().then(() => {
        this.isPlaying = true;
        this.notifyListeners();
      }).catch(() => {});
    }
  }

  public pause() {
    if (this.audio) {
      this.audio.pause();
      this.isPlaying = false;
      this.notifyListeners();
    }
  }

  public togglePlay(): boolean {
    if (this.isPlaying) {
      this.pause();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.audio) {
      this.audio.muted = this.isMuted;
    }
    try {
      sessionStorage.setItem(STORAGE_KEY_MUTED, String(this.isMuted));
    } catch {}
    this.notifyListeners();
    return this.isMuted;
  }

  public setVolume(vol: number) {
    const clamped = Math.max(0, Math.min(1, vol));
    this.volume = clamped;
    if (this.audio) {
      this.audio.volume = clamped;
      if (this.isMuted && clamped > 0) {
        this.isMuted = false;
        this.audio.muted = false;
      }
    }
    try {
      sessionStorage.setItem(STORAGE_KEY_VOLUME, String(clamped));
    } catch {}
    this.notifyListeners();
  }

  public seek(seconds: number) {
    if (this.audio && Number.isFinite(seconds)) {
      this.audio.currentTime = seconds;
      this.currentTime = seconds;
      this.notifyListeners();
    }
  }
}

export const weddingAudio = new WeddingAudioPlayer();

// Backwards compatibility alias
export const ragaAudio = {
  start: () => weddingAudio.startOnUserOpen(),
  pause: () => weddingAudio.pause(),
  togglePlay: () => weddingAudio.togglePlay(),
  toggleMute: () => weddingAudio.toggleMute(),
  setVolume: (v: number) => weddingAudio.setVolume(v),
  getState: () => weddingAudio.getState(),
};
