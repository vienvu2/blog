import { IProject } from "@/app/admin/projects/page";
import { db } from "@/firebase";
import { collection, getDocs, limit, query } from "firebase/firestore";
import Link from "next/link";

export default async function Project() {
  const projects = await getData();
  return (
    <div className="project">
      <h3 className="project__title">Project recently</h3>
      <div className="project-list">
        <div className="row">
          {projects.map((project) => (
            <div className="col-md-6" key={project.id}>
              <div className="project-item" key={project.id}>
                <img src={project.imageLink} alt="project" />
                <Link href={"/projects/" + project.slug}>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const getData = async () => {
  const res = await getDocs(query(collection(db, "projects"), limit(6)));
  const data = res.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  return data as IProject[];
};
