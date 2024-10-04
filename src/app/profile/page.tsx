import About from "@/container/about";
import Header from "@/container/header";

export default function Home() {
  return (
    <div className="main">
      <Header pathname="/" />
      <About />
      {/* <h1>Profile</h1> */}
    </div>
  );
}
