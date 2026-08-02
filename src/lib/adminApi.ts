import { authedFetch } from "./authClient";
import type { HeroContent, SocialLink, Skill, Project, Testimonial } from "./types";

async function json<T>(res: Response): Promise<T> {
  return res.json() as Promise<T>;
}

export const adminApi = {
  getHero: () => authedFetch("/hero").then((r) => json<HeroContent | null>(r)),
  updateHero: (data: Partial<HeroContent>) =>
    authedFetch("/admin/hero", { method: "PUT", body: JSON.stringify(data) }).then((r) => json<HeroContent>(r)),

  list: <T>(resource: string) => authedFetch(`/admin/${resource}`).then((r) => json<T[]>(r)),
  create: <T>(resource: string, data: unknown) =>
    authedFetch(`/admin/${resource}`, { method: "POST", body: JSON.stringify(data) }).then((r) => json<T>(r)),
  update: <T>(resource: string, id: string, data: unknown) =>
    authedFetch(`/admin/${resource}/${id}`, { method: "PUT", body: JSON.stringify(data) }).then((r) => json<T>(r)),
  remove: (resource: string, id: string) => authedFetch(`/admin/${resource}/${id}`, { method: "DELETE" }),
};

export type { SocialLink, Skill, Project, Testimonial };
