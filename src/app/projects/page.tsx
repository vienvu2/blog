import ProjectList from "@/container/project-list";
import Header from "../../container/header";

export default function Home() {
  return (
    <div className="main">
      <Header />

      <ProjectList />
    </div>
  );
}

