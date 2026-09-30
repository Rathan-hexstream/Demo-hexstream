import React from "react";
import Image from "next/image";

// software partners
import I from "@/public/assets/partners/oracle_partner.png";
import I1 from "@/public/assets/partners/azure logo.png";
import I3 from "@/public/assets/partners/aws logo.jpg";
import I5 from "@/public/assets/partners/google logo.png";
import I4 from "@/public/assets/partners/convey logo.jpeg";
import I6 from "@/public/assets/partners/databricks final.png";
import I7 from "@/public/assets/partners/informatica logo.png";
import I8 from "@/public/assets/partners/microsoft partner logo.png";
import I9 from "@/public/assets/partners/neo4j logo.png";
import I10 from "@/public/assets/partners/qlik logo.png";
import I11 from "@/public/assets/partners/snowflake logo.png";
import I12 from "@/public/assets/partners/tableau logo.png";

const softwarePartners = [
    { img: I, alt: "Oracle logo", name: "Oracle", large: true },
    { img: I1, alt: "Azure logo", name: "Azure" },
    { img: I3, alt: "AWS logo", name: "AWS" },
    { img: I5, alt: "Google logo", name: "Google" },
    { img: I4, alt: "Convey logo", name: "Convey", large: true },
    { img: I6, alt: "Databricks Final", name: "Databricks", large: true },
    { img: I7, alt: "Informatica Logo", name: "Informatica", large: true },
    { img: I8, alt: "Microsoft Logo", name: "Microsoft" },
    { img: I9, alt: "Neo4j Logo", name: "Neo4j" },
    { img: I10, alt: "Qlik Logo", name: "Qlik" },
    { img: I11, alt: "Snowflake Logo", name: "Snowflake", large: true },
    { img: I12, alt: "Tableau Logo", name: "Tableau", large: true },
];

const Partners = () => {
    return (
        <div className="text-primary py-16 bg-gray-50" id="partners">
            <div className="text-center max-w-4xl mx-auto w-11/12">
                <h2 className="md:text-4xl text-2xl pb-6 font-bold">
                    Our Technology Partners
                </h2>

                <p className="text-gray-600 leading-relaxed">
                    HEXstream has strategic partnerships with industry-leading
                    technology firms and specialized partners who share our vision
                    for delivering excellence and long-term value.
                </p>
            </div>

            {/* Full-width modern grid */}
            <div className="w-full mx-auto pt-14">
                {/*<h3 className="text-2xl font-semibold text-center mb-10">*/}
                {/*    Technology Partners*/}
                {/*</h3>*/}

                <div
                    className="
            grid
            grid-cols-2
            sm:grid-cols-3
            md:grid-cols-4
            lg:grid-cols-6
            gap-8
            px-6
            md:px-16
          "
                >
                    {softwarePartners.map((partner) => (
                        <div
                            key={partner.alt}
                            className="
                bg-white
                p-6
                rounded-xl
                shadow-sm
                hover:shadow-xl
                transition-all
                duration-300
                flex
                items-center
                justify-center
                h-32
              "
                        >
                            <Image
                                src={partner.img}
                                alt={partner.alt}
                                height={partner.large ? 150 : 100}
                                width={partner.large ? 150 : 100}
                                className={`
                  object-contain 
                  w-full h-full 
                  transition-transform duration-300 
                  hover:scale-105
                  ${partner.large ? "scale-110" : ""}
                `}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Partners;
