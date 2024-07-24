const AWS = require("aws-sdk");

AWS.config.update({
  region: "eu-north-1",
});

const cognito = new AWS.CognitoIdentityServiceProvider();

module.exports = cognito;
