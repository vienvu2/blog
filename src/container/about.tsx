export default function About() {
  return (
    <div className="about__wrap">
      <div className="about">
        <div className="about__content">
          <h3>Hi there</h3>
          <h1>
            I{"'"}m <span>Viên Vũ</span>
          </h1>

          <h2>Fullstack developer</h2>

          <p>
            I{"'"}m a fullstack developer with 10 years of experience. I have
            worked with many technologies, such as React, Vue, Angular, Node,
            Express, NestJS, Laravel, and so on.
          </p>
        </div>
        <div className="about__image">
          <img src="/images/me.png" alt="Viên Vũ" />
        </div>
      </div>
    </div>
  );
}
