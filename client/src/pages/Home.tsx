/**
 * Home page — Samsung One UI Phone Dialer
 * Desktop: Shows phone mockup frame centered on gradient background
 * Mobile: Full-screen dialer
 */
import { SamsungDialer } from "@/components/dialer/SamsungDialer";
import { useTheme } from "@/contexts/ThemeContext";

export default function Home() {
  const { theme } = useTheme();

  return (
    <>
      {/* Desktop layout: phone frame on gradient background */}
      <div
        className="hidden md:flex items-center justify-center min-h-screen"
        style={{
          background: theme === "dark"
            ? "radial-gradient(ellipse at 30% 20%, #1a1a3e 0%, #0a0a1a 40%, #000 100%)"
            : "radial-gradient(ellipse at 60% 30%, #dce8ff 0%, #c5d8ff 30%, #e8d8ff 70%, #f5e8ff 100%)",
        }}
      >
        {/* Samsung-style branding text */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 flex flex-col items-center">
          <span
            className="text-[13px] font-semibold tracking-[0.3em] uppercase"
            style={{ color: theme === "dark" ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.25)" }}
          >
            Samsung One UI
          </span>
        </div>

        {/* Phone frame */}
        <div
          className="relative phone-shadow"
          style={{
            width: 375,
            height: 812,
            borderRadius: 44,
            backgroundColor: theme === "dark" ? "#050505" : "#f8f8f8",
            padding: "0",
            overflow: "visible",
            border: theme === "dark" ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.08)",
          }}
        >


          {/* Phone chrome — bottom home indicator */}
          <div
            className="absolute bottom-2 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
            style={{
              width: 130,
              height: 5,
              borderRadius: 3,
              backgroundColor: theme === "dark" ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.25)",
            }}
          />

          {/* Side buttons */}
          {/* Power button (right) */}
          <div
            className="absolute"
            style={{
              right: -3,
              top: 160,
              width: 4,
              height: 56,
              borderRadius: "0 3px 3px 0",
              backgroundColor: theme === "dark" ? "#2a2a2a" : "#d0d0d0",
            }}
          />
          {/* Volume up (left) */}
          <div
            className="absolute"
            style={{
              left: -3,
              top: 140,
              width: 4,
              height: 40,
              borderRadius: "3px 0 0 3px",
              backgroundColor: theme === "dark" ? "#2a2a2a" : "#d0d0d0",
            }}
          />
          {/* Volume down (left) */}
          <div
            className="absolute"
            style={{
              left: -3,
              top: 192,
              width: 4,
              height: 40,
              borderRadius: "3px 0 0 3px",
              backgroundColor: theme === "dark" ? "#2a2a2a" : "#d0d0d0",
            }}
          />

          {/* Screen content container with overflow hidden */}
          <div
            className="absolute inset-0"
            style={{ borderRadius: 44, overflow: "hidden" }}
          >
            {/* Dialer content — with top padding for notch */}
            <div
              className="absolute inset-0"
              style={{ paddingTop: 44 }}
            >
              <SamsungDialer />
            </div>

            {/* Dynamic island overlay on screen */}
            <div
              className="absolute top-[10px] left-1/2 -translate-x-1/2 z-50 pointer-events-none"
              style={{
                width: 126,
                height: 34,
                borderRadius: 20,
                backgroundColor: "#000",
              }}
            />

            {/* Inner screen bezel */}
            <div
              className="absolute inset-0 pointer-events-none z-40"
              style={{
                borderRadius: 44,
                boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.06)",
              }}
            />
          </div>
        </div>

        {/* Samsung label below phone */}
        <div className="absolute" style={{ top: "calc(50% + 420px)", left: "50%", transform: "translateX(-50%)" }}>
          <span
            className="text-[11px] font-medium tracking-[0.25em] uppercase"
            style={{ color: theme === "dark" ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.25)" }}
          >
            SAMSUNG
          </span>
        </div>
        {/* Bottom hint */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
          <span
            className="text-[10px] tracking-wide"
            style={{ color: theme === "dark" ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.18)" }}
          >
            Tap 🌙/☀ in status bar to toggle dark mode &nbsp;·&nbsp; Tap "sim" to test incoming call
          </span>
        </div>
      </div>

      {/* Mobile layout: full screen */}
      <div className="md:hidden flex flex-col" style={{ height: "100dvh" }}>
        <SamsungDialer />
      </div>
    </>
  );
}
