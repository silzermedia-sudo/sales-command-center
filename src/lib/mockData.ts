export interface ProspectData {
  name: string;
  company: string;
  website: string;
  linkedinUrl: string;
}

export interface LinkedInData {
  name: string;
  position: string;
  tenure: string;
  mutualConnections: number;
  recentPosts: { text: string; date: string; likes: number }[];
  activityLevel: "high" | "medium" | "low";
}

export interface CompanyData {
  industry: string;
  employees: string;
  revenue: string;
  hq: string;
  locations: string[];
  recentNews: { title: string; date: string }[];
}

export interface BuyingSignalData {
  hiring: { label: string; trend: "up" | "down" | "neutral" };
  expansion: string;
  funding: string;
  socialSpikes: string;
  confidenceScore: number;
}

export interface CallOpener {
  type: "personalized" | "roi" | "provocative" | "trust";
  text: string;
}

export interface PainPoint {
  pain: string;
  question: string;
  objection: string;
}

export interface GuideStep {
  phase: string;
  content: string;
}

export interface LocationData {
  name: string;
  lat: number;
  lng: number;
  type: "hq" | "office";
}

export interface ActivitySlot {
  hour: string;
  day: string;
  intensity: number; // 0 to 1
}

export function generateMockData(prospect: ProspectData) {
  const linkedin: LinkedInData = {
    name: prospect.name || "Sarah Mitchell",
    position: "VP of Sales Operations",
    tenure: "2 years, 4 months",
    mutualConnections: 12,
    recentPosts: [
      { text: "Excited to announce our team grew 40% this quarter! 🚀", date: "2 days ago", likes: 142 },
      { text: "The future of B2B sales is AI-augmented, not AI-replaced.", date: "1 week ago", likes: 89 },
      { text: "Just wrapped up our Q4 planning session. Big things ahead!", date: "2 weeks ago", likes: 67 },
    ],
    activityLevel: "high",
  };

  const company: CompanyData = {
    industry: "Enterprise SaaS",
    employees: "500–1,000",
    revenue: "$50M – $100M ARR",
    hq: "San Francisco, CA",
    locations: ["San Francisco, CA", "Austin, TX", "London, UK", "Berlin, DE"],
    recentNews: [
      { title: `${prospect.company || "TechCorp"} raises $45M Series C`, date: "3 weeks ago" },
      { title: "New VP of Engineering joins from Stripe", date: "1 month ago" },
      { title: "Expands EMEA operations with Berlin office", date: "2 months ago" },
    ],
  };

  const buyingSignals: BuyingSignalData = {
    hiring: { label: "12 open sales roles", trend: "up" },
    expansion: "New EMEA office opened in Berlin",
    funding: "Series C ($45M) – 3 weeks ago",
    socialSpikes: "CEO mentioned 'scaling challenges' in podcast",
    confidenceScore: 78,
  };

  const openers: CallOpener[] = [
    { type: "personalized", text: `Hi ${prospect.name || "Sarah"}, I noticed your team grew 40% last quarter – congrats! I'm curious how you're handling the onboarding at that scale.` },
    { type: "personalized", text: `${prospect.name || "Sarah"}, I saw your post about AI in B2B sales – we're seeing the same trend with our customers.` },
    { type: "personalized", text: `With your new Berlin office, I imagine cross-region alignment is top of mind right now.` },
    { type: "roi", text: `Companies your size typically leave $2-3M on the table annually in pipeline leakage. Would it be worth a 15-min chat to see if that applies?` },
    { type: "provocative", text: `Most VPs of Sales Ops I talk to say their CRM data is 30% inaccurate. What would you say yours is?` },
    { type: "trust", text: `I've helped 3 SaaS companies at your stage reduce their sales cycle by 22%. Happy to share what worked – no strings attached.` },
  ];

  const painPoints: PainPoint[] = [
    { pain: "Scaling sales processes during rapid growth", question: "How are you ensuring consistency as your team grows?", objection: "We already have processes in place." },
    { pain: "Cross-region sales alignment", question: "How do you handle handoffs between US and EMEA teams?", objection: "Our regional leads handle that." },
    { pain: "CRM data quality at scale", question: "How confident are you in your pipeline accuracy right now?", objection: "We just cleaned up our data last quarter." },
    { pain: "Onboarding new reps quickly", question: "What does ramp time look like for new hires?", objection: "We have a solid onboarding program." },
    { pain: "Forecasting accuracy with new markets", question: "How are you adjusting forecasts for EMEA?", objection: "We're using historical benchmarks." },
  ];

  const guide: GuideStep[] = [
    { phase: "Opener", content: "Reference their recent LinkedIn post about team growth. Show genuine interest." },
    { phase: "Qualification", content: "Confirm they're responsible for sales ops tooling decisions. Ask about current tech stack." },
    { phase: "Pain Discovery", content: "Probe around scaling challenges. Ask about cross-region alignment pain." },
    { phase: "Value Prop", content: "Position your solution around reducing ramp time and improving forecast accuracy." },
    { phase: "Objection Handling", content: "Expect 'we already have tools' – differentiate on AI-powered insights." },
    { phase: "Close", content: "Suggest a 20-minute deep dive with their team lead. Offer a custom ROI analysis." },
  ];

  const locations: LocationData[] = [
    { name: "HQ – San Francisco", lat: 37.7749, lng: -122.4194, type: "hq" },
    { name: "Austin Office", lat: 30.2672, lng: -97.7431, type: "office" },
    { name: "London Office", lat: 51.5074, lng: -0.1278, type: "office" },
    { name: "Berlin Office", lat: 52.5200, lng: 13.4050, type: "office" },
  ];

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const hours = ["8AM", "9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM"];
  const activity: ActivitySlot[] = [];
  days.forEach(day => {
    hours.forEach(hour => {
      let intensity = Math.random();
      if (hour === "10AM" || hour === "11AM") intensity = 0.6 + Math.random() * 0.4;
      if (hour === "2PM" || hour === "3PM") intensity = 0.5 + Math.random() * 0.4;
      if (day === "Mon" || day === "Tue") intensity = Math.min(1, intensity + 0.15);
      activity.push({ hour, day, intensity: Math.round(intensity * 100) / 100 });
    });
  });

  return { linkedin, company, buyingSignals, openers, painPoints, guide, locations, activity };
}
