import BlogList from "@/container/blog-list";
import Header from "@/container/header";

export default function Home() {
  return (
    <div className="main">
      <Header pathname="/blogs" />
      <div className="blog-header">
        <h1>Blog</h1>
      </div>
      <BlogList />
    </div>
  );
}
