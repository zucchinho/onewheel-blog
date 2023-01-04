import { Outlet } from "@remix-run/react";

export default function PostsRoute() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: { error: unknown }) {
  if (error instanceof Error) {
    return (
      <div className="text-red-500">
        Oh no, something went wrong!
        <pre>{error.message}</pre>
      </div>
    );
  }

  return <div className="text-red-500">Oh no, something went wrong!</div>;
}
