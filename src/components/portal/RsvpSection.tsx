import React, { useState, useEffect } from 'react';
import { Send, CheckCircle2, User, Users, HeartHandshake, Utensils, MessageSquare } from 'lucide-react';
import { SectionDivider } from '../common/Ornaments';

interface RsvpData {
  guestName: string;
  attendance: 'attending' | 'declining';
  guestCount: number;
  dietaryPreference: string;
  message: string;
  submittedAt: string;
}

const STORAGE_KEY = 'mahima_harsh_wedding_rsvp';

export const RsvpSection: React.FC = () => {
  const [formData, setFormData] = useState<RsvpData>({
    guestName: '',
    attendance: 'attending',
    guestCount: 2,
    dietaryPreference: 'Vegetarian Feast',
    message: '',
    submittedAt: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  // Load existing RSVP if already submitted
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setFormData(parsed);
        setIsSubmitted(true);
      }
    } catch {
      // Storage failsafe
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.guestName.trim()) {
      setNotification('Please enter your full name.');
      return;
    }

    const payload: RsvpData = {
      ...formData,
      submittedAt: new Date().toISOString(),
    };

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // Storage error
    }

    setIsSubmitted(true);
    setNotification('Thank you! Your RSVP has been graciously recorded.');
    setTimeout(() => setNotification(null), 5000);
  };

  const handleEdit = () => {
    setIsSubmitted(false);
  };

  return (
    <section id="rsvp" className="relative w-full py-20 px-4 sm:px-6 lg:px-8 bg-[#FAF6F0] overflow-hidden">
      <div className="max-w-2xl mx-auto">
        <SectionDivider
          title="RSVP & Blessings"
          subtitle="Kindly Respond By 10 November 2026"
        />

        <div className="mt-8 bg-white rounded-2xl border-2 border-[#D4AF37]/60 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          {notification && (
            <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs sm:text-sm flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>{notification}</span>
            </div>
          )}

          {isSubmitted ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-full bg-[#FAF2E6] border border-[#D4AF37] flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-[#721B29]" />
              </div>

              <h3 className="font-serif text-2xl font-bold text-[#721B29]">
                RSVP Confirmed
              </h3>

              <p className="mt-2 text-sm text-[#684C38] font-serif italic">
                {formData.attendance === 'attending'
                  ? `We are delighted to celebrate with you, ${formData.guestName} (${formData.guestCount} guest${
                      formData.guestCount > 1 ? 's' : ''
                    })!`
                  : `Thank you for letting us know, ${formData.guestName}. Your warm wishes will be cherished.`}
              </p>

              {formData.message && (
                <div className="mt-4 p-4 rounded-xl bg-[#FAF6F0] border border-stone-200 text-xs text-[#684C38] italic max-w-md mx-auto">
                  &ldquo;{formData.message}&rdquo;
                </div>
              )}

              <button
                type="button"
                onClick={handleEdit}
                className="mt-6 inline-flex items-center gap-2 px-5 py-2 text-xs font-semibold text-[#721B29] bg-[#FAF2E6] hover:bg-[#F3E5AB] border border-[#D4AF37] rounded-lg transition-colors cursor-pointer"
              >
                Update My Response
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 text-left">
              {/* Guest Name */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#721B29] mb-1.5">
                  Guest Name(s) *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                    <User className="w-4 h-4 text-[#B8860B]" />
                  </div>
                  <input
                    type="text"
                    required
                    value={formData.guestName}
                    onChange={(e) => setFormData({ ...formData, guestName: e.target.value })}
                    placeholder="Enter full name of guest / family"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 focus:border-[#721B29] focus:ring-1 focus:ring-[#721B29] text-xs sm:text-sm bg-[#FAF8F5] transition-all outline-none"
                  />
                </div>
              </div>

              {/* Attendance Selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#721B29] mb-2">
                  Will You Be Attending? *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, attendance: 'attending' })}
                    className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                      formData.attendance === 'attending'
                        ? 'bg-[#721B29] text-white border-[#721B29] shadow-md'
                        : 'bg-white text-stone-700 border-stone-200 hover:border-[#D4AF37]'
                    }`}
                  >
                    <HeartHandshake className="w-4 h-4" />
                    <span>Joyfully Attending</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, attendance: 'declining' })}
                    className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                      formData.attendance === 'declining'
                        ? 'bg-stone-800 text-white border-stone-800 shadow-md'
                        : 'bg-white text-stone-700 border-stone-200 hover:border-[#D4AF37]'
                    }`}
                  >
                    <span>Regretfully Declining</span>
                  </button>
                </div>
              </div>

              {formData.attendance === 'attending' && (
                <>
                  {/* Guest Count */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#721B29] mb-1.5">
                      Number of Guests Attending
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                        <Users className="w-4 h-4 text-[#B8860B]" />
                      </div>
                      <select
                        value={formData.guestCount}
                        onChange={(e) =>
                          setFormData({ ...formData, guestCount: parseInt(e.target.value, 10) })
                        }
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 focus:border-[#721B29] focus:ring-1 focus:ring-[#721B29] text-xs sm:text-sm bg-[#FAF8F5] transition-all outline-none cursor-pointer"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                          <option key={num} value={num}>
                            {num} {num === 1 ? 'Guest' : 'Guests'}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Dietary Preferences */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#721B29] mb-1.5">
                      Dietary Preferences
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                        <Utensils className="w-4 h-4 text-[#B8860B]" />
                      </div>
                      <select
                        value={formData.dietaryPreference}
                        onChange={(e) =>
                          setFormData({ ...formData, dietaryPreference: e.target.value })
                        }
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 focus:border-[#721B29] focus:ring-1 focus:ring-[#721B29] text-xs sm:text-sm bg-[#FAF8F5] transition-all outline-none cursor-pointer"
                      >
                        <option value="Vegetarian Feast">Vegetarian Feast</option>
                        <option value="Jain (No Root Veg)">Jain Friendly (No Root Veg)</option>
                        <option value="No Dietary Restrictions">No Special Restrictions</option>
                      </select>
                    </div>
                  </div>
                </>
              )}

              {/* Message to Couple */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#721B29] mb-1.5">
                  Blessings &amp; Message for Mahima &amp; Harsh
                </label>
                <div className="relative">
                  <div className="absolute top-3 left-3 pointer-events-none text-stone-400">
                    <MessageSquare className="w-4 h-4 text-[#B8860B]" />
                  </div>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Share your prayers, memories, or wedding wishes..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 focus:border-[#721B29] focus:ring-1 focus:ring-[#721B29] text-xs sm:text-sm bg-[#FAF8F5] transition-all outline-none"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#721B29] via-[#8E2333] to-[#721B29] text-white font-cinzel text-xs sm:text-sm tracking-wider uppercase font-semibold shadow-lg hover:shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2 border border-[#D4AF37]"
              >
                <Send className="w-4 h-4 text-[#F3E5AB]" />
                <span>Submit RSVP Response</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
