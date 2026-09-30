import React from "react";
import Jamal from "@/public/assets/Jamal_2.jpg";
import Andreas from "@/public/assets/friday.jpg";
import Kartik from "@/public/assets/Karthik_Photo.jpg";
import Arun from "@/public/assets/Arun_Photo.jpg";
import Image from "next/image";
import Link from "next/link";

const teams = [
  {
    name: "Jamal Syed ",
    img: Jamal,
    designation: "President & CEO",
    linkedIn: "https://www.linkedin.com/in/jamal-syed-461a07/",
    description:
      "Jamal Syed has more than 30 years of experience in software development, data analytics and consulting, and has been involved with several technology startups. He keeps a keen eye on emerging technologies and advises utilities on digital transformation and process optimization. Jamal holds a bachelor’s degree in electrical engineering and master's degree in computer science.",
  },
  {
    name: "Karthik Mada",
    img: Kartik,
    designation: "Senior Vice President",
    linkedIn: "https://www.linkedin.com/in/karthikmada/",
    description:
        "Karthik Mada has been in the data analytics and integration space for more than two decades, working with major utilities in North America to design and implement  numerous analytics solutions related to outage management and grid reliability. Karthik is a trusted advisor to many large utilities, and frequently collaborates with the Oracle product-development team on utility-analytics solutions. Karthik holds a bachelor’s degree in computer science and a master’s in business administration.",
  },
  {
    name: "Bob Doyle",
    img: Andreas,
    designation: "Chief Revenue Officer",
    linkedIn: "https://www.linkedin.com/in/bobdoyle0321/",
    description:
        "Bob Doyle's career spans a diverse range of demanding roles. Before his tenure in software and learning the intricacies of the tech industry, he served as a lineman apprentice, a US Marine, and a career firefighter, where he rose to the rank of deputy fire chief.\n" +
        "\n" +
        "In the tech realm, he has held pivotal roles at Kinaxis, SAP, Qubole and Exasol, most recently serving as the head of global sales at Algo, where he led high-performance sales teams to significant revenue growth. \n" +
        "\n" +
        "Bob's strategic approach integrates deep market insight with a focus on aligning sales strategies to the company’s growth objectives, all while fostering robust partnerships across all teams. Drawing on his unique blend of leadership and adaptability gained through service as a US Marine, firefighter, and tech executive, he is dedicated to placing customer needs at the heart of HEXstream's operations, ensuring that every  decision we make enhances value and satisfaction for those we serve.",
  },
  {
    name: "Arun Kota",
    img: Arun,
    designation: "Vice President",
    linkedIn: "https://www.linkedin.com/in/arunkota/",
    description:
        "Arun Kota brings more than 20 years of expertise in data integration and analytics, with a proven track record of designing and delivering impactful solutions for the utilities, financial, retail and insurance industries. Arun partners closely with clients, helping them build solid data strategies using both traditional on-premises and cutting-edge cloud technologies.\n" +
        "\n" +
        "A frequent collaborator with Oracle's product-development team, Arun actively contributes to advancing utility analytics. His technical proficiency spans Oracle, Microsoft, Snowflake, and big-data technologies. \n" +
        "\n" +
        "Beyond just building solutions, Arun is passionate about ensuring that organizations can actually use their analytics investments effectively, providing hands-on user training and onboarding. Arun holds bachelor's and master's degrees in computer science.",
  },


];

const OurTeam = () => {
  return (
    <div className=" py-6 md:py-12 relative overflow-hidden">
      <div className="absolute top-20 -right-60 -z-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="626.197"
          height="542.301"
          viewBox="0 0 626.197 542.301"
        >
          <g id="Layer_1" data-name="Layer 1" transform="translate(5.773 5)">
            <path
              id="Path_2"
              data-name="Path 2"
              d="M460.988,0H153.662L0,266.15,153.662,532.3H460.988L614.65,266.15Z"
              fill="none"
              stroke="#f4f4f9"
              strokeWidth="10"
            />
          </g>
        </svg>
      </div>
      <h2 className="md:text-3xl text-xl text-center pb-8 font-bold text-primary">
        Leadership
      </h2>
      <div className="flex flex-wrap justify-center gap-6 max-w-7xl mx-auto w-11/12">
        {teams.map((team: any) => (
            <div
                className="w-full sm:w-[40%] md:w-[40%] lg:w-[40%] bg-gray-100/70 rounded-md shadow-xl"
                key={team.name}
            >
              <Image
                  alt={team.name + " image"}
                  src={team.img}
                  className="rounded-t-md h-[450px] w-full object-cover"
              />

              <div className="px-4 pb-4">
                <div className="flex justify-between pt-4">
                  <h3 className="text-lg font-bold text-primary sm:text-xl">
                    {team.name}
                  </h3>
                  <span>
            <Link href={team.linkedIn} target="_blank">
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1.2em"
                  viewBox="0 0 448 512"
                  className="hover:fill-secondary transition-all duration-300"
              >
                <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" />
              </svg>
            </Link>
          </span>
                </div>
                <p className="text-gray-900 text-sm pt-1">{team.designation}</p>
                <p className="mt-2 text-gray-700 text-sm text-justify">{team.description}</p>
              </div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default OurTeam;
