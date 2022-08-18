const AWSXRay = require("aws-xray-sdk-core");
const AWS = AWSXRay.captureAWS(require("aws-sdk"));
const sts = new AWS.STS();
const axios = require("axios");

exports.lambdaHandler = async (event) => {
  console.log(JSON.stringify(event));

  try {
    console.log(event.headers.origin);
    if (event.headers.origin != "https://segg.antstack.com") {
      throw new Error("Bad Request");
    }

    const resp = await axios({
      method: "get",
      url: `https://api.quickemailverification.com/v1/verify?email=${event.queryStringParameters.email}&apikey=23d78e221b6a02915f263674a89d7cfeeb4084621225b7a8b9b0ec050204`,
    });
    console.log(resp.data);
    return {
      statusCode: 200,
      body: JSON.stringify(resp.data),
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "https://segg.antstack.com",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
      },
    };
  } catch (error) {
    return {
      statusCode: 200,
      body: JSON.stringify({ safe_to_send: "false" }),
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "https://segg.antstack.com",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
      },
    };
  }
};
