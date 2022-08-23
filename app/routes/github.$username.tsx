import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

type User = {
  login: string;
  avatar_url: string;
  html_url: string;
  bio: string;
};

type LoaderData = {
  user: User;
};

export const loader: LoaderFunction = async ({ params }) => {
  const res = await fetch(`https://api.github.com/users/${params.username}`);
  return {
    user: await res.json(),
  };
};

export default function Index() {
  const { user } = useLoaderData<LoaderData>();

  console.log({ user });

  return (
    <>
      <h1>Hello World {user.avatar_url}</h1>
      <img src={user.avatar_url} alt="Imagem" />
    </>
  );
}
