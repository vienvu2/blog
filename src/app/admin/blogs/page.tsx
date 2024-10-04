"use client";
import UploadImage from "@/container/upload";
import { db } from "@/firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";

export type IBlog = {
  id: string;
  title: string;
  description: string;
  slug: string;
  date: string;
  image?: any;
  imageLink: string;

  content: string;
};

export default function CreateProject() {
  const [list, setList] = useState<IBlog[]>([]);

  const getData = async () => {
    const querySnapshot = await getDocs(collection(db, "blogs"));
    const projectsData = querySnapshot.docs.map((doc) => doc.data());
    console.log(projectsData);
    setList(projectsData as IBlog[]);
  };
  useEffect(() => {
    getData();
  }, []);

  const [data, setData] = useState<IBlog>({
    title: "",
    description: "",
    slug: "",
    date: "",
    image: "",
    imageLink: "",
    id: "",
    content: "",
  });

  const onSubmit = async () => {
    try {
      await setDoc(doc(db, "blogs", data.slug), {
        title: data.title,
        description: data.description,
      });
      setData({
        title: "",
        description: "",
        slug: "",
        date: "",
        image: "",
        imageLink: "",
        id: "",
        content: "",
      });
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
                <button
                  onClick={async () => {
                    await setDoc(doc(db, "blogs", project.id), {
                      title: project.title,
                      description: project.description,
                    });
                    getData();
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={async () => {
                    await deleteDoc(doc(db, "blogs", project.id));
                    getData();
                  }}
                >
                  Delete
                </button>
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
        <label>Date</label>
        <input
          type="date"
          value={data.date}
          onChange={(e) => setData({ ...data, date: e.target.value })}
        />
        <label htmlFor="description">Image</label>
        <input
          type="file"
          onChange={(e) =>
            setData({ ...data, image: e.target.files && e.target.files[0] })
          }
        />

        <label htmlFor="description">Description</label>
        <input
          type="text"
          id="description"
          value={data.description}
          onChange={(e) => setData({ ...data, description: e.target.value })}
        />

        <label htmlFor="description">content</label>
        <input
          type="text"
          id="description"
          value={data.content}
          onChange={(e) => setData({ ...data, content: e.target.value })}
        />

        <UploadImage />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
