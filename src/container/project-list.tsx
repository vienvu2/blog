import { IProject } from "@/app/admin/projects/page";
import { db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";

export default async function ProjectList() {
  const projectsData = await getData();
  return (
    <div className="project-list">
      {projectsData.map((a) => (
        <div key={a.title} className="project-item">
          <Link href={"/projects/" + a.slug}>{a.title}</Link>
          <Link href={"/projects/" + a.slug}>
            <img src={a.imageLink} alt={a.title} />
          </Link>
        </div>
      ))}
    </div>
  );
}

const getData = async () => {
  const querySnapshot = await getDocs(collection(db, "projects"));
  const projectsData = querySnapshot.docs.map((doc) => doc.data());
  return projectsData as IProject[];
};
