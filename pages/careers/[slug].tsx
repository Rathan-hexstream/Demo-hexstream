import client from "@/utils/apolloClient";
import { gql } from "@apollo/client";
import Image from "next/image";
import { RichText } from "@graphcms/rich-text-react-renderer";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import Modal from "@/components/reusable/Modal";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import I5 from "@/public/assets/China-Europes-biggest-onshore-wind-park-Ukraine-.jpg";
import Head from "next/head";

interface formData {
  fullName: string;
  email: string;
  phone: string;
  message: string;
  file: null | File;
}

const Careers = ({ data }: any) => {
  const router = useRouter();
  const query = router.query.slug;

  const [isOpen, setIsOpen] = useState(false);
  const [Loading, setLoading] = useState(false);

  const form = useRef<HTMLFormElement | null>(null);

  const fileTypes = [
    ".msword",
    ".docx",
    ".pdf",
    ".vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  interface formTypes {
    fullName: string;
    email: string;
    phone: string;
    message: string;
    file: File | null;
  }

  const [contactFormData, setContactFormData] = useState<formTypes>({
    fullName: "",
    email: "",
    phone: "",
    message: "",
    file: null,
  });

  async function handleSubmit() {
  setLoading(true);

  if (
    !contactFormData.email ||
    !contactFormData.fullName ||
    !contactFormData.message ||
    !contactFormData.phone ||
    !contactFormData.file
  ) {
    setLoading(false);
    toast.error("Please provide all the details!");
    return;
  }

  if (
    !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
      contactFormData.email.toString()
    )
  ) {
    setLoading(false);
    toast.error("Please provide a valid email id.");
    return;
  }

  const fileType =
    contactFormData.file.type === "audio/x-wav"
      ? ".wav"
      : `.${contactFormData.file.type.replace(/(.*)\//g, "")}`;
  if (!fileTypes.includes(fileType)) {
    setLoading(false);
    toast.error(`Invalid File Type. Please attach a .pdf, .doc or a .rtf file.`);
    return;
  }

  if (contactFormData?.file?.size > 5000000) {
    setLoading(false);
    toast.error(`File should not be greater than 5MB`);
    return;
  }

    const formData = new FormData();

    formData.append("fullName", contactFormData.fullName);
    formData.append("email", contactFormData.email);
    formData.append("phone", contactFormData.phone);
    formData.append("message", contactFormData.message);
    formData.append("title", data.jobTitle);
    formData.append("file", contactFormData.file as File);

  try {
    await fetch("/api/jobApp", {
      method: "POST",
      body: formData,
    });

    setLoading(false);
    toast.success(
      "Your application has been received. We will get back to you as soon as we can.",
      { duration: 5000 }
    );
    setContactFormData({
      fullName: "",
      email: "",
      phone: "",
      message: "",
      file: null,
    });
    setIsOpen(false);
  } catch (err) {
    console.log("CAREER SUBMIT ERROR:", err);
    setLoading(false);
    toast.error("Something went wrong. Please try again later.");
  }
}

  return (
    <>
      <Head>
        <title>{data.jobTitle}</title>
        <link rel="canonical" href={`https://hexstream.com/careers/`} />
        {/* OG Tags */}
        <meta property="og:title" content={data.jobTitle} />
        <meta
          property="og:url"
          content={`https://hexstream.com/careers/${data.slug}`}
        />
        {/* <meta property="og:image" content={data.mainBanner.url ?? ""} /> */}
        <meta property="og:type" content="Jobs" />
        <meta
          property="og:description"
          content={data?.jobDescription?.text ?? null}
        />
        <meta name="twitter:card" content="summary" />
        <meta property="twitter:title" content={data.jobTitle} />
        <meta
          property="twitter:description"
          content={data?.jobDescription?.text ?? null}
        />
        <meta
          property="twitter:url"
          content={`https://hexstream.com/careers/${data.slug}`}
        />
        {/* <meta property="twitter:image" content={data.mainBanner.url ?? ""} /> */}
      </Head>
      <div className="">
        <div className="grid md:grid-cols-2 grid-cols-1 pt-24 md:gap-12 bg-prime">
          <div className="flex md:justify-center items-center px-8 py-8 lg:px-16 md:px-10 md:order-none order-2">
            <div>
              <h1 className=" md:text-3xl text-2xl font-bold md:pb-4 pb-3">
                {data.jobTitle}
              </h1>
              {data.location && (
                <div className="flex gap-2 justify-start items-center">
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16.879"
                      height="16.879"
                      viewBox="0 0 16.879 16.879"
                    >
                      <path
                        id="Icon_awesome-location-arrow"
                        data-name="Icon awesome-location-arrow"
                        d="M14.654.116.948,6.442A1.6,1.6,0,0,0,1.58,9.5h5.8v5.8a1.6,1.6,0,0,0,3.058.633L16.763,2.225A1.645,1.645,0,0,0,14.654.116Z"
                        transform="translate(0 0)"
                        fill="#071757"
                      />
                    </svg>
                  </span>
                  <p>{data.location}</p>
                </div>
              )}
              {data.workExperience && (
                <div>
                  <h2 className="text-lg md:text-xl font-bold pt-6 pb-2">
                    Work Experience :
                  </h2>
                  <p>{data.workExperience}</p>
                </div>
              )}
              {data.skills && (
                <div>
                  <h2 className="text-lg md:text-xl font-bold pt-6 py-2">
                    Must Have Skills :
                  </h2>
                  <div className="prose prose-teal leading-8">
                    <RichText content={data.skills?.raw.children} />
                  </div>
                </div>
              )}
              {data.shortDescription && (
                <div>
                  <div className="prose prose-teal leading-8">
                    <RichText content={data.shortDescription?.raw.children} />
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="md:order-none order-1 relative">
            <svg
              className="absolute -left-[147px] hidden h-full w-72 fill-prime  transform  md:block"
              fill="currentColor"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <polygon points="50,0 100,0 50,100 ,0" />
            </svg>
            <div className="w-full h-full">
              <Image
                className="w-full object-cover h-full"
                src={I5}
                alt="Two women discussing a business plan."
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <Modal setOpen={setIsOpen} open={isOpen}>
          <div className="mt-5 text-black ">
            <h4 className="text-lg font-bold text-">
              <span className="block">
                You are applying for the position of : {data.jobTitle}
              </span>
            </h4>
            <form
              encType="multipart/form-data"
              ref={form}
              name="Job_Application"
              className="mt-8 grid grid-cols-1 gap-y-4"
            >
              <div>
                <input
                  type="text"
                  className="hidden"
                  name="Position"
                  value={data.jobTitle}
                  onChange={() => null}
                />
                <label htmlFor="full-name" className="">
                  Full Name
                </label>
                <input
                  value={contactFormData.fullName}
                  onChange={(e) =>
                    setContactFormData((prev: any) => ({
                      ...prev,
                      fullName: e.target.value,
                    }))
                  }
                  type="text"
                  name="Full-Name"
                  id="full-name"
                  autoComplete="name"
                  className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-primary focus:border-primary border-gray-300 rounded-md  border-2"
                  placeholder="Full Name"
                />
              </div>
              <div>
                <label htmlFor="email" className="">
                  Email
                </label>
                <input
                  value={contactFormData.email}
                  onChange={(e) =>
                    setContactFormData((prev: any) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                  id="email"
                  name="Email"
                  type="email"
                  autoComplete="email"
                  className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-primary focus:border-primary border-gray-300 rounded-md  border-2"
                  placeholder="Email"
                />
              </div>
              <div>
                {/* <label htmlFor="phone" className="">
                  Phone
                </label> */}
                <PhoneInput
                  onChange={(phone, b, c, formatted) => {
                    setContactFormData({
                      ...contactFormData,
                      phone: formatted,
                    });
                  }}
                  inputProps={{
                    name: "phone",
                  }}
                  value={contactFormData.phone}
                  country={"us"}
                  inputClass="!w-full py-6 !bg-white !text-black"
                  containerClass="!text-black !bg-white"
                />
              </div>
              <div>
                <label htmlFor="message" className="">
                  A brief regarding your background and work experience.
                </label>
                <textarea
                  value={contactFormData.message}
                  onChange={(e) =>
                    setContactFormData((prev: any) => ({
                      ...prev,
                      message: e.target.value,
                    }))
                  }
                  id="message"
                  name="Message"
                  rows={4}
                  className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-primary focus:border-primary rounded-md  border-2"
                  placeholder="A brief regarding your background and work experience."
                />
              </div>
              <div className="text-left w-full shadow-sm px-4 placeholder-gray-500 focus:ring-primary focus:border-primary border-gray-300 rounded-md  border-2">
                <label htmlFor="CV">
                  <span className="bg-white px-2 text-center rounded-md flex items-center justify-between py-3">
                    <div className="flex items-center gap-2 cursor-pointer">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13"
                        />
                      </svg>
                      <span>
                        {" "}
                        {contactFormData.file == undefined
                          ? "Attach your CV"
                          : contactFormData.file?.name}
                      </span>
                    </div>
                    {contactFormData.file?.name ? (
                      <strong className="text-xl cursor-pointer alert-del">
                        {/* <Image
                          src={upload}
                          height={20}
                          width={20}
                          alt=""
                          title="Upload your CV"
                        /> */}
                      </strong>
                    ) : (
                      ""
                    )}
                  </span>
                </label>

                <input
                  id="CV"
                  name="CV"
                  className="hidden"
                  // value={contactFormData.file?.name || ""}
                  type="file"
                  onChange={(e) =>
                    setContactFormData((prev: any) => ({
                      ...prev,
                      // @ts-ignore
                      file: e.target.files[0],
                    }))
                  }
                />
              </div>
              <span className="text-gray-400">
                * Please attach a .pdf, .doc or a .rtf file{" "}
              </span>
              <div className="flex gap-2 justify-center items-center hover:cursor-pointer w-fit mx-auto border-2 hover:text-white text-lg bg- px-2 md:px-4 py-1 transition-colors duration-300 relative group/item">
                <div className="absolute w-full h-full -z-10 group-hover/item:bg-secondary translate-x-0 translate-y-0 transition-all transform duration-500"></div>
                <button
                  className="text-sm md:text-lg"
                  // onClick={() => setIsOpen(true)}
                  onClick={(e) => {
                    e.preventDefault();
                    if (!Loading) {
                      handleSubmit();
                    }
                  }}
                >
                  {Loading ? "Submitting..." : "Submit"}
                </button>

                <span>
                  {Loading ? (
                    <div role="status">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        aria-hidden
                        className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-primary"
                        viewBox="0 0 100 101"
                      >
                        <path
                          fill="currentColor"
                          d="M100 50.59c0 27.615-22.386 50.001-50 50.001s-50-22.386-50-50 22.386-50 50-50 50 22.386 50 50zm-90.919 0c0 22.6 18.32 40.92 40.919 40.92 22.599 0 40.919-18.32 40.919-40.92 0-22.598-18.32-40.918-40.919-40.918-22.599 0-40.919 18.32-40.919 40.919z"
                        ></path>
                        <path
                          fill="currentFill"
                          d="M93.968 39.04c2.425-.636 3.894-3.128 3.04-5.486A50 50 0 0041.735 1.279c-2.474.414-3.922 2.919-3.285 5.344.637 2.426 3.12 3.849 5.6 3.484a40.916 40.916 0 0144.131 25.769c.902 2.34 3.361 3.802 5.787 3.165z"
                        ></path>
                      </svg>
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-3 h-3"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                      />
                    </svg>
                  )}
                </span>
              </div>
            </form>
          </div>
        </Modal>
      </div>

      <div className="max-w-5xl mx-auto w-10/12 py-8">
        {data && (
          <div>
            <h2 className="text-lg md:text-xl font-bold md:pt-6 pb-2">
              Job Description :
            </h2>
            <div className="prose prose-teal leading-8">
              <RichText content={data.jobDescription?.raw.children} />
            </div>
          </div>
        )}
        <div className="pt-6 ">
          <div className="flex gap-2 justify-center items-center hover:cursor-pointer w-fit border-2 border-gray-200 hover:text-white text-lg bg- px-2 md:px-4 py-1 transition-colors duration-300 relative group/item">
            <div className="absolute w-full h-full -z-10 group-hover/item:bg-secondary translate-x-0 translate-y-0 transition-all transform duration-500"></div>
            <button
              className="text-sm md:text-base"
              onClick={() => setIsOpen(true)}
            >
              Apply now
            </button>
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
          </div>
        </div>
      </div>
    </>
  );
};

export default Careers;

export async function getServerSideProps({ params }: { params: any }) {
  const { data } = await client.query({
    query: gql`
      query MyQuery {
        jobListings(where: { slug: "${params.slug}" }) {
          jobTitle
          slug
          shortDescription{
            text
            raw
          }
          jobDescription {
            text
            raw
          }
          location
          skills {
            raw
          }
          education
     
          workExperience
        }
      }
    `,
  });

  if (!data.jobListings.length) {
    return {
      notFound: true,
    };
  }

  return {
    props: { data: data.jobListings[0] },
  };
}
