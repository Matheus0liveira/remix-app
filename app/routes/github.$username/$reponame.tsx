import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { NotFound } from "~/components";
import type { Types } from "~/features/github";
import { GithubAPI } from "~/features/github";
import { Commits } from "~/features/github/components/Commits";

export const loader: LoaderFunction = async ({
  params,
}): Promise<Types.Commits.LoaderData> => {
  try {
    const user = await GithubAPI.getGithubUser(params.username);

    const commits = await GithubAPI.getGithubCommits(
      params.reponame,
      params.username
    );

    return {
      user,
      commits,
    };
  } catch (error) {
    throw new Response("Repo not found", { status: 404 });
  }
};

export default function () {
  const { commits, user } = useLoaderData<Types.Commits.LoaderData>();
  return <Commits commits={commits} user={user} />;
}

export const CatchBoundary = () => {
  return (
    <div className="p-2">
      <NotFound message="We couldn'd find a repository with provider ID" />
    </div>
  );
};
