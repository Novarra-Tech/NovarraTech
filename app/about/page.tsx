import { title } from "@/components/primitives";
import { Card, CardBody } from "@heroui/card";
import { Image } from "@heroui/image";

type Member = {
  name: string;
  role: string;
  about: string;
  img: string;
};

const team: Member[] = [
  { 
    name: "Gabriel Kaloo", 
    role: "Managing Partner, CEO",
    about: "Gabriel is a senior Computer Science student and Audio Visual Technician at Adelphi University. " +
        "As part of his role, he manages classroom technology systems across campus, working with a dedicated IT team and external vendors to keep systems running seamlessly. " +
        "Gabriel also provides training for professors and academic professionals, helping them integrate technology confidently into their teaching" +
        "Beyond his AV expertise, Gabriel brings extensive experience in Level 1 and Level 2 IT services. \n He has collaborated with high-profile corporate clients, delivering IT solutions that meet enterprise standards of performance and security. " +
        "Exposure to network engineering and cybersecurity further strengthens his ability to approach projects with technical depth and a security-first mindset" + "Recognized for his professionalism, Gabriel works directly with clients to ensure their needs are understood and their satisfaction is achieved. " +
        "His commitment to reliable, high-quality service makes him a trusted partner for both academic institutions and businesses"
    ,
    img: "/images/image.png" 
  },

  { 
    name: "Sehajveer Dhillon", 
    role: "Role", 
    about: "Hi my name is Gabe and I like blah blah blah.", 
    img: "/images/photo.jpg" 
  },

  { 
    name: "Onkar Dhillon", 
    role: "Role", 
    about: "Hi my name is Gabe and I like blah blah blah.", 
    img: "/images/photo.jpg" 
  },
];

export default function AboutPage() {
  return (
    <section>
      <div className="mb-12 text-center">
        <h1 className={title()}>About</h1>
      </div>

      {team.map((m) => (
        <Card
          key={m.name}
          radius="lg"
          shadow="lg"
          className="mx-auto mb-16 w-full max-w-5xl bg-content1/60 backdrop-blur-xl border light:border-black/10 dark:border-white/10"
        >
          <CardBody className="p-6 md:p-10">
            <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-16">
              <Image
                src={m.img}
                alt={`${m.name} headshot`}
                width={224}
                height={288}
                radius="lg"
                isBlurred
                classNames={{
                  wrapper: "shrink-0 rounded-2xl bg-white/20 backdrop-blur-3xl border light:border-black dark:border-white/10",
                  img: "object-cover",
                }}
              />

              <div className="text-left md:flex-1">
                <h2 className="text-3xl font-semibold leading-tight">{m.name}</h2>
                <p className="text-base text-gray-400 mt-1">{m.role}</p>
                <p className="mt-4 text-lg leading-relaxed overflow-hidden text-ellipsis">
                  {m.about}
                </p>
              </div>
            </div>
          </CardBody>
        </Card>
      ))}
    </section>
  );
}
