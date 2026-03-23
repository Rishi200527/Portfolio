import HeroSection from "@/components/HeroSection";
import AboutExtension from "@/components/extensions/AboutExtension";
import ResumeExtension from "@/components/extensions/ResumeExtension";
import EducationExtension from "@/components/extensions/EducationExtension";
import SkillsExtension from "@/components/extensions/SkillsExtension";
import ProjectsExtension from "@/components/extensions/ProjectsExtension";
import CertificatesExtension from "@/components/extensions/CertificatesExtension";
import ContactExtension from "@/components/extensions/ContactExtension";

export const metadata = {
  title: "Creative Developer | Portfolio",
  description: "A high-end scrollytelling personal portfolio website showcasing selected digital experiences.",
};

export default function Home() {
  return (
    <main className="bg-[#121212] min-h-screen selection:bg-white/30 selection:text-white">
      {/* Existing Original Sections */}
      <HeroSection />
      
      {/* Newly Appended Extended Sections */}
      <div className="relative z-20 bg-[#121212] pb-32">
        <AboutExtension />
        <ResumeExtension />
        <EducationExtension />
        <SkillsExtension />
        <ProjectsExtension />
        <CertificatesExtension />
        <ContactExtension />
      </div>
    </main>
  );
}
