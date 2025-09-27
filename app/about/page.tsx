import { title } from "@/components/primitives";
import { Card, CardBody } from "@heroui/card";
import { Image } from "@heroui/image";
import Link from "next/link";


type Member = {
  name: string;
  role: string;
  about: string;
  img: string;
  id: string;
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
    img: "/images/image.png",
    id: "gabe"
  },

  { 
    name: "Sehajveer Dhillon", 
    role: "Managing Partner, CIO",
    about: "Sehaj is a senior Computer Science student with expertise in programming and cybersecurity. " +
        "He has hands-on experience as a full stack developer at a tech startup that integrates real estate and AI, giving him valuable insight into building modern, innovative applications." + "In addition to his development work, Sehaj is an Audio Visual Technician at Adelphi University, where he helps monitor and maintain classroom technology across campus. " +
        "His dual background in software development and AV systems allows him to approach challenges with both technical depth and practical problem-solving skills. " +
        "Sehaj's mix of programming expertise, cybersecurity knowledge, and real-world AV support experience makes him a versatile team member dedicated to delivering technology solutions that are secure, reliable, and user-friendly.",
    img: "/images/sehaj.jpeg" ,
    id: "sehaj"
  },

  { 
    name: "Onkar Dhillon", 
    role: "Managing Partner, COO",
    about: "Onkar is a senior Computer Science student with deep expertise in programming and cybersecurity. " +
        "Skilled in multiple programming languages and experienced in research-driven projects, he brings a forward-thinking approach to technology solutions" + "He also leads a Help Desk team of IT service specialists within the Adelphi domain, where they monitor and assist over 100,000 users. " +
        "Through this leadership, Onkar ensures that organizations receive reliable support, consistent service standards, and an exceptional customer experience" +
        "By combining technical knowledge with hands-on leadership, Onkar helps clients achieve technology goals with efficiency, security, and confidence",
    img: "/images/image.png" ,
    id: "onkar"
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
              <Link href={`/team/${encodeURIComponent(m.id)}`}>
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
              </Link>

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
