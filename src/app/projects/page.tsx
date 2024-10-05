import Header from "@/container/header";
import ProjectList from "@/container/project-list";

export default function Home() {
  return (
    <div className="main">
      <Header pathname="/projects" />
      <div className="page">
        <div className="project-header">
          <input placeholder="Search project" />
          {/* <div className="project-filter">
            <select>
              <option>Template</option>
              <option>Demo</option>
              <option>Product</option>
              <option>Outsource</option>
            </select>

            <select>
              <option>Mobile (+12)</option>
              <option>Web (+40)</option>
              <option>Landingpage (+10)</option>
            </select>
          </div> */}
        </div>
        <ProjectList />
      </div>
    </div>
  );
}
