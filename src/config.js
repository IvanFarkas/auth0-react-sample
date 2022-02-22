import configJson from "./auth_config.json";

configJson.domain = process.env.REACT_APP_DOMAIN;
configJson.clientId = process.env.REACT_APP_CLIENT_ID;
configJson.audience = process.env.REACT_APP_API_IDENTIFIER;
configJson.appOrigin = process.env.REACT_APP_APP_BASE_URL;
configJson.apiOrigin = process.env.REACT_APP_API_BASE_URL;

export function getConfig() {
  // Configure the audience here.
  // By default, it will take whatever is in the config (specified by the `audience` key) unless it's the default value of process.env.REACT_APP_API_IDENTIFIER
  // (which is what you get sometimes by using the Auth0 sample download tool from the quickstart page, if you don't have an API).
  // If this resolves to `null`, the API page changes to show some helpful info about what to do with the audience.
  // const audience = configJson.audience && configJson.audience !== process.env.REACT_APP_API_IDENTIFIER ? configJson.audience : null;
  const audience = configJson.audience;

  return {
    domain: configJson.domain,
    clientId: configJson.clientId,
    ...(audience ? { audience } : null),
  };
}
