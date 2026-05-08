import {
  TopTicker,
  DesktopNavbar,
  MobileBottomNav,
  HeroSection,
  BusinessSplitBand,
  BrokerSection,
  BDCSection,
  TrustAndCompliance,
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
        <BusinessSplitBand />
        <BrokerSection />
        <BDCSection />
        <TrustAndCompliance />
        <FooterConversionStrip />
        <Footer />
      </div>
    </main>
  );
}
