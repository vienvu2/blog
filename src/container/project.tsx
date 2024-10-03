import { db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";

export default async function Project() {
  const projects = await getData();
  console.log(projects);

  return (
    <div className="project">
      <h3>Project recently</h3>
      {projects.map((project) => (
        <div className="project__item" key={project.id}>
          <img src="/images/project.png" alt="project" />
          <Link href={"/projects/" + project.slug}>
            <h4>{project.title}</h4>
          </Link>
        </div>
      ))}
    </div>
  );
}

const getData = async () => {
  const res = await getDocs(collection(db, "projects"));
  const data = res.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  return data as { id: string; title: string; slug: string }[];
};
