/**
 * Samsung One UI Incoming Call Screen
 * Full-screen overlay with caller info, accept/decline swipe buttons
 */
import { Contact } from "@/lib/mockData";

interface IncomingCallScreenProps {
  contact: Contact | null;
  onAccept: () => void;
  onDecline: () => void;
}

export function IncomingCallScreen({ contact, onAccept, onDecline }: IncomingCallScreenProps) {
  if (!contact) return null;

  return (
    <div
      className="absolute inset-0 z-30 flex flex-col slide-up"
      style={{
        background: "linear-gradient(160deg, #0d1b2a 0%, #1b263b 40%, #415a77 100%)",
      }}
    >
      {/* Status bar */}
      <div className="flex items-center justify-between px-5 pt-2 pb-1">
        <span className="text-[13px] font-semibold text-white/80">
          {new Date().getHours()}:{new Date().getMinutes().toString().padStart(2, "0")}
        </span>
      </div>

      {/* Incoming label */}
      <div className="flex flex-col items-center mt-12 mb-8 px-6">
        <p className="text-[14px] text-white/60 mb-6 tracking-wide">Incoming call</p>

        {/* Avatar with ring animations */}
        <div className="relative mb-6">
          <div
            className="absolute inset-0 rounded-full ring-wave"
            style={{ border: `2px solid ${contact.color}`, margin: -20 }}
          />
          <div
            className="absolute inset-0 rounded-full ring-wave-2"
            style={{ border: `2px solid ${contact.color}`, margin: -20 }}
          />
          <div
            className="w-28 h-28 rounded-full flex items-center justify-center text-white text-4xl font-semibold shadow-2xl relative z-10"
            style={{ backgroundColor: contact.color }}
          >
            {contact.initials}
          </div>
        </div>

        <h2 className="text-[28px] font-semibold text-white mb-2 text-center">{contact.name}</h2>
        <p className="text-[15px] text-white/60">{contact.phone}</p>
        <p className="text-[13px] text-white/40 mt-1">Mobile</p>
      </div>

      {/* Quick actions */}
      <div className="flex justify-center gap-8 mb-8">
        <QuickAction label="Remind me" icon={
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"/>
          </svg>
        } />
        <QuickAction label="Message" icon={
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
          </svg>
        } />
      </div>

      {/* Accept / Decline buttons */}
      <div className="flex justify-around items-center px-10 mt-auto mb-14">
        {/* Decline */}
        <div className="flex flex-col items-center gap-2">
          <button
            onClick={onDecline}
            className="w-[72px] h-[72px] rounded-full flex items-center justify-center shadow-xl transition-all active:scale-95"
            style={{ backgroundColor: "#E53935" }}
            aria-label="Decline call"
          >
            <svg width="30" height="30" viewBox="0 0 24 24" fill="white">
              <path d="M12 9c-1.6 0-3.15.25-4.6.72v3.1c0 .39-.23.74-.56.9-.98.49-1.87 1.12-2.66 1.85-.18.18-.43.28-.7.28-.28 0-.53-.11-.71-.29L.29 13.08c-.18-.17-.29-.42-.29-.7 0-.28.11-.53.29-.71C3.34 8.78 7.46 7 12 7s8.66 1.78 11.71 4.67c.18.18.29.43.29.71 0 .28-.11.53-.29.71l-2.48 2.48c-.18.18-.43.29-.71.29-.27 0-.52-.1-.7-.28-.79-.73-1.68-1.36-2.66-1.85-.33-.16-.56-.51-.56-.9v-3.1C15.15 9.25 13.6 9 12 9z"/>
            </svg>
          </button>
          <span className="text-[12px] text-white/60">Decline</span>
        </div>

        {/* Accept */}
        <div className="flex flex-col items-center gap-2">
          <button
            onClick={onAccept}
            className="w-[72px] h-[72px] rounded-full flex items-center justify-center shadow-xl transition-all active:scale-95 call-pulse"
            style={{ backgroundColor: "#2ECC71" }}
            aria-label="Accept call"
          >
            <svg width="30" height="30" viewBox="0 0 24 24" fill="white">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
            </svg>
          </button>
          <span className="text-[12px] text-white/60">Accept</span>
        </div>
      </div>
    </div>
  );
}

function QuickAction({ label, icon }: { label: string; icon: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center text-white/70"
        style={{ backgroundColor: "rgba(255,255,255,0.12)" }}
      >
        {icon}
      </div>
      <span className="text-[11px] text-white/50">{label}</span>
    </div>
  );
}
