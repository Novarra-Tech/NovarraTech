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
      "Hi my name is Gabe and I like blah blah blah",
    img: "/images/photo.jpg",
  },
  {
    name: "Sehajveer Dhillon",
    role: "Role",
    about:
      "Hi my name is Gabe and I like blah blah blah.",
    img: "/images/photo.jpg",
  },
  {
    name: "Onkar Dhillon",
    role: "Role",
    about:
      "Hi my name is Gabe and I like blah blah blah.",
    img: "/images/photo.jpg",
  },
];

export default function AboutPage() {
  return (
    <section >
      <div className="mb-12 text-center">
        <h1 className={title()}>About</h1>
        <p className="mt-8 text-lg"> </p>
      </div>

      <div>
        {team.map((m) => (
          <article
            className={"flex justify-center items-center mb-16 gap-x-50 mx-auto max-w-3xl "}
            key={m.name}
          >
            <img
              src={m.img}
              alt={`${m.name} headshot`}
              className="w-56 h-72 rounded-2xl object-cover shrink-0"
            />

            <div className="flex-1 text-left">
              <h2 className="text-3xl font-semibold leading-tight md:whitespace-nowrap">
                {m.name}
              </h2>
              <p className="text-base text-gray-400 mt-1">{m.role}</p>
              <p className="mt-4 text-lg leading-relaxed whitespace-nowrap">{m.about}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
