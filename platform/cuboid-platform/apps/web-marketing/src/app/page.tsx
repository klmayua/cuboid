import {
  TopTicker,
  DesktopNavbar,
  MobileBottomNav,
  HeroSection,
  MetricsStrip,
  JourneySelector,
  TrustAndCompliance,
  FooterConversionStrip,
  Footer,
} from "@/components";

export default function Home() {
  return (
    <main className="relative">
      <TopTicker />
      <DesktopNavbar />
      <MobileBottomNav />

      <div className="pb-mob-nav xl:pb-0">
        <HeroSection />
        <MetricsStrip />
        <JourneySelector />
        <TrustAndCompliance />
        <FooterConversionStrip />
        <Footer />
      </div>
    </main>
  );
}
