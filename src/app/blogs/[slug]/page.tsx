import { IBlog } from "@/app/admin/blogs/page";
import Header from "@/container/header";
import { db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";

export default async function Home({ params }: any) {
  const blog = await getData(params.slug);
  return (
    <div className="main">
      <Header pathname="/blogs" />
      <div className="page">
        <div className="container">
          <h1>{blog.title}</h1>
          <img src={blog.imageLink} alt="blog" />
          <p>{blog.description}</p>
          <p>{blog.content}</p>
        </div>
      </div>
    </div>
  );
}

const getData = async (slug: string) => {
  const querySnapshot = await getDoc(doc(db, "blogs", slug));
  return querySnapshot.data() as IBlog;
};
