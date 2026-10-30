import React, { useState } from 'react';
import { Share2, Check, Copy, MessageCircle } from 'lucide-react';
import { WEDDING_DATA } from '../../data/weddingData';
import { SectionDivider } from '../common/Ornaments';

export const WhatsAppShare: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const weddingUrl = window.location.href;

  const shareMessage = `✨ *Imperial Wedding Invitation: Mahima Arora & Harsh Bajaj* ✨

With the divine blessings of our beloved elders, we cordially invite you to celebrate the joyous wedding celebrations of:
👰 *Mahima Arora* & 🤵 *Harsh Bajaj*

📅 *Wedding Date:* 24 November 2026
🎉 *Celebrations:* 24–26 November 2026
📍 *Location:* Kashipur, Uttarakhand, India
🏨 *Venues:* Ananya Residency & Kavi Nagar Colony, Kashipur

View the full digital invitation, event schedules, directions, and RSVP here:
${weddingUrl}

Warm regards & blessings,
Arora & Bajaj Families
${WEDDING_DATA.couple.hashtag}`;

  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareMessage)}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section className="relative w-full py-16 px-4 sm:px-6 lg:px-8 bg-[#FAF7F2] overflow-hidden">
      <div className="max-w-xl mx-auto text-center">
        <SectionDivider
          title="Share The Joy"
          subtitle="Pass Along The Invitation To Family & Friends"
        />

        <div className="mt-8 p-6 sm:p-8 rounded-2xl bg-white border border-[#D4AF37]/50 shadow-xl text-center">
          <div className="w-14 h-14 rounded-full bg-[#E8F5E9] text-[#2E7D32] flex items-center justify-center mx-auto mb-4 border border-[#A5D6A7]">
            <MessageCircle className="w-7 h-7" />
          </div>

          <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#721B29]">
            Invite via WhatsApp
          </h3>

          <p className="text-xs sm:text-sm text-[#684C38] font-serif italic mt-1.5 max-w-sm mx-auto">
            Share this digital invitation link with your relatives, friends, and loved ones on WhatsApp in one click.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold text-xs sm:text-sm shadow-md transition-colors cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
              <span>Share on WhatsApp</span>
            </a>

            <button
              type="button"
              onClick={handleCopy}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#FAF2E6] hover:bg-[#F3E5AB] text-[#721B29] border border-[#D4AF37] font-semibold text-xs sm:text-sm transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Invitation Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-[#B8860B]" />
                  <span>Copy Invitation Text</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
