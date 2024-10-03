import Link from "next/link";

export default function Header() {
  return (
    <div className="header">
      <Link href="/">
        <h1>ViênVũ</h1>
      </Link>

      <div className="menu">
        <a href="/">Me</a>
        <a href="/projects">Projects</a>
        <a href="/blogs">Blogs</a>
        <a href="/contact">Contact</a>
      </div>
    </div>
  );
}
