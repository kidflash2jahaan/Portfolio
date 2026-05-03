import About from "@/components/About";
import Awards from "@/components/Awards";
import Background from "@/components/Background";
import Cursor from "@/components/Cursor";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Music from "@/components/Music";
import Nav from "@/components/Nav";
import Tech from "@/components/Tech";
import Vision from "@/components/Vision";

export default function Home() {
  return (
    <>
      <Background />
      <Cursor />
      <Nav />
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
