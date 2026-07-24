import Header from "../../components/layout/Header";
import HeroSection from "../../components/common/HeroSection";
import FeaturedHostelsSection from "../../components/common/FeaturedHostelsSection";
import FeaturesSection from "../../components/common/FeaturesSection";

function HomePage() {
  return (
    <>
      <Header />

      <main>
        <HeroSection />
        <FeaturedHostelsSection />
        <FeaturesSection />
      </main>
    </>
  );
}

export default HomePage;