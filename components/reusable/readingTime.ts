import pThrottle from "p-throttle";
import client from "@/utils/apolloClient";

export const calculateReadingTime = (content: string): number => {
  const wordsPerMinute = 160; // Assuming an average reading speed of 160 words per minute
  const text = content?.replace(/<[^>]*>/g, ""); // remove HTML tags from the content
  const wordCount = text.trim().split(/\s+/g).length; // remove white space and count words
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  return readingTime;
};

export const getRandomItems = (arr: any[], count: number) => {
  const shuffled = arr.slice(0);
  let i = arr.length;
  const min = i - count;
  let temp;
  let index;

  while (i-- > min) {
    index = Math.floor((i + 1) * Math.random());
    temp = shuffled[index];
    shuffled[index] = shuffled[i];
    shuffled[i] = temp;
  }

  return shuffled.slice(min);
};
