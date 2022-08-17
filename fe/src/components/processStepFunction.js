import ExecutionsGraph from "./executionsGraph";
import React, { useState, useEffect } from "react";
import { processDefinition } from "./processDefinition";
import { ExecutionsTable } from "./executionsTable";
import { Row, Col } from "antd";
import { Loading3QuartersOutlined } from "@ant-design/icons";

async function getStepFunctionData(arn, logGroupName, awsInfo) {
  const response = await fetch(
    `https://rvs2lmfae1.execute-api.ap-south-1.amazonaws.com/Prod/getStepFunctionData?type=specific&stateMachineArn=${arn}&logGroupName=${logGroupName}&region=${awsInfo.region}&accountId=${awsInfo.accountId}&roleName=${awsInfo.roleName}`
  );
  const responseJson = await response.json();
  return responseJson;
}

const ProcessStepFunction = (props) => {
  const [logs, setLogs] = useState([]);
  const [baseGraph, setBaseGraph] = useState([]);
  const [currentGraph, setCurrentGraph] = useState([]);

  const display = (ds) => {
    const success = (
      //total span is 20
      <Row style={{ padding: "24px" }}>
        <Col
          span={8}
          // style={{ width: "35%", paddingRight: "12px" }}
        >
          <ExecutionsTable
            logs={logs}
            setCurrentGraph={setCurrentGraph}
            baseGraph={baseGraph}
          />
        </Col>
        <Col
          span={16}
          style={{
            // width: "65%",
            paddingLeft: "24px",
          }}
        >
          <ExecutionsGraph jsonGraphData={currentGraph} />
        </Col>
      </Row>
    );

    const centerSelf = {
      display: "flex",
      justifyContent: "center",
      marginTop: "22%",
    };

    const logOff = (
      <div style={centerSelf}>
        <h4> Logging is disabled for this step function </h4>
      </div>
    );

    const log0 = (
      <div style={centerSelf}>
        <h4> There are no logs available for this step function </h4>
      </div>
    );

    const loader = (
      <div style={centerSelf}>
        <Loading3QuartersOutlined style={{ fontSize: 24 }} spin />
      </div>
    );

    const error = (
      <div style={centerSelf}>
        <h4> The step function failed to load </h4>
      </div>
    );

    const op = {
      success: success,
      logOff: logOff,
      log0: log0,
      loader: loader,
      error: error,
    };

    return op[ds];
  };

  const [displayState, setDisplayState] = useState();

  useEffect(() => {
    setDisplayState("loader");

    if (props.data.loggingConfiguration.level === "OFF") {
      setDisplayState("logOff");
    } else {
      getStepFunctionData(
        props.data.stateMachineArn,
        props.data.loggingConfiguration.destinations[0].cloudWatchLogsLogGroup.logGroupArn.split(
          ":"
        )[6],
        props.awsInfo
      ).then((data) => {
        if (data.logs.length === 0) {
          setDisplayState("log0");
        } else {
          setBaseGraph([]);
          setLogs(data.logs);
          const processedDefinition = processDefinition(
            JSON.parse(props.data.definition)
          );
          console.log(processedDefinition, "ADF");
          if (processedDefinition === "ERROR") setDisplayState("error");
          else {
            setCurrentGraph(processedDefinition);
            setBaseGraph(processedDefinition);
            setDisplayState("success");
          }
        }
      });
    }
  }, [props]);

  return <div>{display(displayState)}</div>;
};
export default ProcessStepFunction;
