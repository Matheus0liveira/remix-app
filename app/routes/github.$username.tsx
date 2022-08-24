import { useLoaderData } from "@remix-run/react";
import type { ErrorBoundaryComponent, LoaderFunction } from "@remix-run/node";

import type { Types } from "~/features/github";
import { Repositories } from "~/features/github";
import { GithubAPI } from "~/features/github";
import { Error } from "~/components";

export const loader: LoaderFunction = async ({ params }) => {
  return {
    user: await GithubAPI.getGithubUser(params.username),
    repos: await GithubAPI.getGithubUserRepos(params.username),
  };
};

export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => {
  return <Error error={error} />;
};

export default function Index() {
  const { user, repos } = useLoaderData<Types.Repositories.LoaderData>();

  return <Repositories user={user} repos={repos} />;
}
