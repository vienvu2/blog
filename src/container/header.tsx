import Link from "next/link";

export default function Header({ pathname }: { pathname: string }) {
  return (
    <div className="header">
      <div className="header__inner">
        <div className="social">
          <Link href="/" className={pathname == "/" ? "active" : ""}>
            <i className="fa fa-home"></i>
          </Link>
          <Link
            href="/projects"
            className={pathname == "/projects" ? "active" : ""}
          >
            <i className="fa fa-briefcase"></i>
          </Link>
        </div>
        <div className="header__name">
          <Link href="/">VienVu@developer.web.mobile</Link>
        </div>

        <div className="menu">
          <Link href="/" className={pathname == "/" ? "active" : ""}>
            Me
          </Link>
          <Link
            href="/projects"
            className={pathname == "/projects" ? "active" : ""}
          >
            Projects
          </Link>
          <Link href="/blogs" className={pathname == "/blogs" ? "active" : ""}>
            Blogs
          </Link>
          <Link
            href="/contact"
            className={pathname == "/contact" ? "active" : ""}
          >
            Contact
          </Link>
        </div>
      </div>
    </div>
  );
}
