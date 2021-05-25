exports.handler = async (event) => {
  console.log(event);
  const token = event.authorizationToken;
  console.log(token);

  let auth = "Deny";

  if (token === "mytoken123") {
    auth = "Allow";
  } else {
    auth = "Deny";
  }

    console.log(auth);
  const arn = "arn:aws:execute-api:eu-central-1:641874005858:gpfg1ldywd/*/*/*?";
  const authResponse = {
    principalId: "*",
    policyDocument: {
      Version: "2012-10-17",
      Statement: [
        { Action: "execute-api:Invoke", Resource: arn, Effect: auth },
      ],
    },
  };

  return authResponse;
};
