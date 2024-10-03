"use client";
import UploadImage from "@/container/upload";
import { db } from "@/firebase";
import {
  collection,
  doc,
  getDocs,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";

type IProject = {
  id: string;
  title: string;
  description: string;
  slug: string;
};

export default function CreateProject() {
  const [list, setList] = useState<IProject[]>([]);

  const getData = async () => {
    const querySnapshot = await getDocs(collection(db, "projects"));
    const projectsData = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    console.log({ projectsData });
    setList(projectsData as IProject[]);
  };
  useEffect(() => {
    getData();
  }, []);

  const [data, setData] = useState({
    title: "",
    description: "",
    slug: "",
  });

  const onSubmit = async () => {
    try {
      await setDoc(doc(db, "projects", data.slug), {
        title: data.title,
        description: data.description,
        slug: data.slug,
      });
      setData({
        title: "",
        description: "",
        slug: "",
      });
      getData();
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };
  const remove = async (e: IProject) => {
    try {
      await deleteDoc(doc(db, "projects", e.id));
      getData();
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Project Name</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {list.map((project) => (
            <tr key={project.id}>
              <td>
                <Link href="/">{project.title}</Link>
              </td>
              <th>
                <button onClick={() => remove(project)}>Delete</button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
      <h4>Thêm mới</h4>

      <form onSubmit={onSubmit}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          value={data.title}
          required
          onChange={(e) =>
            setData({
              ...data,
              title: e.target.value,
              slug: e.target.value.replace(/\s+/g, "-").toLowerCase(),
            })
          }
        />
        <label htmlFor="title">Slug</label>
        <input
          type="text"
          value={data.slug}
          onChange={(e) => setData({ ...data, slug: e.target.value })}
        />
        <label htmlFor="description">Description</label>
        <input
          type="text"
          id="description"
          value={data.description}
          onChange={(e) => setData({ ...data, description: e.target.value })}
        />
        <button type="submit">Submit</button>
      </form>
      <UploadImage />
    </div>
  );
}
