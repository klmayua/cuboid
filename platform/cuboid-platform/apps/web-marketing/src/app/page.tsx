import {
  TopTicker,
  DesktopNavbar,
  MobileBottomNav,
  HeroSection,
  MarketplaceSection,
  BrokerSection,
  BDCSection,
  BusinessSection,
  NetworkSection,
  FooterConversionStrip,
  Footer,
  ChatBot,
} from "@/components";

export default function Home() {
  return (
    <main className="relative">
      <TopTicker />
      <DesktopNavbar />
      <MobileBottomNav />
      <ChatBot />

      <div className="pb-mob-nav xl:pb-0">
        <HeroSection />
        <MarketplaceSection />
        <BrokerSection />
        <BDCSection />
        <BusinessSection />
        <NetworkSection />
        <FooterConversionStrip />
        <Footer />
      </div>
    </main>
  );
}
