import Header from "@/container/header";

export default function Home() {
  return (
    <div className="main">
      <Header pathname="/projects" />
      <div className="page project-detail">
        <ProjectDetail />
      </div>
    </div>
  );
}

const ProjectDetail = () => {
  return (
    <div>
      <h1>Project Detail</h1>
      <p>Project detail content</p>
    </div>
  );
};
