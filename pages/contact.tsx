import { useEffect, useRef, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { motion, AnimatePresence } from "framer-motion";

import contactImg from "../public/assets/contact.jpg";
import Head from "next/head";
import Loader from "@/components/reusable/Loader";

const variants = {
  fadeIn: {
    x: 100,
    opacity: 0,
    transition: {
      duration: 0.25,
      ease: "easeInOut",
    },
  },
  inactive: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.25,
      ease: "easeInOut",
    },
  },
  fadeOut: {
    opacity: 0,
    x: 100,
    transition: {
      duration: 0.25,
      ease: "easeInOut",
    },
  },
};

const location = [
  {
    office: "Chicago HQ",
    address: "311 S Wacker Dr., Suite 6550, Chicago, IL 60606.",
    loc: () => {
      return (
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2970.7010515130587!2d-87.63813092381135!3d41.877777971241784!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880e2cbe56bcf871%3A0xa0404af0d4b77b15!2s311%20S%20Wacker%20Dr%20%236550%2C%20Chicago%2C%20IL%2060606%2C%20USA!5e0!3m2!1sen!2sin!4v1688110321540!5m2!1sen!2sin"
          className="border-none rounded-lg w-full h-[500px]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      );
    },
  },
  {
    office: "Boston",
    address: "44 Bearfoot Road, Suite 200, Northborough, MA 01532.",
    loc: () => {
      return (
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2949.0061628747094!2d-71.63273472378832!3d42.34239197119453!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e3f45040bfffff%3A0x18262114a8968318!2s44%20Bearfoot%20Rd%20%23200%2C%20Northborough%2C%20MA%2001532%2C%20USA!5e0!3m2!1sen!2sin!4v1688110414789!5m2!1sen!2sin"
          className="border-none rounded-lg w-full h-[500px]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      );
    },
  },
  {
    office: "Toronto",
    address: "150 King St. West, Suite #220, Toronto, ON M5H 1J9.",
    loc: () => {
      return (
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2887.001906745857!2d-79.38705952372226!3d43.64812867110235!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b34d240400001%3A0xdbe913a280eda1b0!2s150%20King%20St%20W%20Suite%20%23220%2C%20Toronto%2C%20ON%20M5H%201J9%2C%20Canada!5e0!3m2!1sen!2sin!4v1688110498695!5m2!1sen!2sin"
          className="border-none rounded-lg w-full h-[500px]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      );
    },
  },
  {
    office: "Hyderabad",
    address:
      "AA Lakefront, 5th Floor, 1-89/3/20, Plot No 20, Madhapur 500081, Hyderabad, Telangana, India.",
    loc: () => {
      return (
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30449.884943185858!2d78.3526768125266!3d17.4484332592409!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9158f201b205%3A0x11bbe7be7792411b!2sMadhapur%2C%20Hyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1688111137569!5m2!1sen!2sin"
          className="border-none rounded-lg w-full h-[500px]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      );
    },
  },
];

const Contact = () => {
  const [contact, setContact] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    companyName: "",
    solution: "",
    message: "",
  });

  const [index, setIndex] = useState<any>(0);
  const [data, setData] = useState<any>(location[index]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setData(location[index]);
  }, [index]);

  const form = useRef<null | HTMLFormElement>(null);

  function handleSubmit(e: any) {
    e.preventDefault();
    if (typeof form !== null) {
      if (
        !contact.firstName ||
        !contact.lastName ||
        !contact.mobile ||
        !contact.email ||
        !contact.companyName ||
        !contact.solution ||
        !contact.message
      ) {
        toast.error("Please provide all the details!");
        return;
      }

      if (
        !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
          contact.email.toString()
        )
      ) {
        toast.error("Please provide a valid email id.");
        return;
      }

      try {
        fetch("/api/contact", {
          method: "POST",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(contact),
        });
        toast.success(
          "Your enquiry has been submitted successfully. We'll get back to you at our earliest.",
          { duration: 3000 }
        );
      } catch (e) {
        toast.error("Something went wrong. Please try again later.");
      }
    }
    setContact({
      firstName: "",
      lastName: "",
      companyName: "",
      message: "",
      mobile: "",
      email: "",
      solution: "",
    });
  }

  function formatPhoneNumber(phoneNumberString: string) {
    var cleaned = ("" + phoneNumberString).replace(/\D/g, "").slice(0, 10);
    var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return "(" + match[1] + ") " + match[2] + "-" + match[3];
    }
    return "";
  }

  return (
    <>
      {loading && <Loader />}
      <Head>
        <title>{`Contact HEXstream - Your Partner in Utility Analytics.`}</title>
        <meta
          name="description"
          content="Reach out to HEXstream for more information about our utility data analytics solutions. We're here to assist you."
        />
      </Head>
      {/* <NewPageheader
        title="Contact Us"
        description="At HEXStream, we draw inspiration from the Hexagon, the most stable geometric shape found in nature. It represents balance, harmony, and interconnectedness—values that define our approach to revolutionizing the utilities sector. Our name reflects our commitment to creating a seamless flow of data, empowering utility companies with real-time insights and unleashing their true potential."
        img={I5}
      /> */}
      <div className="bg-prime-light ">
        <div className="grid grid-cols-1 lg:grid-cols-5 -z-0 text-white pt-24 mb-10 relative mx-auto max-w-7xl">
          <div className="col-span-1 md:col-span-2 grid place place-items-center bg-white/20 backdrop-blur-lg m-5 rounded-xl">
            <div className="p-4 md:px-10">
              <h2 className="font-bold text-3xl md:text-5xl pb-5 md:pb-8">
                Contact Us
              </h2>
              <p className="text-base md:text-lg">
                At HEXStream, we draw inspiration from the Hexagon, the most
                stable geometric shape found in nature. It represents balance,
                harmony, and interconnectedness—values that define our approach
                to revolutionizing the utilities sector. Our name reflects our
                commitment to creating a seamless flow of data, empowering
                utility companies with real-time insights and unleashing their
                true potential.
              </p>
            </div>
          </div>
          <div className="md:py-12 w-11/12 md:col-span-3 col-span-1 mx-auto">
            <div className="py-10">
              <form
                ref={form}
                name="contact"
                encType="multipart/form-data"
                className=""
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="mb-4">
                    <label
                      htmlFor="name"
                      className="block font-medium mb-1 text-white"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={contact.firstName}
                      onChange={(e) =>
                        setContact((prev) => ({
                          ...prev,
                          firstName: e.target.value,
                        }))
                      }
                      className="w-full p-2 border-b-2 border-gray-400 bg-transparent focus:outline-none"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="email"
                      className="block font-medium mb-1 text-white"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastname"
                      name="lastname"
                      value={contact.lastName}
                      onChange={(e) =>
                        setContact((prev) => ({
                          ...prev,
                          lastName: e.target.value,
                        }))
                      }
                      className="w-full p-2 border-b-2 border-gray-400 bg-transparent focus:outline-none"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="mb-4">
                    <label
                      htmlFor="mobile"
                      className="block font-medium mb-1 text-white"
                    >
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      id="mobile"
                      name="mobile"
                      pattern="[0-9]*"
                      value={contact.mobile}
                      onChange={(e) =>
                        setContact((prev) => ({
                          ...prev,
                          mobile: e.target.value,
                        }))
                      }
                      className="w-full p-2 border-b-2 border-gray-400 bg-transparent focus:outline-none"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="email"
                      className="block font-medium mb-1 text-white"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={contact.email}
                      onChange={(e) =>
                        setContact((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      className="w-full p-2 border-b-2 border-gray-400 bg-transparent focus:outline-none"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="">
                    <label
                      htmlFor="Company"
                      className="block font-medium mb-1 text-white"
                    >
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="Company"
                      name="Company"
                      value={contact.companyName}
                      onChange={(e) =>
                        setContact((prev) => ({
                          ...prev,
                          companyName: e.target.value,
                        }))
                      }
                      className="w-full p-2 border-b-2 border-gray-400 bg-transparent focus:outline-none"
                      required
                    />
                  </div>

                  <div className="">
                    <label
                      htmlFor="service"
                      className="block font-medium mb-1 text-white"
                    >
                      Solution Name{" "}
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={contact.solution}
                      onChange={(e) =>
                        setContact((prev) => ({
                          ...prev,
                          solution: e.target.value,
                        }))
                      }
                      className="w-full p-2.5 border-b-2 border-gray-400 bg-transparent focus:outline-none text-white"
                      required
                    >
                      <option value="" className="">
                        -- Please select --
                      </option>
                      <option value="Life Insurance" className="">
                        Solution 1
                      </option>
                      <option value="Group Health Plan" className="">
                        Solution 2
                      </option>
                      <option value="Group Dental & Vision Plan" className="">
                        Solution 3
                      </option>
                      <option value="Customized Benefit Plan" className="">
                        Solution 4
                      </option>
                    </select>
                  </div>
                </div>
                <div className="my-4">
                  <label
                    htmlFor="message"
                    className="block font-medium mb-1 text-white"
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="meassge"
                    value={contact.message}
                    onChange={(e) =>
                      setContact((prev) => ({
                        ...prev,
                        message: e.target.value,
                      }))
                    }
                    className="w-full p-2 border-b-2 border-gray-400 bg-transparent focus:outline-none"
                    required
                  />
                </div>
                {/* mobile number */}
                {/* <div className="mb-4">
                <span className=" text-gray-800 font-bold ">Phone</span>
                <label htmlFor="email" className="sr-only">
                  Phone
                </label>
                <PhoneInput
                  onChange={(v, c, e, phone) => {
                    setContact({
                      ...contact,
                      mobile: phone,
                    });
                  }}
                  inputProps={{
                    name: "phone",
                  }}
                  value={contact.mobile}
                  country={"us"}
                  inputClass="!w-full !py-6 !border-b-2 !border-gray-400 !bg-transparent !focus:outline-none "
                  containerClass="!text-black"
                />
              </div> */}

                <div className="pt-6">
                  <button
                    onClick={handleSubmit}
                    className="flex gap-2 justify-center items-center hover:cursor-pointer w-fit mx-auto border-2 border-prime hover:border-white text-white text-lg  px-2 md:px-4 py-1 transition-colors duration-300 relative group/item"
                  >
                    <div className="absolute w-full h-full -z-10 group-hover/item:bg-secondary translate-x-0 translate-y-0 group-hover/item:translate-x-1.5 group-hover/item:translate-y-1.5 transition-all transform duration-500"></div>
                    <div className="text-sm md:text-lg z-10">Send Message</div>
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-3 h-3 "
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                        />
                      </svg>
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* map */}
      <div className="text-primary">
        <div className="relative">
          <div className="w-fit md:h-20  bg-primary px-16 md:px-16 md:py-6 py-6 text-white text-lg md:text-xl lg:text-2xl  font-bold">
            Our Locations
          </div>
          <div className="absolute -top-[52px] -left-16 ">
            <svg
              id="Layer_1"
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              width="115"
              height="180"
              viewBox="0 0 241.203 208.887"
              className="h-"
            >
              <path
                id="Path_2"
                data-name="Path 2"
                d="M180.9,0H60.3L0,104.444,60.3,208.887H180.9l60.3-104.444Z"
                fill="#eb2c2e"
              />
            </svg>
          </div>
        </div>
        {/* max-w-7xl w-11/12 */}
        <div className="mx-auto pt-12 pb-8 md:text-left text-center">
          <div className="grid md:grid-cols-3 grid-cols-1">
            <div className="col-span-1 pb-4">
              <div className="space-y-6 mt-4 ">
                <div
                  className={`"max-w-sm  hover:cursor-pointer hover:underline ${
                    index == 0
                      ? "bg-gray-200 transition-all duration-500 py-2"
                      : ""
                  }`}
                  onClick={() => {
                    setIndex(0);
                  }}
                >
                  <div className="w-fit mx-auto md:mx-0 px-2 md:px-6 lg:px-16">
                    <div>
                      <h2 className="text-lg md:text-left text-center pb-2">
                        Chicago HQ
                      </h2>
                      <h2 className="md:text-sm text-xs">
                        311 S Wacker Dr., Suite 6550, Chicago,
                        <br className="md:hidden block lg:block " /> IL 60606.
                      </h2>
                    </div>
                  </div>
                </div>
                <div
                  className={`"max-w-sm  hover:cursor-pointer hover:underline ${
                    index == 1
                      ? " bg-gray-200 transition-all duration-500 py-2"
                      : ""
                  }`}
                  onClick={() => {
                    setIndex(1);
                  }}
                >
                  <div className="w-fit mx-auto md:mx-0 px-2 md:px-6 lg:px-16">
                    <div>
                      <h2 className="text-lg md:text-left text-center pb-2">
                        Boston
                      </h2>
                      <h2 className="md:text-sm text-xs">
                        44 Bearfoot Road, Suite 200, Northborough,
                        <br className="md:hidden block lg:block" /> MA 01532.
                      </h2>
                    </div>
                  </div>
                </div>
                <div
                  className={`"max-w-sm  hover:cursor-pointer hover:underline ${
                    index == 2
                      ? " bg-gray-200 transition-all duration-500 py-2"
                      : ""
                  }`}
                  onClick={() => {
                    setIndex(2);
                  }}
                >
                  <div className="w-fit mx-auto md:mx-0 px-2 md:px-6 lg:px-16">
                    <div>
                      <h2 className="text-lg md:text-left text-center pb-2">
                        Toronto
                      </h2>
                      <h2 className="md:text-sm text-xs">
                        150 King St. West, Suite #220, Toronto,
                        <br className="md:hidden block lg:block" /> ON M5H 1J9.
                      </h2>
                    </div>
                  </div>
                </div>
                <div
                  className={`"max-w-sm  hover:cursor-pointer hover:underline ${
                    index == 3
                      ? " bg-gray-200 transition-all duration-500 py-2"
                      : ""
                  }`}
                  onClick={() => {
                    setIndex(3);
                  }}
                >
                  <div className="w-fit mx-auto md:mx-0 px-2 md:px-6 lg:px-16">
                    <div>
                      <h2 className="text-lg md:text-left text-center pb-2">
                        Hyderabad
                      </h2>
                      <h2 className="md:text-sm text-xs">
                        AA Lakefront, 5th Floor, 1-89/3/20,
                        <br className="md:hidden block lg:hidden" /> Plot No 20,
                        Madhapur 500081, Hyderabad, Telangana, India.
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-2 md:-mt-10 ">
              <AnimatePresence initial={false} mode="wait">
                <motion.div
                  key={index}
                  variants={variants}
                  initial="fadeIn"
                  animate="inactive"
                  exit="fadeOut"
                  className="duration-200 ease-in-out"
                >
                  {data.loc()}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
