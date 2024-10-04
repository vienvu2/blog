import { IProject } from "@/app/admin/projects/page";
import Header from "@/container/header";
import { db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";

export default async function Home({ params }: { params: { slug: string } }) {
  const data = await getData(params.slug);
  console.log(data);
  return (
    <div className="main">
      <Header pathname="/projects" />
      <ProjectDetail data={data} />
    </div>
  );
}

const ProjectDetail = ({ data }: { data: IProject }) => {
  return (
    <div className="project-detail">
      <div
        className="project-detail__header"
        style={{ backgroundImage: `url("${data.imageLink}")` }}
      >
        <div className="project-detail__info">
          <h1>{data.title}</h1>
          <p>{data.description}</p>
        </div>
      </div>

      <div className="container">
        <div
          className="project-detail__content"
          style={{ paddingBottom: "60px 0 40px 0" }}
        >
          <h2>Main information</h2>
          <p>
            Time: {data.start} - {data.end}
          </p>
          {/* <p>Location: {data.location}</p>
          <p>Client: {data.client}</p>
          <p>Category: {data.category}</p>
          <p>Service: {data.service}</p> */}

          <h2>Content</h2>

          {(data.content || []).map((content) => {
            if (content.type === "text") {
              return <p key={content.value}>{content.value}</p>;
            } else if (content.type === "image") {
              return (
                <div
                  key={content.value}
                  className="project-detail__content__image"
                  style={{ marginBottom: 12, textAlign: "center" }}
                >
                  <img src={content.value} alt="image" />

                  <p>{content.caption}</p>
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

const getData = async (slug: string) => {
  const docSnap = await getDoc(doc(db, "projects", slug));
  return docSnap.data() as IProject;
};
