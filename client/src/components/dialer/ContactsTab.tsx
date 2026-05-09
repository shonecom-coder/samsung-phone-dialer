/**
 * Samsung One UI Contacts Tab
 * Alphabetical contact list with avatars, search bar, favorites section
 */
import { useState, useMemo } from "react";
import { CONTACTS, Contact } from "@/lib/mockData";

interface ContactsTabProps {
  onCall: (phone: string, contact: Contact) => void;
}

export function ContactsTab({ onCall }: ContactsTabProps) {
  const [search, setSearch] = useState("");

  const favorites = useMemo(() => CONTACTS.filter((c) => c.favorite), []);

  const filtered = useMemo(() => {
    if (!search) return CONTACTS;
    const q = search.toLowerCase();
    return CONTACTS.filter(
      (c) => c.name.toLowerCase().includes(q) || c.phone.includes(q)
    );
  }, [search]);

  // Group by first letter
  const grouped = useMemo(() => {
    const map: Record<string, Contact[]> = {};
    filtered.forEach((c) => {
      const letter = c.name[0].toUpperCase();
      if (!map[letter]) map[letter] = [];
      map[letter].push(c);
    });
    return Object.entries(map).sort(([a], [b]) => a.localeCompare(b));
  }, [filtered]);

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3">
        <h2 className="text-[22px] font-bold text-foreground">Contacts</h2>
        <div className="flex items-center gap-2">
          <button className="p-1 rounded-full active:bg-muted" aria-label="Add contact">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="text-foreground opacity-70">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
            </svg>
          </button>
          <button className="p-1 rounded-full active:bg-muted" aria-label="More">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-foreground opacity-70">
              <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Search bar */}
      <div className="px-4 mb-2">
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-full"
          style={{ backgroundColor: "var(--key-bg)" }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-muted-foreground flex-shrink-0">
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </svg>
          <input
            type="text"
            placeholder="Search contacts"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent text-[14px] text-foreground placeholder:text-muted-foreground outline-none"
            style={{ userSelect: "text", WebkitUserSelect: "text" }}
          />
          {search && (
            <button onClick={() => setSearch("")} className="text-muted-foreground">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Contact list */}
      <div className="flex-1 overflow-y-auto no-scrollbar">
        {/* Favorites */}
        {!search && favorites.length > 0 && (
          <div>
            <div className="px-4 py-1.5">
              <span className="text-[12px] font-semibold text-muted-foreground uppercase tracking-wider">Favorites</span>
            </div>
            {favorites.map((contact) => (
              <ContactRow key={contact.id} contact={contact} onCall={onCall} />
            ))}
            <div className="h-px bg-border mx-4 my-1" />
          </div>
        )}

        {/* Alphabetical groups */}
        {grouped.map(([letter, contacts]) => (
          <div key={letter}>
            <div className="px-4 py-1">
              <span className="text-[12px] font-semibold text-muted-foreground">{letter}</span>
            </div>
            {contacts.map((contact) => (
              <ContactRow key={contact.id} contact={contact} onCall={onCall} />
            ))}
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor" className="opacity-30 mb-3">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
            <p className="text-sm">No contacts found</p>
          </div>
        )}
      </div>
    </div>
  );
}

function ContactRow({ contact, onCall }: { contact: Contact; onCall: (phone: string, contact: Contact) => void }) {
  return (
    <div
      className="flex items-center px-4 py-2.5 active:bg-muted/50 transition-colors"
      onClick={() => onCall(contact.phone, contact)}
    >
      {/* Avatar */}
      <div
        className="w-11 h-11 rounded-full flex items-center justify-center text-white font-semibold text-base flex-shrink-0 mr-3"
        style={{ backgroundColor: contact.color }}
      >
        {contact.initials}
      </div>
      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-[15px] font-medium text-foreground truncate">{contact.name}</p>
        <p className="text-[12px] text-muted-foreground truncate">{contact.phone}</p>
      </div>
      {/* Favorite star */}
      {contact.favorite && (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-yellow-400 ml-2">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
        </svg>
      )}
    </div>
  );
}
