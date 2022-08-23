export type User = {
  login: string;
  avatar_url: string;
  html_url: string;
  bio: string;
};

export namespace Repositories {
  export type Repo = {
    id: number;
    name: string;
    full_name: string;
    stargazers_coubt: string;
    html_url: string;
    language: string;
  };

  export type LoaderData = {
    user: User;
    repos: Repo[];
  };
}

export namespace Commits {
  export type APIResponse = {
    sha: string;
    commit: {
      message: string;
    };
    html_url: string;
  };

  export type Commit = {
    sha: string;
    message: string;
    html_url: string;
  };

  export type LoaderData = {
    user: User;
    commits: Commit[];
  };
}
