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
        style={{ backgroundImage: `url(${data.imageLink})` }}
      >
        <div className="project-detail__info">
          <h1>{data.title}</h1>
          <p>{data.description}</p>
        </div>
      </div>

      <div className="container">
        <div className="project-detail__content">
          <div className="project-detail__content__inner">
            {(data.content || []).map((content) => {
              if (content.type === "text") {
                return <p key={content.value}>{content.value}</p>;
              } else if (content.type === "image") {
                return (
                  <div
                    key={content.value}
                    className="project-detail__content__image"
                  >
                    <img src={content.value} alt="image" />
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

const getData = async (slug: string) => {
  const docSnap = await getDoc(doc(db, "projects", slug));
  return docSnap.data() as IProject;
};
