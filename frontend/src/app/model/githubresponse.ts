export interface GitHubResponse {
  owner: GitHubUser;
  license: License;
  languages_url: string;
  size: number;
  contributors_url: string;
}

export interface GitHubUser {
  login: string;
  avatar: string;
  html_url: string;
}

export interface License {
  key: string;
  name: string;
  url: string;
}

export interface GitHubLicense {
  key: string;
  name: string;
  html_url: string;
}

export interface GitHubLanguageEntry {
  name: string;
  loc: number;
}
