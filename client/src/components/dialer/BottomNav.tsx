/**
 * Samsung One UI Bottom Navigation
 * Pill-shaped container with Keypad / Recents / Contacts tabs
 * Active tab has filled background pill, inactive tabs are transparent
 */
import { ActiveTab } from "@/hooks/useDialer";

interface BottomNavProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
}

const tabs: { id: ActiveTab; label: string; icon: React.ReactNode }[] = [
  {
    id: "keypad",
    label: "Keypad",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M3 18h2v-2H3v2zm0-4h2v-2H3v2zm0-4h2V8H3v2zm4 8h2v-2H7v2zm0-4h2v-2H7v2zm0-4h2V8H7v2zm4 8h2v-2h-2v2zm0-4h2v-2h-2v2zm0-4h2V8h-2v2zm4-8v2h2V6h-2zm0 12h2v-2h-2v2zm0-4h2v-2h-2v2zm0-4h2V8h-2v2zM3 6v2h2V6H3z"/>
      </svg>
    ),
  },
  {
    id: "recents",
    label: "Recents",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
      </svg>
    ),
  },
  {
    id: "contacts",
    label: "Contacts",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
      </svg>
    ),
  },
];

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <div className="px-4 pb-5 pt-2" style={{ backgroundColor: "var(--display-bg)" }}>
      <div
        className="flex items-center justify-around rounded-full p-1"
        style={{ backgroundColor: "var(--nav-bg)", boxShadow: "0 1px 6px rgba(0,0,0,0.08)" }}
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="flex flex-col items-center gap-0.5 flex-1 py-2 rounded-full transition-all duration-200 active:scale-95"
              style={{
                backgroundColor: isActive ? "var(--background)" : "transparent",
                boxShadow: isActive ? "0 1px 4px rgba(0,0,0,0.12)" : "none",
              }}
              aria-label={tab.label}
            >
              <span
                style={{
                  color: isActive ? "var(--samsung-green)" : "var(--muted-foreground)",
                  opacity: isActive ? 1 : 0.7,
                }}
              >
                {tab.icon}
              </span>
              <span
                className="text-[10px] font-semibold"
                style={{
                  color: isActive ? "var(--samsung-green)" : "var(--muted-foreground)",
                }}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
