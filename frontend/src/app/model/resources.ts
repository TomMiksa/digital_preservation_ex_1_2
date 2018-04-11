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

}
