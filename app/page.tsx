import Hero from "@/components/landing/Hero";
import SocialFeatures from "@/components/landing/SocialFeatures";
import CrossPlatform from "@/components/landing/CrossPlatform";
import DownloadCTA from "@/components/landing/DownloadCTA";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <CrossPlatform />
      <SocialFeatures />
      <DownloadCTA />
      <Footer />
    </>
  );
}
