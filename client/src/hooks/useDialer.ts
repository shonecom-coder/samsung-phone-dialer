import { useCallback, useEffect, useRef, useState } from "react";
import { CONTACTS, Contact } from "@/lib/mockData";

export type CallState = "idle" | "calling" | "active" | "incoming" | "ended";
export type ActiveTab = "keypad" | "recents" | "contacts";

export function useDialer() {
  const [dialedNumber, setDialedNumber] = useState("");
  const [activeTab, setActiveTab] = useState<ActiveTab>("keypad");
  const [callState, setCallState] = useState<CallState>("idle");
  const [callContact, setCallContact] = useState<Contact | null>(null);
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaker, setIsSpeaker] = useState(false);
  const [isKeypadVisible, setIsKeypadVisible] = useState(false);
  const [pressedKey, setPressedKey] = useState<string | null>(null);
  const [showIncoming, setShowIncoming] = useState(false);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const callingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Format call duration
  const formatDuration = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  // Start active call timer
  const startTimer = useCallback(() => {
    timerRef.current = setInterval(() => {
      setCallDuration((d) => d + 1);
    }, 1000);
  }, []);

  // Stop timer
  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (callingTimerRef.current) {
      clearTimeout(callingTimerRef.current);
      callingTimerRef.current = null;
    }
  }, []);

  // Press a key
  const pressKey = useCallback((digit: string) => {
    setPressedKey(digit);
    setTimeout(() => setPressedKey(null), 150);
    setDialedNumber((prev) => {
      if (prev.length >= 15) return prev;
      return prev + digit;
    });
  }, []);

  // Delete last digit
  const deleteDigit = useCallback(() => {
    setDialedNumber((prev) => prev.slice(0, -1));
  }, []);

  // Clear all
  const clearNumber = useCallback(() => {
    setDialedNumber("");
  }, []);

  // Find contact by number
  const findContact = useCallback((number: string) => {
    return CONTACTS.find((c) => c.phone.replace(/\D/g, "").includes(number.replace(/\D/g, ""))) || null;
  }, []);

  // Initiate a call
  const makeCall = useCallback((number?: string, contact?: Contact) => {
    const num = number || dialedNumber;
    if (!num) return;
    const found = contact || findContact(num);
    setCallContact(found || { id: "unknown", name: num, phone: num, initials: "#", color: "#607D8B" });
    setCallState("calling");
    setCallDuration(0);
    setIsMuted(false);
    setIsSpeaker(false);
    setIsKeypadVisible(false);

    // Simulate call being answered after 3-6 seconds
    callingTimerRef.current = setTimeout(() => {
      setCallState("active");
      startTimer();
    }, 3500);
  }, [dialedNumber, findContact, startTimer]);

  // End call
  const endCall = useCallback(() => {
    stopTimer();
    setCallState("ended");
    setTimeout(() => {
      setCallState("idle");
      setCallContact(null);
      setCallDuration(0);
      setIsKeypadVisible(false);
    }, 1200);
  }, [stopTimer]);

  // Accept incoming call
  const acceptCall = useCallback(() => {
    setShowIncoming(false);
    setCallState("active");
    startTimer();
  }, [startTimer]);

  // Decline incoming call
  const declineCall = useCallback(() => {
    setShowIncoming(false);
    setCallState("idle");
    setCallContact(null);
  }, []);

  // Simulate incoming call
  const simulateIncoming = useCallback(() => {
    const randomContact = CONTACTS[Math.floor(Math.random() * CONTACTS.length)];
    setCallContact(randomContact);
    setShowIncoming(true);
    setCallState("incoming");
  }, []);

  // Toggle mute
  const toggleMute = useCallback(() => setIsMuted((m) => !m), []);

  // Toggle speaker
  const toggleSpeaker = useCallback(() => setIsSpeaker((s) => !s), []);

  // Toggle in-call keypad
  const toggleKeypad = useCallback(() => setIsKeypadVisible((v) => !v), []);

  // Format dialed number for display
  const formattedNumber = dialedNumber;

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopTimer();
    };
  }, [stopTimer]);

  return {
    dialedNumber,
    formattedNumber,
    activeTab,
    setActiveTab,
    callState,
    callContact,
    callDuration,
    formatDuration,
    isMuted,
    isSpeaker,
    isKeypadVisible,
    pressedKey,
    showIncoming,
    pressKey,
    deleteDigit,
    clearNumber,
    makeCall,
    endCall,
    acceptCall,
    declineCall,
    simulateIncoming,
    toggleMute,
    toggleSpeaker,
    toggleKeypad,
  };
}
