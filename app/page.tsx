import About from "@/components/About";
import Categories from "@/components/Categories";
import Hero from "@/components/Hero";
import Universities from "@/components/Universities";
import Footer from "@/components/layout/Footer";
export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Categories />
      <Universities id="about" />
      <Footer id="contact" />
      {/* Other content */}
    </main>
  );
}
