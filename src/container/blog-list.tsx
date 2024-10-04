import { IBlog } from "@/app/admin/blogs/page";
import { db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";

export default async function BlogList() {
  const blogData = await getData();
  console.log(blogData);
  const firstBlog = blogData[0] || {};
  return (
    <div className="blog-list">
      {/* <h1>blog List</h1> */}
      <div className="blog-list__first">
        <h2>{firstBlog.title}</h2>
        <p>{firstBlog.description}</p>
      </div>

      {blogData.map((a) => (
        <div key={a.title}>{a.title}</div>
      ))}
    </div>
  );
}

const getData = async () => {
  const querySnapshot = await getDocs(collection(db, "blogs"));
  const blogData = querySnapshot.docs.map((doc) => doc.data());
  return blogData as IBlog[];
};
