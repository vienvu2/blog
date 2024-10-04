import { IProject } from "@/app/admin/projects/page";
import { db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";
import { ProjectItem } from "./project";

export default async function ProjectList() {
  const projects = await getData();
  return (
    <div className="project-list">
      <div className="row">
        {projects.map((project) => (
          <div className="col-md-6" key={project.id}>
            <ProjectItem project={project} />
          </div>
        ))}
      </div>
    </div>
  );
}

const getData = async () => {
  const querySnapshot = await getDocs(collection(db, "projects"));
  const projects = querySnapshot.docs.map((doc) => doc.data());
  return projects as IProject[];
};
