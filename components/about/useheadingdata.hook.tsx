import { useState, useEffect } from "react";

export const useHeadingsData = () => {
  const [nestedHeadings, setNestedHeadings] = useState([]);

  useEffect(() => {
    const headingElements = Array.from(document.querySelectorAll("h3"));

    const newNestedHeadings = getNestedHeadings(headingElements);
    setNestedHeadings(newNestedHeadings);
  }, []);

  return { nestedHeadings };
};

const getNestedHeadings = (headingElements: any) => {
  const nestedHeadings: any = [];

  headingElements.forEach((heading: HTMLHeadingElement) => {
    const { innerText: title, id } = heading;

    if (heading.className.includes("heading")) {
      nestedHeadings.push({ id, title, items: [] });
    }
  });

  return nestedHeadings;
};
