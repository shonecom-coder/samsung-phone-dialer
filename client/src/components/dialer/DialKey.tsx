/**
 * Samsung One UI Dial Key
 * Circular key with large digit and small letter sub-label
 * Ripple effect on press, scale animation
 */
import { useCallback, useRef } from "react";

interface DialKeyProps {
  digit: string;
  letters?: string;
  onPress: (digit: string) => void;
  isPressed?: boolean;
  size?: number;
}

export function DialKey({ digit, letters, onPress, isPressed, size = 72 }: DialKeyProps) {
  const keyRef = useRef<HTMLButtonElement>(null);

  const handlePress = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    // Ripple
    const btn = keyRef.current;
    if (btn) {
      const rect = btn.getBoundingClientRect();
      const ripple = document.createElement("span");
      ripple.className = "ripple";
      const clientX = "touches" in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
      const x = clientX - rect.left - size / 2;
      const y = clientY - rect.top - size / 2;
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      ripple.style.width = `${size}px`;
      ripple.style.height = `${size}px`;
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 500);
    }
    onPress(digit);
  }, [digit, onPress, size]);

  const isSpecial = digit === "*" || digit === "#";

  return (
    <button
      ref={keyRef}
      className={`samsung-key select-none focus:outline-none ${isPressed ? "pressed" : ""}`}
      style={{ width: size, height: size }}
      onMouseDown={handlePress}
      onTouchStart={handlePress}
      aria-label={`Dial ${digit}`}
    >
      <span
        className="font-light text-foreground leading-none"
        style={{ fontSize: isSpecial ? size * 0.38 : size * 0.42 }}
      >
        {digit}
      </span>
      {letters && (
        <span
          className="text-muted-foreground font-medium tracking-widest leading-none mt-[2px]"
          style={{ fontSize: size * 0.155 }}
        >
          {letters}
        </span>
      )}
    </button>
  );
}
