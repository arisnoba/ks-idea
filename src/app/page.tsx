import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ClientsSection from '@/components/ClientsSection';
import FAQSection from '@/components/FAQSection';
import ManifestoSection from '@/components/ManifestoSection';
import Footer from '@/components/Footer';
import SnapScrollLayout from '@/components/SnapScrollLayout';

export default function Home() {
	return (
		<>
			<Header />
			<SnapScrollLayout
				snapSections={[<HeroSection key='hero' />]}
				freeSections={
					<main>
						<ClientsSection />
						<FAQSection />
						<ManifestoSection />
						<Footer />
					</main>
				}
			/>
		</>
	);
}
