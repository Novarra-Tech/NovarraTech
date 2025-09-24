import { title } from "@/components/primitives";

type Member = {
  name: string;
  role: string;
  about: string;
  img: string;
};

const team: Member[] = [
  {
    name: "Gabriel Kaloo",
    role: "Role",
    about:
      "Description",
    img: "/images/photo.jpg",
  },
  {
    name: "Sehajveer Dhillon",
    role: "Role",
    about:
      "Description.",
    img: "/images/photo.jpg",
  },
  {
    name: "Onkar Dhillon",
    role: "Role",
    about:
      "Description.",
    img: "/images/photo.jpg",
  },
];

export default function AboutPage() {
  return (
    <section className="max-w-5xl mx-auto px-8 py-12">
      <div className="mb-12 text-center">
        <h1 className={title()}>About</h1>
        <p className="mt-8 text-lg"> </p>
      </div>

      <div>
        {team.map((m) => (
          <article
            key={m.name}
            className={"flex items-start mb-4" }
          >
            <img
              src={m.img}
              alt={`${m.name} headshot`}
              style={{ width: "2in", height: "3in" }}
              className="shrink-0 rounded-2xl object-cover object-center"
            />

            <div className="flex-1">
              <h2 className="text-2xl font-semibold mb-2">{m.name}</h2>
              <p className="text-base text-gray-400 mb-2">{m.role}</p>
              <p className="text-lg leading-relaxed">{m.about}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
