import Header from "@/container/header";
import { db } from "@/firebase";
import { collection, doc, getDoc } from "firebase/firestore";

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
      <p>Project detail content</p>
    </div>
  );
};

const getData = async () => {
  const ref = collection(db, "projects");
  const docRef = doc(ref, "calo");
  const res = await getDoc(docRef);
  return res.data();
};
