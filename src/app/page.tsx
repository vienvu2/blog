// import Footer from "@/container/footer";
import Header from "@/container/header";
import About from "@/container/about";
import Intro from "@/container/intro";
// import Links from "@/container/link";
import Service from "@/container/service";
import Project from "@/container/project";
import Customer from "@/container/customer";

export default function Home() {
  return (
    <div className="main">
      <Header />
      <About />
      <Intro />
      <Service />


      <Project />

      <Customer />
    </div>
  );
}
