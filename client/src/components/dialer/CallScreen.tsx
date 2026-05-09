/**
 * Samsung One UI Active Call Screen
 * Full-screen overlay with contact info, call duration, action buttons
 * Calling state: shows "Calling..." with animated dots
 * Active state: shows timer, mute/speaker/keypad/end buttons
 * Ended state: shows "Call ended"
 */
import { CallState } from "@/hooks/useDialer";
import { Contact } from "@/lib/mockData";
import { DialKey } from "./DialKey";
import { KEYPAD_KEYS } from "@/lib/mockData";

interface CallScreenProps {
  callState: CallState;
  contact: Contact | null;
  duration: number;
  formatDuration: (s: number) => string;
  isMuted: boolean;
  isSpeaker: boolean;
  isKeypadVisible: boolean;
  pressedKey: string | null;
  onEnd: () => void;
  onToggleMute: () => void;
  onToggleSpeaker: () => void;
  onToggleKeypad: () => void;
  onPressKey: (digit: string) => void;
}

export function CallScreen({
  callState,
  contact,
  duration,
  formatDuration,
  isMuted,
  isSpeaker,
  isKeypadVisible,
  pressedKey,
  onEnd,
  onToggleMute,
  onToggleSpeaker,
  onToggleKeypad,
  onPressKey,
}: CallScreenProps) {
  if (!contact) return null;

  const isActive = callState === "active";
  const isCalling = callState === "calling";
  const isEnded = callState === "ended";

  return (
    <div
      className="absolute inset-0 z-20 flex flex-col slide-up"
      style={{
        background: "linear-gradient(160deg, #1a1a2e 0%, #16213e 40%, #0f3460 100%)",
      }}
    >
      {/* Status bar area */}
      <div className="flex items-center justify-between px-5 pt-2 pb-1">
        <span className="text-[13px] font-semibold text-white/80">
          {new Date().getHours()}:{new Date().getMinutes().toString().padStart(2, "0")}
        </span>
        <div className="flex items-center gap-1.5">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="white" className="opacity-70">
            <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/>
          </svg>
          <div className="flex items-end gap-[2px] h-[12px]">
            {[4, 6, 9, 11, 13].map((h, i) => (
              <div key={i} className="w-[2.5px] rounded-sm bg-white" style={{ height: h, opacity: i < 4 ? 0.8 : 0.3 }} />
            ))}
          </div>
        </div>
      </div>

      {/* Contact info */}
      <div className="flex flex-col items-center mt-10 mb-6 px-6">
        {/* Avatar */}
        <div className="relative mb-5">
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center text-white text-3xl font-semibold shadow-2xl"
            style={{ backgroundColor: contact.color }}
          >
            {contact.initials}
          </div>
          {isCalling && (
            <>
              <div className="absolute inset-0 rounded-full ring-wave" style={{ border: `2px solid ${contact.color}` }} />
              <div className="absolute inset-0 rounded-full ring-wave-2" style={{ border: `2px solid ${contact.color}` }} />
            </>
          )}
        </div>

        <h2 className="text-[26px] font-semibold text-white mb-1 text-center">{contact.name}</h2>
        <p className="text-[14px] text-white/60 mb-2">{contact.phone}</p>

        {/* Call status */}
        {isCalling && (
          <div className="flex items-center gap-1">
            <span className="text-[15px] text-white/70">Calling</span>
            <span className="text-[15px] text-white/70 animate-pulse">...</span>
          </div>
        )}
        {isActive && (
          <span className="text-[16px] font-mono text-white/80 tabular-nums">
            {formatDuration(duration)}
          </span>
        )}
        {isEnded && (
          <span className="text-[15px] text-white/60">Call ended</span>
        )}
      </div>

      {/* In-call keypad (slides up when visible) */}
      {isKeypadVisible && isActive && (
        <div
          className="mx-4 mb-4 rounded-2xl p-4 slide-up"
          style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
        >
          <div className="grid grid-cols-3 gap-y-2 gap-x-4">
            {KEYPAD_KEYS.map((key) => (
              <div key={key.digit} className="flex justify-center">
                <button
                  className="w-14 h-14 rounded-full flex flex-col items-center justify-center active:scale-95 transition-transform"
                  style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                  onMouseDown={() => onPressKey(key.digit)}
                  onTouchStart={() => onPressKey(key.digit)}
                >
                  <span className="text-[22px] font-light text-white leading-none">{key.digit}</span>
                  {key.letters && (
                    <span className="text-[9px] text-white/60 tracking-widest leading-none mt-0.5">{key.letters}</span>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action buttons */}
      {(isActive || isCalling) && (
        <div className="px-6 mb-6">
          <div className="grid grid-cols-3 gap-4 mb-6">
            {/* Mute */}
            <ActionButton
              label={isMuted ? "Unmute" : "Mute"}
              active={isMuted}
              onClick={onToggleMute}
              icon={
                isMuted ? (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 11h-1.7c0 .74-.16 1.43-.43 2.05l1.23 1.23c.56-.98.9-2.09.9-3.28zm-4.02.17c0-.06.02-.11.02-.17V5c0-1.66-1.34-3-3-3S9 3.34 9 5v.18l5.98 5.99zM4.27 3L3 4.27l6.01 6.01V11c0 1.66 1.33 3 2.99 3 .22 0 .44-.03.65-.08l1.66 1.66c-.71.33-1.5.52-2.31.52-2.76 0-5.3-2.1-5.3-5.1H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c.91-.13 1.77-.45 2.54-.9L19.73 21 21 19.73 4.27 3z"/>
                  </svg>
                ) : (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"/>
                  </svg>
                )
              }
            />

            {/* Keypad */}
            <ActionButton
              label="Keypad"
              active={isKeypadVisible}
              onClick={onToggleKeypad}
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 18h2v-2H3v2zm0-4h2v-2H3v2zm0-4h2V8H3v2zm4 8h2v-2H7v2zm0-4h2v-2H7v2zm0-4h2V8H7v2zm4 8h2v-2h-2v2zm0-4h2v-2h-2v2zm0-4h2V8h-2v2zm4-8v2h2V6h-2zm0 12h2v-2h-2v2zm0-4h2v-2h-2v2zm0-4h2V8h-2v2zM3 6v2h2V6H3z"/>
                </svg>
              }
            />

            {/* Speaker */}
            <ActionButton
              label={isSpeaker ? "Speaker" : "Speaker"}
              active={isSpeaker}
              onClick={onToggleSpeaker}
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                </svg>
              }
            />

            {/* Add call */}
            <ActionButton
              label="Add call"
              active={false}
              onClick={() => {}}
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
                </svg>
              }
            />

            {/* Hold */}
            <ActionButton
              label="Hold"
              active={false}
              onClick={() => {}}
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                </svg>
              }
            />

            {/* Bluetooth */}
            <ActionButton
              label="Bluetooth"
              active={false}
              onClick={() => {}}
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.71 7.71L12 2h-1v7.59L6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 11 14.41V22h1l5.71-5.71-4.3-4.29 4.3-4.29zM13 5.83l1.88 1.88L13 9.59V5.83zm1.88 10.46L13 18.17v-3.76l1.88 1.88z"/>
                </svg>
              }
            />
          </div>
        </div>
      )}

      {/* End call button */}
      <div className="flex justify-center mt-auto mb-10">
        <button
          className="w-[68px] h-[68px] rounded-full flex items-center justify-center shadow-xl transition-all active:scale-95"
          style={{ backgroundColor: "var(--samsung-red)" }}
          onClick={onEnd}
          aria-label="End call"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
            <path d="M12 9c-1.6 0-3.15.25-4.6.72v3.1c0 .39-.23.74-.56.9-.98.49-1.87 1.12-2.66 1.85-.18.18-.43.28-.7.28-.28 0-.53-.11-.71-.29L.29 13.08c-.18-.17-.29-.42-.29-.7 0-.28.11-.53.29-.71C3.34 8.78 7.46 7 12 7s8.66 1.78 11.71 4.67c.18.18.29.43.29.71 0 .28-.11.53-.29.71l-2.48 2.48c-.18.18-.43.29-.71.29-.27 0-.52-.1-.7-.28-.79-.73-1.68-1.36-2.66-1.85-.33-.16-.56-.51-.56-.9v-3.1C15.15 9.25 13.6 9 12 9z"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

function ActionButton({
  label,
  active,
  onClick,
  icon,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <button
        onClick={onClick}
        className="w-14 h-14 rounded-full flex items-center justify-center transition-all active:scale-95"
        style={{
          backgroundColor: active ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.15)",
          color: active ? "#1a1a2e" : "white",
        }}
        aria-label={label}
      >
        {icon}
      </button>
      <span className="text-[11px] text-white/70">{label}</span>
    </div>
  );
}
