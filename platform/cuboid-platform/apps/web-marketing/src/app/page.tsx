import {
  TopTicker,
  DesktopNavbar,
  MobileBottomNav,
  HeroSection,
  BrokerOperatingSystem,
  PostRateMarketplace,
  NearestBDCLocator,
  LiveCorridorBoard,
  TrustAndCompliance,
  InstitutionalAccess,
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
        <BrokerOperatingSystem />
        <PostRateMarketplace />
        <NearestBDCLocator />
        <LiveCorridorBoard />
        <TrustAndCompliance />
        <InstitutionalAccess />
        <FooterConversionStrip />
        <Footer />
      </div>
    </main>
  );
}
