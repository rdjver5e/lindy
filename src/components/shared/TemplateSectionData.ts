export interface AgentTemplate {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  icon: string;
  iconColor: string;
  isFeatured: boolean;
  accentColor?: string;
  roles: string[];
  useCases: string[];
}

export const allTemplates: AgentTemplate[] = [
  // ── FEATURED PLACEMENTS (Always skipped in 'All Templates' grid) ──
  { id: '11', slug: 'most-popular-featured', title: "Our users' favorite agents.", description: 'Top-rated agent templates', category: 'most_popular', icon: '⭐', iconColor: 'bg-amber-500', isFeatured: true, accentColor: 'bg-amber-50', roles: [], useCases: [] },
  { id: '1', slug: 'specs-to-shipping', title: 'From specs to shipping, get it done.', description: 'Ship products faster with AI', category: 'product', icon: '💻', iconColor: 'bg-blue-500', isFeatured: true, accentColor: 'bg-blue-50', roles: ['product', 'engineering'], useCases: ['productivity'] },
  { id: '6', slug: 'meetings-featured', title: 'Book, reschedule, and follow up, automatically.', description: 'Automate your meeting workflow', category: 'meetings', icon: '📅', iconColor: 'bg-blue-500', isFeatured: true, accentColor: 'bg-blue-50', roles: ['operations'], useCases: ['meetings'] },

  // ── ROW 1 OF NON-FEATURED ──
  { id: '7', slug: 'meeting-notetaker', title: 'Meeting Notetaker', description: 'Captures key meeting details, sends follow-ups, and answers questions...', category: 'most_popular', icon: '📝', iconColor: 'bg-blue-500', isFeatured: false, roles: ['operations', 'product'], useCases: ['meetings'] },
  { id: '12', slug: 'brand-monitor', title: 'Brand Monitor', description: "Track your brand's digital footprint", category: 'most_popular', icon: '📡', iconColor: 'bg-pink-500', isFeatured: false, roles: ['marketing'], useCases: ['research'] },
  { id: '13', slug: 'recruiting-agent', title: 'Recruiting Agent', description: 'Find and organize leads instantly', category: 'most_popular', icon: '👥', iconColor: 'bg-amber-500', isFeatured: false, roles: ['human_resources'], useCases: ['outreach'] },

  // ── ROW 2 OF NON-FEATURED ──
  { id: '14', slug: 'customer-support-email', title: 'Customer Support Email...', description: 'Quick, smart customer email responses', category: 'most_popular', icon: '✉️', iconColor: 'bg-emerald-500', isFeatured: false, roles: ['support'], useCases: ['emails'] },
  { id: '15', slug: 'sales-meeting-recorder', title: 'Sales Meeting Recorder', description: 'Take notes during sales calls and automatically update your CRM', category: 'most_popular', icon: '🎙️', iconColor: 'bg-orange-400', isFeatured: false, roles: ['sales'], useCases: ['meetings'] },
  { id: '2', slug: 'voice-of-customer', title: 'Voice of the Customer', description: 'Extract Customer insights and share them to your team.', category: 'product', icon: '💬', iconColor: 'bg-blue-500', isFeatured: false, roles: ['product', 'marketing'], useCases: ['research'] },

  // ── ROW 3 OF NON-FEATURED ──
  { id: '16', slug: 'pull-request-reviewer', title: 'Pull Request Reviewer', description: 'Reviews your code reviews according...', category: 'product', icon: '🔀', iconColor: 'bg-blue-600', isFeatured: false, roles: ['engineering'], useCases: ['productivity'] },
  { id: '17', slug: 'newsletter-writer', title: 'Newsletter Writer', description: 'Create engaging newsletters in...', category: 'product', icon: '📰', iconColor: 'bg-teal-500', isFeatured: false, roles: ['marketing'], useCases: ['content_creation'] },
  { id: '8', slug: 'meeting-scheduler', title: 'Meeting Scheduler', description: 'CC Lindy to your emails, just like a real EA, and have her schedule...', category: 'meetings', icon: '📅', iconColor: 'bg-blue-500', isFeatured: false, roles: ['operations'], useCases: ['meetings'] },

  // ── EXTRAS (Not visible in top fold) ──
  { id: '3', slug: 'competition-tracker', title: 'Competition Tracker', description: 'Monitor competitors with real-time insights', category: 'product', icon: '📊', iconColor: 'bg-emerald-500', isFeatured: false, roles: ['product', 'marketing'], useCases: ['research'] },
  { id: '4', slug: 'web-researcher', title: 'Web Researcher', description: 'Performs advanced research based on your request.', category: 'product', icon: '🔍', iconColor: 'bg-blue-500', isFeatured: false, roles: ['product', 'engineering'], useCases: ['research', 'web_scraper'] },
  { id: '5', slug: 'web-monitoring', title: 'Web Monitoring', description: 'Stay updated with real-time alerts', category: 'product', icon: '📡', iconColor: 'bg-blue-500', isFeatured: false, roles: ['product', 'operations'], useCases: ['productivity'] },
  { id: '9', slug: 'meeting-prep', title: 'Meeting Prep Assistant', description: 'Get ready for meetings in minutes', category: 'meetings', icon: '📋', iconColor: 'bg-orange-400', isFeatured: false, roles: ['operations', 'sales'], useCases: ['meetings'] },
  { id: '10', slug: 'meeting-coach', title: 'Meeting Coach', description: 'Enhance your meeting skills effortlessly.', category: 'meetings', icon: '🎯', iconColor: 'bg-blue-500', isFeatured: false, roles: ['operations'], useCases: ['coaching', 'meetings'] },
];

export const templateCategories = [
  { id: 'product', label: 'Product' },
  { id: 'meetings', label: 'Meetings' },
  { id: 'most_popular', label: 'Most popular' },
  { id: 'productivity', label: 'Productivity' },
  { id: 'sales', label: 'Sales' },
];
