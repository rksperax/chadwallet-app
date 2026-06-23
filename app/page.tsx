import Hero from "@/components/landing/Hero";
import CrossPlatform from "@/components/landing/CrossPlatform";
import SocialFeatures from "@/components/landing/SocialFeatures";
import CommunityOrbit from "@/components/landing/CommunityOrbit";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <CrossPlatform />
      <SocialFeatures />
      <CommunityOrbit />
      <Footer />
    </>
  );
}
