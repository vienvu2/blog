import Footer from "@/container/footer";
import Header from "@/container/header";
import About from "@/container/about";
import Intro from "@/container/intro";
import Links from "@/container/link";

export default function Home() {
  return (
    <div className="main">
      <Header />
      <About />

      <Intro />
      <Links />

      <Footer />
    </div>
  );
}
