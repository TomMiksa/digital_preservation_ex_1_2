// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,

  orcid: {
    clientId: 'APP-XKGDV7S0FH0UDKAX',
    clientSecret: 'd6738192-a39e-46cb-ab0b-5cbe9ae953d0',
    authDomain: 'https://orcid.org/oauth/authorize',
    tokenDomain: 'https://orcid.org/oauth/token',
    redirectUri: 'http://localhost:4200'
  }

};
