
import Layout from "@/components/layout/Layout";
import Hero from "@/components/sections/Hero";
import ServiceCategories from "@/components/sections/ServiceCategories";
import HowItWorks from "@/components/sections/HowItWorks";
import FeaturedProviders from "@/components/sections/FeaturedProviders";
import Testimonials from "@/components/sections/Testimonials";
import CTASection from "@/components/sections/CTASection";

export default function Index() {
  return (
    <Layout>
      <Hero />
      <ServiceCategories />
      <HowItWorks />
      <FeaturedProviders />
      <Testimonials />
      <CTASection />
    </Layout>
  );
}
