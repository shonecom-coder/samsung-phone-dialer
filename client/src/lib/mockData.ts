export interface Contact {
  id: string;
  name: string;
  phone: string;
  initials: string;
  color: string;
  favorite?: boolean;
}

export interface RecentCall {
  id: string;
  name: string;
  phone: string;
  type: "incoming" | "outgoing" | "missed";
  time: string;
  duration?: string;
  initials: string;
  color: string;
}

export const CONTACTS: Contact[] = [
  { id: "1", name: "Alice Johnson", phone: "+1 (555) 234-5678", initials: "AJ", color: "#E91E63", favorite: true },
  { id: "2", name: "Bob Martinez", phone: "+1 (555) 345-6789", initials: "BM", color: "#9C27B0", favorite: true },
  { id: "3", name: "Carol White", phone: "+1 (555) 456-7890", initials: "CW", color: "#2196F3" },
  { id: "4", name: "David Kim", phone: "+1 (555) 567-8901", initials: "DK", color: "#4CAF50" },
  { id: "5", name: "Emma Davis", phone: "+1 (555) 678-9012", initials: "ED", color: "#FF9800" },
  { id: "6", name: "Frank Lee", phone: "+1 (555) 789-0123", initials: "FL", color: "#00BCD4" },
  { id: "7", name: "Grace Chen", phone: "+1 (555) 890-1234", initials: "GC", color: "#F44336" },
  { id: "8", name: "Henry Wilson", phone: "+1 (555) 901-2345", initials: "HW", color: "#607D8B" },
  { id: "9", name: "Iris Park", phone: "+1 (555) 012-3456", initials: "IP", color: "#795548" },
  { id: "10", name: "James Brown", phone: "+1 (555) 123-4567", initials: "JB", color: "#3F51B5" },
  { id: "11", name: "Karen Taylor", phone: "+1 (555) 234-5670", initials: "KT", color: "#009688" },
  { id: "12", name: "Liam Anderson", phone: "+1 (555) 345-6780", initials: "LA", color: "#FF5722" },
  { id: "13", name: "Mia Thompson", phone: "+1 (555) 456-7891", initials: "MT", color: "#8BC34A" },
  { id: "14", name: "Noah Garcia", phone: "+1 (555) 567-8902", initials: "NG", color: "#FFC107" },
  { id: "15", name: "Olivia Harris", phone: "+1 (555) 678-9013", initials: "OH", color: "#673AB7" },
];

export const RECENT_CALLS: RecentCall[] = [
  { id: "1", name: "Alice Johnson", phone: "+1 (555) 234-5678", type: "incoming", time: "Just now", duration: "3m 24s", initials: "AJ", color: "#E91E63" },
  { id: "2", name: "+1 (555) 999-0000", phone: "+1 (555) 999-0000", type: "missed", time: "5 min ago", initials: "?", color: "#9E9E9E" },
  { id: "3", name: "Bob Martinez", phone: "+1 (555) 345-6789", type: "outgoing", time: "1 hr ago", duration: "12m 05s", initials: "BM", color: "#9C27B0" },
  { id: "4", name: "Carol White", phone: "+1 (555) 456-7890", type: "missed", time: "2 hr ago", initials: "CW", color: "#2196F3" },
  { id: "5", name: "David Kim", phone: "+1 (555) 567-8901", type: "incoming", time: "Yesterday", duration: "0m 48s", initials: "DK", color: "#4CAF50" },
  { id: "6", name: "Emma Davis", phone: "+1 (555) 678-9012", type: "outgoing", time: "Yesterday", duration: "5m 12s", initials: "ED", color: "#FF9800" },
  { id: "7", name: "Frank Lee", phone: "+1 (555) 789-0123", type: "incoming", time: "Mon", duration: "1m 33s", initials: "FL", color: "#00BCD4" },
  { id: "8", name: "+1 (555) 777-8888", phone: "+1 (555) 777-8888", type: "missed", time: "Sun", initials: "?", color: "#9E9E9E" },
  { id: "9", name: "Grace Chen", phone: "+1 (555) 890-1234", type: "outgoing", time: "Sat", duration: "8m 55s", initials: "GC", color: "#F44336" },
  { id: "10", name: "Henry Wilson", phone: "+1 (555) 901-2345", type: "incoming", time: "Fri", duration: "2m 10s", initials: "HW", color: "#607D8B" },
];

export const KEYPAD_KEYS = [
  { digit: "1", letters: "" },
  { digit: "2", letters: "ABC" },
  { digit: "3", letters: "DEF" },
  { digit: "4", letters: "GHI" },
  { digit: "5", letters: "JKL" },
  { digit: "6", letters: "MNO" },
  { digit: "7", letters: "PQRS" },
  { digit: "8", letters: "TUV" },
  { digit: "9", letters: "WXYZ" },
  { digit: "*", letters: "" },
  { digit: "0", letters: "+" },
  { digit: "#", letters: "" },
];
