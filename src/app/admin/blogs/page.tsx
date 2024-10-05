"use client";
import { uploadImage } from "@/app/actions";
import { db } from "@/firebase";
import { aliasTiengViet } from "@/util";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";
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

export default function Createblog() {
  const [list, setList] = useState<IBlog[]>([]);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    const querySnapshot = await getDocs(collection(db, "blogs"));
    const blogsData = querySnapshot.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
    setList(blogsData as IBlog[]);
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

  const onSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (data.image) {
        data.imageLink = await uploadImage(data.image);
      }

      data.image = "";
      await setDoc(doc(db, "blogs", data.slug), {
        ...data,
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
      await getData();
    } catch (error) {
      console.error("Error adding document: ", error);
    } finally {
    }
    setLoading(false);
  };
  return (
    <div>
      {loading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
            color: "#fff",
            fontSize: "2rem",
          }}
        >
          Loading...
        </div>
      )}
      <table>
        <thead>
          <tr>
            <th>Ttitle</th>
            <th>Image</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {list.map((blog) => (
            <tr key={blog.id}>
              <td>{blog.title}</td>
              <td>
                <img
                  src={blog.imageLink}
                  alt={blog.title}
                  style={{ height: 100 }}
                />
              </td>
              <th>
                <button
                  onClick={async () => {
                    setData(blog);
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={async () => {
                    await deleteDoc(doc(db, "blogs", blog.id));
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

      <form onSubmit={onSubmit} className="form">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          value={data.title}
          onChange={(e) =>
            setData({
              ...data,
              title: e.target.value,
              slug: aliasTiengViet(
                e.target.value.replace(/\s+/g, "-").toLowerCase()
              ),
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
          accept=""
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
        <textarea
          id="description"
          rows={20}
          value={data.content}
          onChange={(e) => setData({ ...data, content: e.target.value })}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
