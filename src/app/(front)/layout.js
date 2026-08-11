import Navbar from "../../components/front/Navbar/Navbar";
import Footer from "../../components/front/Footer/Footer";
import ParticlesBackground from "../../components/front/Particles/ParticlesBackground";
import CustomCursor from "../../components/front/Cursor/CustomCursor";

export default function FrontLayout({ children }) {
  return (
    <>
      <CustomCursor />
      <ParticlesBackground />
      <Navbar />
      <main className="flex-grow relative z-10">
        {children}
      </main>
      <Footer />
    </>
  );
}
