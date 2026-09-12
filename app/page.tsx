import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SocialProofBar from "@/components/SocialProofBar";
import PainPoints from "@/components/PainPoints";
import AuditSection from "@/components/AuditSection";
import ServicesSection from "@/components/ServicesSection";
import PortfolioSection from "@/components/PortfolioSection";
import PricingSection from "@/components/PricingSection";
import ProcessSection from "@/components/ProcessSection";
import BlogPreviewSection from "@/components/BlogPreviewSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: {
    title: "Creare Site-uri și Automatizări pentru Firme | AiWANT",
    description:
      "Creăm site-uri de prezentare și magazine online pentru firme din România, cu automatizări incluse — formulare, facturare, programări. Cod sursă predat integral.",
    url: "/",
    siteName: "AiWANT",
    locale: "ro_RO",
    type: "website",
  },
};

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <Navbar />
      <main>
        <Hero />
        <SocialProofBar />
        <PainPoints />
        <AuditSection />
        <ServicesSection />
        <PortfolioSection />
        <PricingSection />
        <ProcessSection />
        <BlogPreviewSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
