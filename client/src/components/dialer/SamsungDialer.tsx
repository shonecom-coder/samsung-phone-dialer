/**
 * Samsung One UI Phone Dialer — Main Component
 * Design: Samsung One UI 6 with light/dark mode
 * Layout: Phone frame on desktop, full-screen on mobile
 * Tabs: Keypad | Recents | Contacts
 * Overlays: Active call screen, Incoming call screen
 */
import { useDialer } from "@/hooks/useDialer";
import { StatusBar } from "./StatusBar";
import { KeypadTab } from "./KeypadTab";
import { RecentsTab } from "./RecentsTab";
import { ContactsTab } from "./ContactsTab";
import { BottomNav } from "./BottomNav";
import { CallScreen } from "./CallScreen";
import { IncomingCallScreen } from "./IncomingCallScreen";
import { Contact } from "@/lib/mockData";

export function SamsungDialer() {
  const dialer = useDialer();

  const handleCall = (phone?: string, contact?: Contact) => {
    dialer.makeCall(phone, contact);
  };

  const showCallScreen =
    dialer.callState === "calling" ||
    dialer.callState === "active" ||
    dialer.callState === "ended";

  const showIncomingScreen = dialer.callState === "incoming" && dialer.showIncoming;

  return (
    <div
      className="relative flex flex-col overflow-hidden"
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "var(--display-bg)",
      }}
    >
      {/* Status Bar */}
      <StatusBar />

      {/* Main content area — flex-1 so it fills space between status bar and bottom nav */}
      <div className="flex flex-col flex-1 overflow-hidden relative" style={{ minHeight: 0 }}>
        {/* Tab content */}
        {dialer.activeTab === "keypad" && (
          <KeypadTab
            dialedNumber={dialer.dialedNumber}
            pressedKey={dialer.pressedKey}
            onPressKey={dialer.pressKey}
            onDelete={dialer.deleteDigit}
            onClear={dialer.clearNumber}
            onCall={() => handleCall()}
          />
        )}
        {dialer.activeTab === "recents" && (
          <RecentsTab onCall={handleCall} />
        )}
        {dialer.activeTab === "contacts" && (
          <ContactsTab onCall={handleCall} />
        )}

        {/* Active / Calling / Ended call overlay */}
        {showCallScreen && (
          <CallScreen
            callState={dialer.callState}
            contact={dialer.callContact}
            duration={dialer.callDuration}
            formatDuration={dialer.formatDuration}
            isMuted={dialer.isMuted}
            isSpeaker={dialer.isSpeaker}
            isKeypadVisible={dialer.isKeypadVisible}
            pressedKey={dialer.pressedKey}
            onEnd={dialer.endCall}
            onToggleMute={dialer.toggleMute}
            onToggleSpeaker={dialer.toggleSpeaker}
            onToggleKeypad={dialer.toggleKeypad}
            onPressKey={dialer.pressKey}
          />
        )}

        {/* Incoming call overlay */}
        {showIncomingScreen && (
          <IncomingCallScreen
            contact={dialer.callContact}
            onAccept={dialer.acceptCall}
            onDecline={dialer.declineCall}
          />
        )}
      </div>

      {/* Bottom Navigation */}
      {!showCallScreen && !showIncomingScreen && (
        <BottomNav
          activeTab={dialer.activeTab}
          onTabChange={dialer.setActiveTab}
        />
      )}

      {/* Demo: Simulate incoming call button */}
      {!showCallScreen && !showIncomingScreen && (
        <button
          onClick={dialer.simulateIncoming}
          className="absolute bottom-24 right-3 text-[9px] text-muted-foreground/40 px-1.5 py-0.5 rounded border border-border/30 hover:opacity-70 transition-opacity"
          title="Simulate incoming call"
        >
          📞 sim
        </button>
      )}
    </div>
  );
}
