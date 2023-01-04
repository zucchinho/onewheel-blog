import { Link, useLoaderData } from "@remix-run/react";
import { json, type LoaderFunction } from "@remix-run/node";
import { getPosts } from "~/models/post.server";
import { useOptionalAdminUser } from "~/utils";

type LoaderData = {
  posts: Awaited<ReturnType<typeof getPosts>>;
};

export const loader: LoaderFunction = async () => {
  return json<LoaderData>({
    posts: await getPosts(),
  });
};

export default function Posts() {
  const { posts } = useLoaderData<LoaderData>();
  const adminUser = useOptionalAdminUser();

  return (
    <main>
      <h1>Posts</h1>
      {adminUser ? (
        <Link to="admin" prefetch="intent" className="text-red-600 underline">
          Admin
        </Link>
      ) : null}
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link to={post.slug} className="text-blue-600 underline">
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
