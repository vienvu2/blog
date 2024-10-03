import { db } from "@/firebase";
import { collection, getDoc, getDocs } from "firebase/firestore";

export default async function ProjectList() {
  const projectsData = await getData();
  console.log(projectsData);
  return (
    <div className="project-list">
      <h1>Project List</h1>
      {projectsData.map((a) => (
        <div key={a.title}>{a.title}</div>
      ))}
    </div>
  );
}

const getData = async () => {
  const querySnapshot = await getDocs(collection(db, "projects"));
  const projectsData = querySnapshot.docs.map((doc) => doc.data());
  return projectsData;
};
