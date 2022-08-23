import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { Types } from "~/features/github";
import { GithubAPI } from "~/features/github";
import { Commits } from "~/features/github/components/Commits";

export const loader: LoaderFunction = async ({
  params,
}): Promise<Types.Commits.LoaderData> => {
  return {
    user: await GithubAPI.getGithubUser(params.username),
    commits: await GithubAPI.getGithubCommits(params.reponame, params.username),
  };
};

export default function () {
  const { commits, user } = useLoaderData<Types.Commits.LoaderData>();
  return <Commits commits={commits} user={user} />;
}
