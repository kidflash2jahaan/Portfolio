import About from "@/components/About";
import Awards from "@/components/Awards";
import Background from "@/components/Background";
import Cursor from "@/components/Cursor";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Music from "@/components/Music";
import Nav from "@/components/Nav";
import PageCurtain from "@/components/PageCurtain";
import Particles from "@/components/Particles";
import Ripples from "@/components/Ripples";
import ScrollHueLayer from "@/components/ScrollHueLayer";
import ScrollReadout from "@/components/ScrollReadout";
import ScrollToTop from "@/components/ScrollToTop";
import Tech from "@/components/Tech";
import Vision from "@/components/Vision";

export default function Home() {
  return (
    <>
      <PageCurtain />
      <Background />
      <ScrollHueLayer />
      <Particles />
      <Cursor />
      <Ripples />
      <Nav />
      <ScrollReadout />
      <ScrollToTop />
      <main className="relative">
        <Hero />
        <About />
        <Tech />
        <Music />
        <Awards />
        <Vision />
        <Footer />
      </main>
    </>
  );
}
