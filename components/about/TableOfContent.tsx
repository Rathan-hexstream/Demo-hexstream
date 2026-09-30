import { useHeadingsData } from "@/components/about/useheadingdata.hook";
import { useIntersectionObserver } from "./useIntersectionObserver";
import { useState } from "react";

const Headings = (data: any) => {
  return (
    <ul className="pl-2 pr-8 space-y-4 w-full">
      {data.headings.map((heading: any) => (
        <li className={`w-full`} key={heading.id}>
          <a
            className={`hover:bg-lightGray duration-300 transition-colors text-sm font-bold rounded-md p-2 block w-full relative ${
              heading.id === data.activeId
                ? "bg-prime text-primary toc-active"
                : ""
            }`}
            href={`#${heading.id}`}
          >
            {heading.title}
          </a>
        </li>
      ))}
    </ul>
  );
};

const TableOfContents = () => {
  const [activeId, setActiveId] = useState();
  const { nestedHeadings } = useHeadingsData();
  useIntersectionObserver(setActiveId);
  return (
    <nav
      className="overflow-auto w-full text-white rounded-md"
      aria-label="Terms & Conditions - Table of Contents"
    >
      <Headings headings={nestedHeadings} activeId={activeId} />
    </nav>
  );
};

export default TableOfContents;
