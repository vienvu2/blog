"use client";
// import UploadImage from "@/container/upload";
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

export type IProject = {
  id: string;
  title: string;
  description: string;
  slug: string;
  type: string;
  platform: string;
  team: string;
  start: string;
  end: string;
  status: string;
  image: string;
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
    type: "",
    platform: "",
    team: "",
    start: "",
    end: "",
    status: "",
    image: "",
  });

  const onSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await setDoc(doc(db, "projects", data.slug), {
        ...data,
      });
      setData({
        title: "",
        description: "",
        slug: "",
        type: "",
        platform: "",
        team: "",
        start: "",
        end: "",
        status: "",
        image: "",
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
            <th>Type</th>
            <th>Platform</th>
            <th>Image</th>
            <th>Slug</th>
            <th>Start</th>
            <th>End</th>
            <th>Status</th>
            <th>Team</th>
            <th>Description</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {list.map((project) => (
            <tr key={project.id}>
              <td>
                <Link href="/">{project.title}</Link>
              </td>
              <td>{project.type}</td>
              <td>{project.platform}</td>
              <td>{project.image}</td>
              <td>{project.slug}</td>
              <td>{project.start}</td>
              <td>{project.end}</td>
              <td>{project.status}</td>
              <td>{project.team}</td>
              <td>{project.description}</td>
              <th>
                <button onClick={() => setData(project)}>Edit</button>
                <button onClick={() => remove(project)}>Delete</button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
      <h4>Thêm mới</h4>

      <form onSubmit={onSubmit} className="form">
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
        <label htmlFor="title">Type</label>
        <input
          type="text"
          value={data.type}
          onChange={(e) => setData({ ...data, type: e.target.value })}
        />
        <label htmlFor="title">Image</label>
        <input
          type="text"
          value={data.image}
          onChange={(e) => setData({ ...data, image: e.target.value })}
        />
        <label htmlFor="title">Platform</label>
        <input
          type="text"
          value={data.platform}
          onChange={(e) => setData({ ...data, platform: e.target.value })}
        />
        <label htmlFor="title">Team</label>
        <input
          type="text"
          value={data.team}
          onChange={(e) => setData({ ...data, team: e.target.value })}
        />
        <label htmlFor="title">Start</label>
        <input
          type="text"
          value={data.start}
          onChange={(e) => setData({ ...data, start: e.target.value })}
        />
        <label htmlFor="title">End</label>
        <input
          type="text"
          value={data.end}
          onChange={(e) => setData({ ...data, end: e.target.value })}
        />
        <label htmlFor="title">Status</label>
        <input
          type="text"
          value={data.status}
          onChange={(e) => setData({ ...data, status: e.target.value })}
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
      {/* <UploadImage /> */}
    </div>
  );
}
