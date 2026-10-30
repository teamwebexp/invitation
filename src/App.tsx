/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { EnvelopeExperience } from './components/envelope/EnvelopeExperience';
import { WeddingPortal } from './components/portal/WeddingPortal';
import { MusicPlayerFloating } from './components/portal/MusicPlayerFloating';

export default function App() {
  const [viewMode, setViewMode] = useState<'envelope' | 'portal'>('envelope');

  const handleUnlockCelebration = () => {
    setViewMode('portal');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReplayEnvelope = () => {
    setViewMode('envelope');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen w-full font-sans antialiased bg-[#FAF7F2] text-[#2D241E]">
      {viewMode === 'envelope' ? (
        <EnvelopeExperience onUnlockCelebration={handleUnlockCelebration} />
      ) : (
        <WeddingPortal onReplayEnvelope={handleReplayEnvelope} />
      )}
      {/* Global persistent floating music player with Kesariya audio */}
      <MusicPlayerFloating />
    </div>
  );
}
