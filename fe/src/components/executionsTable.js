import { Table, Space, Button } from "antd";

const processExecutionLogs = (logData, setCurrentGraph, baseGraph) => {
  // reset graph to default colors
  setCurrentGraph(
    baseGraph.map((e) => {
      if (e.id !== "0" && e.id !== "999")
        e.style = { ...e.style, backgroundColor: "#FFF" };
      return e;
    })
  );

  //process logs to get the colors
  let currentTaskStateEnteredInfo;
  let currentTaskType;
  const events = logData.logs.map((a) => JSON.parse(a.message));

  // use this logic to keep track of parallel states and its entire ID info
  // const parallelTrack = {
  //   "Parallel State": "StateEntered",
  // };

  events.forEach((data) => {
    if (
      data.type === "TaskStateEntered" ||
      data.type === "ChoiceStateEntered" ||
      data.type === "PassStateEntered" ||
      data.type === "WaitStateEntered" ||
      data.type === "FailStateEntered" ||
      data.type === "SucceedStateEntered"
    ) {
      currentTaskStateEnteredInfo = data.details;
      currentTaskType = data.type;
    }

    // color coding 2
    baseGraph.map((node) => {
      if (Object.keys(node).includes("data")) {
        // Success
        if (
          (data.type === "LambdaFunctionSucceeded" &&
            currentTaskType === "TaskStateEntered") ||
          (data.type === "ChoiceStateExited" &&
            currentTaskType === "ChoiceStateEntered") ||
          (data.type === "PassStateExited" &&
            currentTaskType === "PassStateEntered") ||
          (data.type === "WaitStateExited" &&
            currentTaskType === "WaitStateEntered")
        ) {
          if (node.data.label.props.id === currentTaskStateEnteredInfo.name) {
            node.style = { ...node.style, backgroundColor: "#00FF00" };
          }
        } else if (data.type === "SucceedStateEntered") {
          if (node.data.label.props.id === currentTaskStateEnteredInfo.name)
            node.style = { ...node.style, backgroundColor: "#00FF00" };
        } else if (
          data.type === "LambdaFunctionFailed" &&
          currentTaskType === "TaskStateEntered"
        ) {
          if (node.data.label.props.id === currentTaskStateEnteredInfo.name)
            node.style = { ...node.style, backgroundColor: "#FF0000" };
        } else if (data.type === "FailStateEntered") {
          if (node.data.label.props.id === currentTaskStateEnteredInfo.name)
            node.style = { ...node.style, backgroundColor: "#FF0000" };
        }
      }
      return node;
    });
  });
  setCurrentGraph(baseGraph.map((e) => e)); // Because react will not identify changes within an object inside an array
};

const getColumns = (setCurrentGraph, baseGraph) => {
  return [
    {
      title: "Execution #",
      dataIndex: "arn",
      key: "arn",
      ellipsis: true,
      render: (text) => <>{text.split("/").slice(-1)}</>,
    },
    {
      title: "Creation Time",
      dataIndex: "creationTime",
      key: "creationTime",
      render: (text) => (
        <>{new Date(text).toISOString().split("T").join(" ").slice(0, -2)}</>
      ),
    },
    {
      title: "Log Graph",
      dataIndex: "logGraph",
      key: "logGraph",
      render: (text, record) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => {
              processExecutionLogs(record, setCurrentGraph, baseGraph);
            }}
          >
            View
          </Button>
        </Space>
      ),
    },
  ];
};
const ExecutionsTable = (props) => {
  return (
    <Table
      style={{ height: "77vh", overflow: "scroll" }}
      columns={getColumns(props.setCurrentGraph, props.baseGraph)}
      dataSource={props.logs.logStreams}
      pagination={false}
    />
  );
};

export { ExecutionsTable };
