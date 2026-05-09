/**
 * Samsung One UI Keypad Tab
 * Number display at top, 3x4 keypad grid, call/delete buttons
 * Long-press 0 for +, long-press delete to clear all
 */
import { useCallback, useRef, useState } from "react";
import { DialKey } from "./DialKey";
import { KEYPAD_KEYS } from "@/lib/mockData";

interface KeypadTabProps {
  dialedNumber: string;
  pressedKey: string | null;
  onPressKey: (digit: string) => void;
  onDelete: () => void;
  onClear: () => void;
  onCall: () => void;
}

export function KeypadTab({ dialedNumber, pressedKey, onPressKey, onDelete, onClear, onCall }: KeypadTabProps) {
  const deleteRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [deleteLong, setDeleteLong] = useState(false);

  const handleDeleteDown = useCallback(() => {
    deleteRef.current = setTimeout(() => {
      setDeleteLong(true);
      onClear();
    }, 600);
  }, [onClear]);

  const handleDeleteUp = useCallback(() => {
    if (deleteRef.current) {
      clearTimeout(deleteRef.current);
      deleteRef.current = null;
    }
    if (!deleteLong) {
      onDelete();
    }
    setDeleteLong(false);
  }, [deleteLong, onDelete]);

  // Format display number with spaces for readability
  const formatDisplay = (num: string) => {
    if (num.length <= 3) return num;
    if (num.length <= 6) return `${num.slice(0, 3)} ${num.slice(3)}`;
    if (num.length <= 10) return `${num.slice(0, 3)} ${num.slice(3, 6)} ${num.slice(6)}`;
    return num;
  };
  const displayNumber = formatDisplay(dialedNumber);

  const fontSize = dialedNumber.length > 10
    ? dialedNumber.length > 13 ? "text-2xl" : "text-3xl"
    : "text-4xl";

  return (
    <div className="flex flex-col flex-1 items-center justify-between px-4 pt-4 pb-4" style={{ minHeight: 0 }}>
      {/* Number display area */}
      <div className="w-full flex flex-col items-center justify-center min-h-[72px] relative px-12">
        {dialedNumber ? (
          <>
            <span
              key={dialedNumber}
              className={`${fontSize} font-light text-foreground tracking-wider number-pop`}
              style={{ fontFamily: "'Noto Sans', sans-serif", letterSpacing: "0.05em" }}
            >
              {displayNumber}
            </span>
            <span className="text-[11px] text-muted-foreground mt-0.5 opacity-70">+ Add to contacts</span>
          </>
        ) : (
          <span className="text-base text-muted-foreground font-normal">Enter a number</span>
        )}

        {/* Delete button */}
        {dialedNumber.length > 0 && (
          <button
            className="absolute right-2 p-2 rounded-full active:bg-muted transition-colors"
            onMouseDown={handleDeleteDown}
            onMouseUp={handleDeleteUp}
            onTouchStart={handleDeleteDown}
            onTouchEnd={handleDeleteUp}
            aria-label="Delete"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-foreground opacity-70">
              <path d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-3 12.59L17.59 17 14 13.41 10.41 17 9 15.59 12.59 12 9 8.41 10.41 7 14 10.59 17.59 7 19 8.41 15.41 12 19 15.59z"/>
            </svg>
          </button>
        )}
      </div>

      {/* Keypad grid */}
      <div className="grid grid-cols-3 gap-y-3 gap-x-6 w-full max-w-[280px]">
        {KEYPAD_KEYS.map((key) => (
          <div key={key.digit} className="flex justify-center">
            <DialKey
              digit={key.digit}
              letters={key.letters}
              onPress={onPressKey}
              isPressed={pressedKey === key.digit}
              size={68}
            />
          </div>
        ))}
      </div>

      {/* Bottom action row: video | call | contacts */}
      <div className="flex items-center justify-center gap-10 w-full max-w-[280px]">
        {/* Video call button */}
        <button
          className="w-14 h-14 rounded-full flex items-center justify-center transition-all active:scale-95"
          style={{ backgroundColor: "var(--key-bg)" }}
          onClick={() => {}}
          aria-label="Video call"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="text-foreground opacity-70">
            <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>
          </svg>
        </button>

        {/* Main call button */}
        <button
          className={`w-[68px] h-[68px] rounded-full flex items-center justify-center shadow-lg transition-all active:scale-95 ${dialedNumber ? "call-pulse" : "opacity-90"}`}
          style={{ backgroundColor: "var(--samsung-green)" }}
          onClick={onCall}
          aria-label="Call"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
          </svg>
        </button>

        {/* Contacts shortcut */}
        <button
          className="w-14 h-14 rounded-full flex items-center justify-center transition-all active:scale-95"
          style={{ backgroundColor: "var(--key-bg)" }}
          onClick={() => {}}
          aria-label="Contacts"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="text-foreground opacity-70">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
