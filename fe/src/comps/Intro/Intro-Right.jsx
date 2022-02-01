import { Collapse, Form, Input, Button } from "antd";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const { Panel } = Collapse;

const formStyle = {};

const IntroRight = () => {
  const [cookies, setCookie] = useCookies(["awsInfo"]);
  const navigate = useNavigate();
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

  const formUpdate = (values) => {
    setCookie("awsInfo", values, { path: "/" });
    window.localStorage.removeItem("stepFunctionData");
    window.localStorage.removeItem("selectedStepFunction");
    navigate("/stepfunctions");
  };

  return (
    <Collapse style={{ width: width }} onChange={changeWidth}>
      <Panel showArrow={false} header="Enter AWS Account Information" key="1">
        <Form
          key="formItem"
          layout="vertical"
          onFinish={(values) => {
            formUpdate(values);
          }}
        >
          <Form.Item
            label="AWS Account Id"
            name="accountId"
            style={formStyle}
            initialValue={cookies.awsInfo ? cookies.awsInfo.accountId : ""}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="AWS Region"
            style={formStyle}
            name="region"
            initialValue={cookies.awsInfo ? cookies.awsInfo.region : ""}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="AWS IAM Role Name"
            style={formStyle}
            name="roleName"
            initialValue={cookies.awsInfo ? cookies.awsInfo.roleName : ""}
          >
            <Input />
          </Form.Item>
          <Form.Item style={formStyle}>
            <Button type="primary" htmlType="submit">
              Get Step Functions
            </Button>
          </Form.Item>
        </Form>
      </Panel>
    </Collapse>
  );
};

export { IntroRight };
