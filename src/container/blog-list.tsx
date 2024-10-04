import { IBlog } from "@/app/admin/blogs/page";
import { db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";
import { BlogItem } from "./blog";

export default async function BlogList() {
  const blogData = await getData();
  console.log(blogData);
  const firstBlog = blogData[0] || {};
  return (
    <div className="page">
      <div className="container">
        <div className="blog-list">
          <div className="blog-list__first">
            <h2>{firstBlog.title}</h2>
            <p>{firstBlog.description}</p>
          </div>
          <div className="row">
            {blogData.map((a) => (
              <div key={a.title} className="col-md-4">
                <BlogItem blog={a} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const getData = async () => {
  const querySnapshot = await getDocs(collection(db, "blogs"));
  const blogData = querySnapshot.docs.map((doc) => doc.data());
  return blogData as IBlog[];
};
