import { IProject } from "@/app/admin/projects/page";
import Header from "@/container/header";
import { db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";

export default async function Home() {
  const data = await getData();
  return (
    <div className="main">
      <Header pathname="/projects" />
      <div className="project-detail">
        <ProjectDetail data={data} />
      </div>
    </div>
  );
}

const ProjectDetail = ({ data }: { data: any }) => {
  return (
    <div>
      <h1>{data.title}</h1>
      {JSON.stringify(data)}
    </div>
  );
};

const getData = async () => {
  const docSnap = await getDoc(doc(db, "projects", "checkjay"));
  return docSnap.data() as IProject;
};
