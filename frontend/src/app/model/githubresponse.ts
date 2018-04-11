export interface GitHubResponse {
  owner: GitHubOwner;
  license: License;
}

export interface GitHubOwner {
  login: string;
  avatar: string;
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

export interface GitHubLanguage {

}
