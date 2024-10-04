import { IProject } from "@/app/admin/projects/page";
import Header from "@/container/header";
import { db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";

export default async function Home() {
  const data = await getData();
  return (
    <div className="main">
      <Header pathname="/projects" />
      <ProjectDetail data={data} />
    </div>
  );
}

const ProjectDetail = ({ data }: { data: IProject }) => {
  return (
    <div className="project-detail">
      <div
        className="project-detail__header"
        style={{ background: `#0001 url(${data.imageLink}) ` }}
      >
        <h1>{data.title}</h1>
        <p>{data.description}</p>
      </div>
    </div>
  );
};

const getData = async () => {
  const docSnap = await getDoc(doc(db, "projects", "checkjay"));
  return docSnap.data() as IProject;
};
