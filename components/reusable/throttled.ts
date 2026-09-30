import pThrottle from "p-throttle";
import client from "@/utils/apolloClient";

// Set the limit of # of calls per interval in ms (5 per second)
const throttle = pThrottle({ limit: 2, interval: 2000 });
export const throttledFetch = throttle(async (...args) => {
  const [query, vars]: any = args;

  const data = await client.query({ query: query });

  return data;
});

export const paginate = (
  items: AsyncGeneratorFunction[],
  pageNumber: number,
  pageSize: number
  // sortby: string
) => {
  const startIndex = (pageNumber - 1) * pageSize;
  return items.slice(startIndex, startIndex + pageSize); // 0, 9
};
