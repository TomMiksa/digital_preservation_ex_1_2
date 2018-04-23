import {GitHubLanguageEntry, GitHubUser} from "./githubresponse";

export interface Resources {
  resourceType: string;
  license: string;
  errorMsg: string;
  tag: string;
}


export interface GitHubResource extends Resources {
  repoName: string;
  size: number;
  owner: GitHubUser;
  contributors: GitHubUser[];
  licence_url: string;
  languages: GitHubLanguageEntry[];
  language_chart: any[];
}


export interface DOIResource extends Resources {
  creator: string;
  date: string;
  description: string;
  title: string;
  license: string;
  zenodo_identifier: string;
}
