"use client";
import { uploadImage } from "@/app/actions";
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
  language: string;
  team: string;
  start: string;
  end: string;
  status: string;
  image?: any;
  imageLink: string;
  content: {
    type: "title" | "text" | "image";
    description: string;
    value: string;
    image?: any;
  }[];
};

export default function CreateProject() {
  const [list, setList] = useState<IProject[]>([]);

  const getData = async () => {
    const querySnapshot = await getDocs(collection(db, "projects"));
    const projectsData = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
      content: doc.data().content || [],
    }));
    console.log({ projectsData });
    setList(projectsData as IProject[]);
  };
  useEffect(() => {
    getData();
  }, []);

  const [data, setData] = useState<IProject>({
    id: "",
    title: "",
    description: "",
    slug: "",
    type: "",
    platform: "",
    team: "",
    language: "",
    start: "",
    end: "",
    status: "",
    image: "",
    imageLink: "",
    content: [],
  });

  const onSubmit = async (e: any) => {
    e.preventDefault();
    try {
      // upload image
      if (data.image) {
        data.imageLink = await uploadImage(data.image, () => {});
      }
      for (let i = 0; i < data.content.length; i++) {
        if (data.content[i].type == "image" && data.content[i].image) {
          data.content[i].value = await uploadImage(data.content[i].image);
        }
        data.content[i].image = "";
      }
      data.image = "";
      await setDoc(doc(db, "projects", data.slug), {
        ...data,
      });
      setData({
        id: "",
        title: "",
        description: "",
        slug: "",
        type: "",
        platform: "",
        team: "",
        start: "",
        language: "",
        end: "",
        status: "",
        image: "",
        imageLink: "",
        content: [],
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
              <td>
                <img src={project.imageLink} style={{ width: "100px" }} />
              </td>
              <td>{project.slug}</td>
              <td>{project.start}</td>
              <td>{project.end}</td>
              <td>{project.status}</td>
              <td>{project.team}</td>
              <td>{project.description}</td>
              <th>
                <button
                  onClick={() => setData({ ...project, image: undefined })}
                >
                  Edit
                </button>
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

        <label htmlFor="title">Image</label>
        <input
          type="file"
          // value={data.image}
          onChange={(e) =>
            setData({ ...data, image: e.target.files && e.target.files[0] })
          }
        />
        <label htmlFor="title">Type</label>
        <select
          value={data.type}
          onChange={(e) => setData({ ...data, type: e.target.value })}
        >
          <option value="web">Web</option>
          <option value="mobile">Mobile</option>
        </select>

        <label htmlFor="title">Platform</label>

        <select
          value={data.type}
          onChange={(e) => setData({ ...data, type: e.target.value })}
        >
          <option value="web">Web</option>
          <option value="mobile">Mobile</option>
        </select>

        <label htmlFor="title">Team</label>
        <input
          type="text"
          value={data.team}
          onChange={(e) => setData({ ...data, team: e.target.value })}
        />
        <label htmlFor="title">Language</label>
        <select
          value={data.language}
          onChange={(e) => setData({ ...data, language: e.target.value })}
        >
          <option value="react">React</option>
          <option value="angular">Angular</option>
          <option value="vue">Vue</option>
          <option value="node">Node</option>
          <option value="express">Express</option>
        </select>
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
        <textarea
          id="description"
          value={data.description}
          onChange={(e) => setData({ ...data, description: e.target.value })}
        />
        <div className="form">
          <label> Content</label>
          {data.content.map((item, index) => (
            <div key={index}>
              <select
                value={item.type}
                onChange={(e) =>
                  setData({
                    ...data,
                    content: [
                      ...data.content.slice(0, index),
                      {
                        ...data.content[index],
                        type: e.target.value as "text" | "image",
                      },
                      ...data.content.slice(index + 1),
                    ],
                  })
                }
              >
                <option value="text">Text</option>
                <option value="image">Image</option>
                <option value="title">Title</option>
              </select>
              {item.type == "image" && (
                <input
                  type="file"
                  // value={item.value}
                  onChange={(e) => {
                    console.log(e.target.files);
                    setData({
                      ...data,
                      content: [
                        ...data.content.slice(0, index),
                        {
                          ...data.content[index],
                          image: e.target.files && e.target.files[0],
                        },
                        ...data.content.slice(index + 1),
                      ],
                    });
                  }}
                />
              )}
              {(item.type == "text" || item.type == "title") && (
                <textarea
                  value={item.description}
                  onChange={(e) =>
                    setData({
                      ...data,
                      content: [
                        ...data.content.slice(0, index),
                        {
                          ...data.content[index],
                          description: e.target.value,
                        },
                        ...data.content.slice(index + 1),
                      ],
                    })
                  }
                />
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={() =>
              setData({
                ...data,
                content: [
                  ...data.content,
                  {
                    type: "text",
                    description: "",
                    value: "",
                  },
                ],
              })
            }
          >
            Add content
          </button>
        </div>

        <button type="submit">Submit</button>
      </form>
      {/* <UploadImage /> */}
    </div>
  );
}
