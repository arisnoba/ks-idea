import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ClientsSection from "@/components/ClientsSection";
import FAQSection from "@/components/FAQSection";
import ManifestoSection from "@/components/ManifestoSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ClientsSection />
        <FAQSection />
        <ManifestoSection />
      </main>
      <Footer />
    </>
  );
}
