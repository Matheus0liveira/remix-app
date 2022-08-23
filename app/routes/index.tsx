import type { LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { users } from "~/features/github/components/SelectUser";

export const loader: LoaderFunction = () =>
  redirect(`/github/${users[0].username}`);
