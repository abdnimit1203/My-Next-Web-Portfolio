import { getHero, getSocials, getSkills, getProjects, getTestimonials } from "@/lib/api";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { About } from "@/components/sections/About";
import { Stats } from "@/components/sections/Stats";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";
import { ScrollProgress } from "@/components/ScrollProgress";
import { BackgroundGlow } from "@/components/BackgroundGlow";

export default async function Home() {
  const [hero, socials, skills, projects, testimonials] = await Promise.all([
    getHero(),
    getSocials(),
    getSkills(),
    getProjects(),
    getTestimonials(),
  ]);

  return (
    <>
      <ScrollProgress />
      <BackgroundGlow />
      <Nav hireMeText={hero?.hireMeText ?? "Let's Talk"} hireMeUrl={hero?.hireMeUrl ?? "https://www.linkedin.com/in/abdullah-ibne-ali"} />
      <main className="relative z-10 flex-1">
        <Hero hero={hero} socials={socials} />
        <Services />
        <About />
        <Stats />
        <Skills skills={skills} />
        <Projects projects={projects} />
        <Testimonials testimonials={testimonials} />
        <Contact />
      </main>
      <Footer socials={socials} />
    </>
  );
}
