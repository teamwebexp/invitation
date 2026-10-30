import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause, Music } from 'lucide-react';
import { weddingAudio, AudioState } from '../../utils/audioPlayer';

export const MusicPlayerFloating: React.FC = () => {
  const [audioState, setAudioState] = useState<AudioState>(weddingAudio.getState());

  useEffect(() => {
    const unsubscribe = weddingAudio.subscribe((state) => {
      setAudioState(state);
    });
    return unsubscribe;
  }, []);

  const handleTogglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    weddingAudio.togglePlay();
  };

  const handleToggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    weddingAudio.toggleMute();
  };

  return (
    <aside
      aria-label="Wedding Music Control"
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex items-center gap-2 select-none"
    >
      {/* Small Floating Play/Pause Button Only - No Title */}
      <button
        type="button"
        onClick={handleTogglePlay}
        aria-label={audioState.isPlaying ? 'Pause Background Music' : 'Play Background Music'}
        className={`relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer shadow-xl border-2 border-[#D4AF37] ${
          audioState.isPlaying
            ? 'bg-gradient-to-tr from-[#721B29] via-[#8E2333] to-[#721B29] text-[#FAF7F2] ring-2 ring-[#D4AF37]/60 ring-offset-2 ring-offset-[#FAF7F2]'
            : 'bg-[#FFFDF9] text-[#721B29] hover:bg-[#FAF2E6]'
        }`}
        style={{
          boxShadow: '0 8px 24px -4px rgba(114, 27, 41, 0.35), 0 0 0 1px rgba(212, 175, 55, 0.4)',
        }}
        title={audioState.isPlaying ? 'Pause Music' : 'Play Music'}
      >
        {audioState.isPlaying ? (
          <div className="flex items-end justify-center gap-1 h-5 w-5">
            <span className="w-1 bg-[#F5E5A4] rounded-full animate-pulse h-4" />
            <span
              className="w-1 bg-[#FFFDF9] rounded-full animate-pulse h-5"
              style={{ animationDelay: '0.15s' }}
            />
            <span
              className="w-1 bg-[#F5E5A4] rounded-full animate-pulse h-3"
              style={{ animationDelay: '0.3s' }}
            />
          </div>
        ) : (
          <Play className="w-5 h-5 ml-0.5 text-[#721B29] fill-[#721B29]" />
        )}

        {/* Ambient spinning ring while playing */}
        {audioState.isPlaying && (
          <span className="absolute inset-0 rounded-full border border-[#F3E5AB]/40 animate-ping pointer-events-none" style={{ animationDuration: '3s' }} />
        )}
      </button>

      {/* Tiny companion Mute / Unmute Button */}
      <button
        type="button"
        onClick={handleToggleMute}
        aria-label={audioState.isMuted ? 'Unmute Audio' : 'Mute Audio'}
        className="w-8 h-8 rounded-full bg-[#FFFDF9]/95 backdrop-blur-sm border border-[#D4AF37]/70 text-[#721B29] hover:bg-[#FAF2E6] flex items-center justify-center shadow-md transition-transform hover:scale-105 active:scale-95 cursor-pointer"
        title={audioState.isMuted ? 'Unmute Audio' : 'Mute Audio'}
      >
        {audioState.isMuted ? (
          <VolumeX className="w-3.5 h-3.5 text-red-700" />
        ) : (
          <Volume2 className="w-3.5 h-3.5" />
        )}
      </button>
    </aside>
  );
};
