import BlogList from "@/container/blog-list";
import Header from "@/container/header";

export default function Home() {
  return (
    <div className="main">
      <Header pathname="/blogs" />
      <div className="page">
        <BlogList />
      </div>
    </div>
  );
}
