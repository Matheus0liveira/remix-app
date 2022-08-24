import invariant from "tiny-invariant";
import pick from "lodash.pick";
import type { Types } from ".";

const config = {
  headers: {
    accept: "application/vnd.github.v3+json",
    Authorization: `token ${process.env.GITHUB_ACCESS_KEY}`,
  },
};

export const getGithubUser = async (username?: string) => {
  invariant(username, "Please provide an username as a string");

  const res = await fetch(`https://api.github.com/users/${username}`, config);

  const user = (await res.json()) as Types.User;

  return pick(user, ["avatar_url", "bio", "html_url", "login"]);
};

export const getGithubUserRepos = async (username?: string) => {
  invariant(username, "Please provide an username as a string");

  const res = await fetch(
    `https://api.github.com/users/${username}/repos`,
    config
  );

  const data = (await res.json()) as Types.Repositories.Repo[];

  return data.map((repo) =>
    pick(repo, [
      "id",
      "name",
      "html_url",
      "description",
      "full_name",
      "stargazers_count",
      "language",
    ])
  );
};

export const getGithubCommits = async (
  reponame?: string,
  username?: string
) => {
  invariant(reponame, "Please provide an repoName as a string");
  invariant(username, "Please provide an repoName as a string");

  const res = await fetch(
    `https://api.github.com/repos/${username}/${reponame}/commits`,
    config
  );

  const data = (await res.json()) as Types.Commits.APIResponse[];

  return data.map((commit) => ({
    sha: commit.sha,
    message: commit.commit.message,
    html_url: commit.html_url,
  }));
};
