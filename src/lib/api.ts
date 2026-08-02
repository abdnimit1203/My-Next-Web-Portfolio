import type { HeroContent, SocialLink, Skill, Project, Testimonial } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api";

async function getJson<T>(path: string, fallback: T): Promise<T> {
  try {
    const res = await fetch(`${API_URL}${path}`, { next: { revalidate: 60 } });
    if (!res.ok) return fallback;
    return (await res.json()) as T;
  } catch {
    return fallback;
  }
}

export const getHero = () => getJson<HeroContent | null>("/hero", null);
export const getSocials = () => getJson<SocialLink[]>("/socials", []);
export const getSkills = () => getJson<Skill[]>("/skills", []);
export const getProjects = () => getJson<Project[]>("/projects", []);
export const getTestimonials = () => getJson<Testimonial[]>("/testimonials", []);
