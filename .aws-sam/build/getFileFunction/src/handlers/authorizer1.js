exports.handler = async (event) => {
    const token = event.authorizationToken;
    const methodArn = event.methodArn;
    console.log(event);
    if(token === 'hyggesoftware') {
        return generateAuthResponse('user', 'Allow', methodArn)
    } else {
        return generateAuthResponse('user', 'Deny', methodArn)
    }
}



function generateAuthResponse(principalId, effect, methodArn) {
    const policyDocument = generatePolicyDocument(effect, methodArn);


    return {
        principalId,
        policyDocument
    }
}




function generatePolicyDocument(effect, methodArn) {
    if(!effect || !methodArn) return null;



    const policyDocument = {
        Version: '2012-10-17',
        Statement:[{
            Action: "execute-api:Invoke",
            Effect: effect,
            Resource: methodArn
        }
        ]
    }

    return policyDocument

}