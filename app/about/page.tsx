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
    role: "Role", 
    about: "Gabriel is a senior Computer Science student with strong experience in IT services and technology support", 
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
          className="mx-auto mb-16 w-full bg-content1/60 backdrop-blur-xl border border-white/10"
        >
          <CardBody className="p-6 md:p-10">
            <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-16">
              {/* Left: image */}
              <Image
                src={m.img}
                alt={`${m.name} headshot`}
                width={224}         // w-56
                height={288}        // h-72
                radius="lg"
                isBlurred
                classNames={{
                  wrapper: "shrink-0 rounded-2xl bg-white/20 backdrop-blur-3xl",
                  img: "object-cover",
                }}
              />

              {/* Right: text */}
              <div className="text-left md:flex-1">
                <h2 className="text-3xl font-semibold leading-tight">{m.name}</h2>
                <p className="text-base text-gray-400 mt-1">{m.role}</p>
                {/* keep one line; add ellipsis if it overflows */}
                <p className="mt-4 text-lg leading-relaxed whitespace-nowrap overflow-hidden text-ellipsis">
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
