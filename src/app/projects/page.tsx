import Header from "@/container/header";
import ProjectList from "@/container/project-list";

export default function Home() {
  return (
    <div className="main">
      <Header pathname="/projects" />
      <div className="page">
        <ProjectList />
      </div>
    </div>
  );
}
