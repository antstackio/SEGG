import { Steps, Collapse, Button } from "antd";
import { useState } from "react";
const { Step } = Steps;
const { Panel } = Collapse;

const stepData = {
  "SEGG Access":
    "SEGG uses an AWS Lambda to temporarily assume an IAM Role on your AWS Account to fetch the Step Function Information and their corresponding Cloudwatch Logs",
  "IAM Role - Assume Role Policy":
    "The IAM Role requires an Assume Role Policy that allows access to SEGG Account",
  "IAM Role - Managed Policies":
    "The IAM Role needs to have permission to get Step Functions and Cloudwatch Logs",
  "1 Click Deploy": (
    <Button
      target="_blank"
      rel="noreferrer"
      href="https://console.aws.amazon.com/cloudformation/home?region=ap-south-1#/stacks/new?stackName=SEGG-IAMRole&templateURL=https://oss-1click-deployments.s3.ap-south-1.amazonaws.com/iam-one-click-template.yaml"
    >
      Create IAM Role
    </Button>
  ),
};

const IntroMid = () => {
  const [width, setWidth] = useState("100px");

  const changeWidth = () => {
    if (width === "100px") {
      setWidth("75%");
    } else {
      setTimeout(() => {
        setWidth("100px");
      }, 200);
    }
  };

  return (
    <Collapse style={{ width: width }} onChange={changeWidth}>
      <Panel showArrow={false} header="Register AWS Account" key="1">
        <Steps progressDot current={4} direction="vertical">
          {Object.keys(stepData).map((e) => {
            return <Step title={e} key={e} description={stepData[e]} />;
          })}
        </Steps>
      </Panel>
    </Collapse>
  );
};

export { IntroMid };
