import About from "@/components/About";
import Categories from "@/components/Categories";
import Hero from "@/components/Hero";
import Universities from "@/components/Universities";
import Footer from "@/components/layout/Footer";
import ShareProject from "@/components/ShareProject";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Categories />
      <Universities />
      <ShareProject />
      <Footer />
      {/* Other content */}
    </main>
  );
}
