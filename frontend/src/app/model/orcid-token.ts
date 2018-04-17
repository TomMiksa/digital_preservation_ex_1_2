export class OrcidToken {
  access_token: string;
  token_type: string;
  refresh_token: string;
  expires_in: number;
  scope: string;
  name: string;
  orcid: string;

  constructor(access_token, name, orcid) {
    this.access_token = access_token;
    this.name = name;
    this.orcid = orcid;
  }
}
