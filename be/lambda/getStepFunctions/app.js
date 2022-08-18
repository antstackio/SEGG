const AWSXRay = require("aws-xray-sdk-core");
const AWS = AWSXRay.captureAWS(require("aws-sdk"));
const sts = new AWS.STS();

exports.lambdaHandler = async (event) => {
  console.log(JSON.stringify(event));

  try {
    console.log(event.headers.origin);
    if (event.headers.origin != "https://segg.antstack.com") {
      throw new Error("Bad Request");
    }
    // assume role from client account
    const assumeRole = await sts
      .assumeRole({
        RoleArn: `arn:aws:iam::${event.queryStringParameters.accountId}:role/${event.queryStringParameters.roleName}`,
        RoleSessionName: Math.round(Math.random() * 1000000000).toString(),
      })
      .promise();

    // get temp credentials to target account
    const tempCred = {
      accessKeyId: assumeRole.Credentials.AccessKeyId,
      secretAccessKey: assumeRole.Credentials.SecretAccessKey,
      sessionToken: assumeRole.Credentials.SessionToken,
      region: event.queryStringParameters.region,
    };

    // create new connectors for step function and cloudwatch operations
    const cloudwatchlogs = new AWS.CloudWatchLogs(tempCred);
    const stepfunctions = new AWS.StepFunctions(tempCred);

    // query1 - get all the step functions in the account
    if (event.queryStringParameters.type === "all") {
      // get list of step functions
      const listStateMachines = await stepfunctions
        .listStateMachines()
        .promise();

      // describe each step function to get more information
      const describeStateMachines = listStateMachines.stateMachines.map((e) => {
        return stepfunctions
          .describeStateMachine({ stateMachineArn: e.stateMachineArn })
          .promise();
      });

      // return all the step function data
      return {
        statusCode: 200,
        body: JSON.stringify(await Promise.all(describeStateMachines)),
        headers: {
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Origin": "https://segg.antstack.com",
          "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
        },
      };
    }

    // query2 - get all logs for the selected step function
    else {
      try {
        const { logGroupName } = event.queryStringParameters;

        // describe the log stream to get the complete log info
        let logStreamInfo = await cloudwatchlogs
          .describeLogStreams({ logGroupName: logGroupName })
          .promise();

        // get the logs in the log streams
        const logStreamsDataLoop = logStreamInfo.logStreams.map((e) => {
          return cloudwatchlogs
            .filterLogEvents({
              logGroupName: logGroupName,
              logStreamNames: [e.logStreamName],
            })
            .promise();
        });

        // wait for logs
        const logStreamsData = await Promise.all(logStreamsDataLoop);

        // add the logs to the log stream info
        logStreamInfo.logStreams.map((e, i) => {
          e.logs = logStreamsData[i].events;
          return e;
        });

        // return complete log stream info and logs within that stream
        return {
          statusCode: 200,
          body: JSON.stringify({ logs: logStreamInfo }),
          headers: {
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Origin": "https://segg.antstack.com",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
          },
        };
      } catch (error) {
        // return complete log stream info and logs within that stream
        return {
          statusCode: 502,
          body: JSON.stringify(error),
          headers: {
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Origin": "https://segg.antstack.com",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
          },
        };
      }

      // The below code is for a future use case
      // let sendLogStreamData =  await Promise.all(getLogStreamData)
      // sendLogStreamData = sendLogStreamData.map(e=> {
      //   if (e.searchedLogStreams[0].searchedCompletely)
      //     return e.events
      //   else
      //     if the condition is false, the log stream has more logs that needs to be quereied again
      // })
    }
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify("BAD REQUEST"),
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "https://segg.antstack.com",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
      },
    };
  }
};
