import { Steps, Collapse, Button, Form, Input } from "antd";
import { useState } from "react";
import airtable from "../../components/airtable";
import Schema from "async-validator";
Schema.warning = function () {}; // to avoid async validator warning

const { Step } = Steps;
const { Panel } = Collapse;

const IAMData = {
  "IAM Role - Assume Role Policy":
    "The IAM Role requires an Assume Role Policy that allows access to SEGG AWS Account to assume the role",
  "IAM Role - Managed Policies":
    "The IAM Role that is assumed needs to have permission to get Step Functions and Cloudwatch Logs",
};
const stepData = {
  "SEGG Access": (
    <>
      <p>
        SEGG uses an AWS Lambda to temporarily assume an IAM Role from your AWS
        Account to fetch the Step Function Information and their corresponding
        Cloudwatch Logs. The IAM Role to be created in your account has 2 parts
        as mentioned below:
      </p>
      <Steps progressDot current={4} direction="vertical">
        {Object.keys(IAMData).map((e) => {
          return <Step title={e} key={e} description={IAMData[e]} />;
        })}
      </Steps>
    </>
  ),

  "1 Click Deploy": (
    <>
      <p>
        {" "}
        Click the button below to create the cloudformation for the required
        accesss
      </p>
      <Button
        type="primary"
        target="_blank"
        rel="noreferrer"
        href="https://console.aws.amazon.com/cloudformation/home?region=ap-south-1#/stacks/new?stackName=SEGG-IAMRole&templateURL=https://oss-1click-deployments.s3.ap-south-1.amazonaws.com/iam-one-click-template.yaml"
      >
        Create IAM Role
      </Button>
    </>
  ),
};

const IntroMid = () => {
  const [width, setWidth] = useState("120px");
  const [panel, setPanel] = useState("registerPart1");
  const [activeKey, setActiveKey] = useState("");

  const changeWidth = () => {
    if (width === "120px") {
      setWidth("75%");
      setActiveKey("1");
    } else {
      setTimeout(() => {
        setWidth("120px");
        setActiveKey();
      }, 200);
    }
  };
  const formStyle = {};

  const formUpdate = (values) => {
    console.log(values);
    airtable(values);
    setPanel("registerPart2");
    setActiveKey("2");
  };

  const panelJSX = {
    registerPart1: (
      <Panel
        showArrow={false}
        header="Step 1 : Register and Link AWS Account"
        key="1"
      >
        <Form
          key="formItem"
          layout="vertical"
          onFinish={(values) => {
            formUpdate(values);
          }}
        >
          <Form.Item
            label="Name"
            name="Name"
            style={formStyle}
            rules={[
              {
                required: true,
                message: "Please enter your Name",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            style={formStyle}
            name="Email"
            rules={[
              {
                type: "email",
                message: "Please enter a valid Email",
              },
              {
                required: true,
                message: "Please enter your Email",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Organisation"
            style={formStyle}
            name="Organisation"
            rules={[
              {
                required: true,
                message: "Please enter your Organisation",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Designation"
            style={formStyle}
            name="Designation"
            rules={[
              {
                required: true,
                message: "Please enter your Designation",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item style={formStyle}>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </Form.Item>
        </Form>
      </Panel>
    ),
    registerPart2: (
      <Panel
        showArrow={false}
        header="Step 1 : Register and Link AWS Account"
        key="2"
      >
        <Steps progressDot current={4} direction="vertical">
          {Object.keys(stepData).map((e) => {
            return <Step title={e} key={e} description={stepData[e]} />;
          })}
        </Steps>
      </Panel>
    ),
  };

  return (
    <Collapse
      activeKey={activeKey}
      style={{ width: width }}
      onChange={changeWidth}
    >
      {panelJSX[panel]}
    </Collapse>
  );
};

export { IntroMid };
