export interface HeroContent {
  _id: string;
  headline: string;
  subheadline: string;
  typewriterRoles: string[];
  cvUrl: string;
  hireMeText: string;
  hireMeUrl: string;
}

export interface SocialLink {
  _id: string;
  platform: string;
  url: string;
  iconKey: string;
  order: number;
}

export interface Skill {
  _id: string;
  name: string;
  iconUrl: string;
  percentage: number;
  order: number;
}

export interface Project {
  _id: string;
  title: string;
  description: string;
  images: string[];
  techIcons: string[];
  githubUrl: string;
  liveUrl: string;
  demoEmail?: string;
  demoPassword?: string;
  featured: boolean;
  order: number;
}

export interface Testimonial {
  _id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  avatarUrl: string;
  order: number;
}
