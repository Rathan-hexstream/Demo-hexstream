import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo3 from "../public/assets/bigHeaderLogo.png";
import mbe from "../public/assets/mbe_ori.png";

const navigation = [
    { name: "Success Stories", href: "/Insights?type=Success Stories" },
    { name: "Tech Corner", href: "/Insights?type=Tech Corner" },
    { name: "Blogs", href: "/Insights?type=HEXstream Blog" },
    {
        name: "Whitepapers & Special Reports",
        href: `/Insights?type=${encodeURIComponent("Whitepapers & Special Reports")}`,
    },
    { name: "UAUG", href: "/uaug" },
    { name: "About Us", href: "/about" },
    { name: "Careers", href: "/careers" },
    { name: "Contact Us", href: "https://forms.office.com/r/zg0U7ZmsdF" },
];

const socials = [
    {
        name: "Twitter",
        href: "https://twitter.com/HEXstreamHQ",
        icon: (props: any) => (
            <svg
                fill="#071757"
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 448 512"
                {...props}
            >
                <path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm297.1 84L257.3 234.6 379.4 396H283.8L209 298.1 123.3 396H75.8l111-126.9L69.7 116h98l67.7 89.5L313.6 116h47.5zM323.3 367.6L153.4 142.9H125.1L296.9 367.6h26.3z" />
            </svg>
        ),
    },
    {
        name: "LinkedIn",
        href: "https://www.linkedin.com/company/advanced-analytics-llc/",
        icon: (props: any) => (
            <svg
                fill="#071757"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                {...props}
            >
                <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"></path>
            </svg>
        ),
    },
];

const Footer = () => {
    return (
        <footer className="bg-prime text-primary pt-12 pb-6">
            {/* Main Section */}
            <div className="container mx-auto px-6 lg:px-20 grid md:grid-cols-2 gap-10">
                {/* Left Section */}
                <div className="space-y-6">
                    <Link href="/">
                        <Image
                            priority
                            alt="Hexstream Logo"
                            className="hover:scale-95 transition-transform duration-200"
                            height={120}
                            width={120}
                            src={logo3}
                        />
                    </Link>

                    {/* Socials */}
                    <div>
                        <div className="flex gap-4 items-center">
                            {socials.map((soc) => (
                                <Link
                                    key={soc.name}
                                    href={soc.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:opacity-80"
                                >
                                    <soc.icon className="h-5 w-5 hover:fill-secondary transition-colors" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Address */}
                    <div className="flex gap-3 items-start">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="17"
                            height="17"
                            viewBox="0 0 16.879 16.879"
                        >
                            <path
                                d="M14.654.116.948,6.442A1.6,1.6,0,0,0,1.58,9.5h5.8v5.8a1.6,1.6,0,0,0,3.058.633L16.763,2.225A1.645,1.645,0,0,0,14.654.116Z"
                                fill="#071757"
                            />
                        </svg>
                        <Link
                            href="https://maps.app.goo.gl/QchjhcLp6qoQ9o9YA"
                            target="_blank"
                            className="hover:text-secondary transition-all"
                        >
                            HQ: 311 S Wacker Drive, Suite 6550 Chicago, IL 60606
                        </Link>
                    </div>

                    {/* Email */}
                    <div className="flex gap-3 items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="1em"
                            viewBox="0 0 512 512"
                            fill="#071757"
                            className="h-5 w-5"
                        >
                            <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
                        </svg>
                        <Link
                            href="mailto:info@hexstream.com"
                            className="hover:text-secondary transition-all"
                        >
                            info@hexstream.com
                        </Link>
                    </div>
                </div>

                {/* Right Section */}
                <div className="space-y-4 md:pl-10">
                    <h3 className="font-semibold text-xl border-b border-primary/40 pb-2 inline-block">
                        Quick Links
                    </h3>
                    <ul className="grid grid-cols-2 gap-y-2">
                        {navigation.map((navItem) => (
                            <li key={navItem.name}>
                                <Link
                                    href={navItem.href}
                                    className="hover:text-secondary transition-colors"
                                >
                                    {navItem.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Divider */}
            <div className="h-[1.5px] bg-primary w-11/12 mx-auto my-8 opacity-70" />

            {/* Bottom Section */}
            <div className="container mx-auto px-6 lg:px-20 flex items-center justify-between">
                <Image
                    priority
                    height={60}
                    width={60}
                    alt="MBE Certified"
                    src={mbe}
                />
                <div className="text-lg tracking-wide">
                    © {new Date().getFullYear()} HEXstream Inc. All Rights Reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
