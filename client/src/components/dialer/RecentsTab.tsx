/**
 * Samsung One UI Recents Tab
 * Shows recent call list with call type icons, timestamps, contact avatars
 */
import { RECENT_CALLS, RecentCall } from "@/lib/mockData";
import { Contact } from "@/lib/mockData";

interface RecentsTabProps {
  onCall: (phone: string, contact?: Contact) => void;
}

function CallTypeIcon({ type }: { type: RecentCall["type"] }) {
  if (type === "incoming") {
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-green-500">
        <path d="M20 5.41L18.59 4 7 15.59V9H5v10h10v-2H8.41z"/>
      </svg>
    );
  }
  if (type === "outgoing") {
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-blue-500">
        <path d="M4 18.59L5.41 20 17 8.41V15h2V5H9v2h6.59z"/>
      </svg>
    );
  }
  // missed
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-red-500">
      <path d="M20 5.41L18.59 4 7 15.59V9H5v10h10v-2H8.41z"/>
    </svg>
  );
}

export function RecentsTab({ onCall }: RecentsTabProps) {
  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3">
        <h2 className="text-[22px] font-bold text-foreground">Recents</h2>
        <div className="flex items-center gap-3">
          <button className="p-1 rounded-full active:bg-muted" aria-label="Filter">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-foreground opacity-70">
              <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"/>
            </svg>
          </button>
          <button className="p-1 rounded-full active:bg-muted" aria-label="Search">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-foreground opacity-70">
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            </svg>
          </button>
          <button className="p-1 rounded-full active:bg-muted" aria-label="More">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-foreground opacity-70">
              <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Call list */}
      <div className="flex-1 overflow-y-auto no-scrollbar">
        {RECENT_CALLS.map((call) => (
          <div
            key={call.id}
            className="flex items-center px-4 py-2.5 active:bg-muted/50 transition-colors"
          >
            {/* Avatar */}
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center text-white font-semibold text-base flex-shrink-0 mr-3"
              style={{ backgroundColor: call.color }}
            >
              {call.initials}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <CallTypeIcon type={call.type} />
                <span
                  className={`text-[15px] font-medium truncate ${call.type === "missed" ? "text-red-500" : "text-foreground"}`}
                >
                  {call.name}
                </span>
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-[12px] text-muted-foreground">{call.time}</span>
                {call.duration && (
                  <>
                    <span className="text-muted-foreground opacity-40">·</span>
                    <span className="text-[12px] text-muted-foreground">{call.duration}</span>
                  </>
                )}
              </div>
            </div>

            {/* Call back button */}
            <button
              className="w-9 h-9 rounded-full flex items-center justify-center active:bg-muted ml-2"
              onClick={() => onCall(call.phone)}
              aria-label={`Call ${call.name}`}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-foreground opacity-60">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
