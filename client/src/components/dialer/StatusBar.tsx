/**
 * Samsung One UI Status Bar
 * Shows time, signal, wifi, battery icons
 * Light: dark text on white | Dark: white text on black
 */
import { useEffect, useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";

export function StatusBar() {
  const [time, setTime] = useState("");
  const { theme, toggleTheme, switchable } = useTheme();

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const h = now.getHours();
      const m = now.getMinutes().toString().padStart(2, "0");
      setTime(`${h}:${m}`);
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="flex items-center justify-between px-5 pt-2 pb-1 select-none"
      style={{ backgroundColor: "var(--status-bar-bg)" }}
    >
      {/* Time */}
      <span className="text-[13px] font-semibold text-foreground tracking-tight">{time}</span>

      {/* Right icons */}
      <div className="flex items-center gap-[5px]">
        {/* Theme toggle (hidden in real Samsung, shown for demo) */}
        <button
          onClick={toggleTheme}
          className="text-[10px] font-medium text-muted-foreground px-1.5 py-0.5 rounded-full border border-border"
          style={{ fontSize: 9 }}
        >
          {theme === "dark" ? "☀" : "🌙"}
        </button>

        {/* Mute icon */}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-foreground opacity-70">
          <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
        </svg>

        {/* WiFi */}
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" className="text-foreground">
          <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/>
        </svg>

        {/* Signal bars */}
        <div className="flex items-end gap-[2px] h-[13px]">
          {[4, 6, 9, 11, 13].map((h, i) => (
            <div
              key={i}
              className="w-[2.5px] rounded-sm"
              style={{
                height: h,
                backgroundColor: i < 4 ? "currentColor" : "currentColor",
                opacity: i < 4 ? 1 : 0.35,
              }}
            />
          ))}
        </div>

        {/* Battery */}
        <div className="flex items-center gap-[1px]">
          <div className="relative w-[22px] h-[11px] border border-foreground rounded-[2px] overflow-hidden">
            <div className="absolute inset-[1px] left-[1px] right-[3px] bg-foreground rounded-[1px]" style={{ width: "75%" }} />
          </div>
          <div className="w-[1.5px] h-[5px] bg-foreground rounded-r-sm opacity-70" />
        </div>
      </div>
    </div>
  );
}
