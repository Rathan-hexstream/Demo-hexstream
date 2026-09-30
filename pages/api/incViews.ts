import { Redis } from "@upstash/redis";
import type { NextApiRequest, NextApiResponse } from "next";
import client from "@/utils/apolloClient";
import { gql, useMutation } from "@apollo/client";

const redis = new Redis({
  url: "https://known-chow-38034.upstash.io",
  token:
    "AZSSACQgMTBiMjYyZGEtMzg4ZS00OWI5LTk3NjYtYzUwMDA1YzAxZmRmNGYxNWY3MjJhYjhlNDA4YjlkODMxNTcyMTE0ZWRmZWY=",
});

const INCR_VIEWS_MUTATION = gql`
  mutation incViews($blogId: String!, $count: Int!) {
    updateBlog(where: { blogId: $blogId }, data: { views: $count }) {
      blogId
      views
    }
  }
`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const { Id, title } = req.body;
  // console.log("id : " + Id + " " + "title : " + title);

  const blogId = Id;
  // new blogId would be the blog blogId from request body
  // send 400 if no blogId
  const ipAddress = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

  // Check if this IP has already viewed this post
  const ipExists = await redis.sismember(`post:${blogId}:ips`, ipAddress);

  // console.log(ipAddress, "IpAddress");

  if (!ipExists) {
    // Increment view count and add IP to the set
    const views = await redis.incr(`post:${blogId}:views`);
    await redis.sadd(`post:${blogId}:ips`, ipAddress);

    // const { data, errors } = await client.mutate({
    //   mutation: gql`
    //     mutation Views($blogId: ID!, $count: Int!) {
    //       updateBlog(where: { id: $blogId }, data: { views: $count }) {
    //         blogId
    //         views
    //       }
    //     }
    //   `,
    //   variables: {
    //     blogId: `${blogId}`,
    //     count: `${views}`,
    //   },
    // });

    const { data, errors } = await client.mutate({
      mutation: gql`
        mutation Views {
          updateBlog(where: { id: "${blogId}" }, data: { views: "${views}"}) {
            id
            views
          }
        }
      `,
    });
    return res.status(200).json({ data, ok: true });
  }
  return res.status(200).json({ ok: true });
}
