import {GitHubLanguageEntry, GitHubUser} from "./githubresponse";

export interface Resources {
  resourceType: string;
  license: string;
  errorMsg: string;
}


export interface GitHubResource extends Resources {
  repoName: string;
  size: number;
  owner: GitHubUser;
  contributors: GitHubUser[];
  licence_url: string;
  languages: GitHubLanguageEntry[];
}


export interface DOIResource extends Resources {
  doiLink: string;
  creators: string[];
  date: string;
  description: string;
  identifier_url: string;
  title: string;
  license: string;
  zenodo_identifier: string;
}
