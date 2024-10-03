import BlogList from "@/container/blog-list";
import Header from "../../container/header";
// const meta = {
//   title: "Blog",
//   description: "Blog",
// };

export default function Home() {
  return (
    <div className="main">
      <Header />
      <BlogList />
    </div>
  );
}
