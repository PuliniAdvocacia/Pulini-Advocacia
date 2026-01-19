
export interface NavLink {
  label: string;
  href: string;
}

export interface ServiceItem {
  title: string;
  description: string;
  icon: string;
}

// Chat message structure for AI interactions
export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
