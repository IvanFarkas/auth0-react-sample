const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
require('dotenv').config();
const authConfig = require("./src/auth_config.json");

const app = express();

authConfig.domain = process.env.REACT_APP_DOMAIN;
authConfig.clientId = process.env.REACT_APP_CLIENT_ID;
authConfig.audience = process.env.REACT_APP_API_IDENTIFIER;
authConfig.appOrigin = process.env.REACT_APP_APP_BASE_URL;
authConfig.apiOrigin = process.env.REACT_APP_API_BASE_URL;

const port = process.env.API_PORT || 3001;
const appPort = process.env.SERVER_PORT || 3000;
const appOrigin = authConfig.appOrigin || `http://localhost:${appPort}`;

if (!authConfig.domain || !authConfig.audience || authConfig.audience === "API_IDENTIFIER") {
  console.log("Exiting: Please make sure that auth_config.json is in place and populated with valid domain and audience values");
  process.exit();
}

app.use(morgan("dev"));
app.use(helmet());
app.use(cors({ origin: appOrigin }));

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`,
  }),

  audience: authConfig.audience,
  issuer: `https://${authConfig.domain}/`,
  algorithms: ["RS256"],
});

app.get("/api/external", checkJwt, (req, res) => {
  res.send({
    msg: "Your access token was successfully validated!",
  });
});

app.listen(port, () => console.log(`API Server listening on port ${port}`));
