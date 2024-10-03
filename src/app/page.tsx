// import Footer from "@/container/footer";
import About from "@/container/about";
import Intro from "@/container/intro";
// import Links from "@/container/link";
import Service from "@/container/service";
import Project from "@/container/project";
import Customer from "@/container/customer";
import Header from "@/container/header";

export default function Home() {
  return (
    <div className="main">
      <Header pathname="/" />
      <div className="page">
        <About />
        <Intro />
        <Service />
        <Project />
        <Customer />
      </div>
    </div>
  );
}
