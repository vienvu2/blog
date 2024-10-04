import Link from "next/link";

export default function Intro() {
  return (
    <div className="intro">
      <div className="intro__title">I{"'"}m a Full Stack Developer</div>
      <div className="row">
        <div className="col-md-4">
          <div className="intro__item">
            <h4> 50+ </h4>
            <p> Projects</p>
            <Link href="/projects">Check it out</Link>
          </div>
        </div>
        <div className="col-md-4">
          <div className="intro__item">
            <h4>10+</h4>
            <p>Years Experience</p>
            <Link href="/profile">View history</Link>
          </div>
        </div>
        <div className="col-md-4">
          <div className="intro__item">
            <h4>100+ </h4>
            <p>Blogs</p>
            <Link href="/blogs">Read them</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
