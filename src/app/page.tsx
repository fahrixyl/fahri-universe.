import dynamic from "next/dynamic";
import Intro from "@/components/Intro";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import { About, Skills, Hobbies, Projects, Social, Contact, Footer } from "@/components/Sections";
import CommandCenter from "@/components/CommandCenter";
import MusicPlayer from "@/components/MusicPlayer";
import AiAssistant from "@/components/AiAssistant";
import Cursor from "@/components/Cursor";
import PwaManager from "@/components/PwaManager";

const Galaxy = dynamic(() => import("@/components/Galaxy"), { ssr: false });

export default function Home() {
  return (
    <main>
      <div className="fixed inset-0 -z-10 bg-space"><Galaxy /></div>
      <Intro />
      <Nav />
      <Hero />
      <About />
      <Skills />
      <Hobbies />
      <Projects />
      <Social />
      <Contact />
      <Footer />
      <CommandCenter />
      <MusicPlayer />
      <AiAssistant />
      <Cursor />
      <PwaManager />
    </main>
  );
}
