// import Footer from "@/container/footer";
import About from "@/container/about";
import Intro from "@/container/intro";
// import Links from "@/container/link";
import Service from "@/container/service";
import Project from "@/container/project";
import Customer from "@/container/customer";
import Header from "@/container/header";
import Blog from "@/container/blog";

export default function Home() {
  return (
    <div className="main">
      <Header pathname="/" />
      <About />
      <Intro />
      <Service />
      <Project />
      <Blog />
      <Customer />
    </div>
  );
}
