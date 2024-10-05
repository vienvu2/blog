import { IBlog } from "@/app/admin/blogs/page";
import { db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";

export default async function Blog() {
  const blogs = await getData();
  return (
    <div className="blog">
      <h3 className="blog__title">My blogs</h3>
      <div className="blog-list">
        <div className="row">
          {blogs.map((blog) => (
            <div className="col-md-4" key={blog.id}>
              <BlogItem blog={blog} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export const BlogItem = ({ blog }: { blog: IBlog }) => {
  return (
    <Link href={`/blogs/${blog.slug}`}>
      <div className="blog-item" key={blog.id}>
        <div className="blog-item__image">
          <img src={blog.imageLink} alt="blog" />
        </div>
        <h3>{blog.title}</h3>
        <p>{blog.description}</p>
      </div>
    </Link>
  );
};

const getData = async () => {
  const querySnapshot = await getDocs(collection(db, "blogs"));
  const blogData = querySnapshot.docs.map((doc) => doc.data());
  return blogData as IBlog[];
};
