import { Menu, Col, Row } from "antd";
import { useEffect, useState, useCallback } from "react";

import ProcessStepFunction from "./processStepFunction";

const ListStepFunctions = (props) => {
  const [display, setDisplay] = useState(false);
  const [stpFn, setStpFn] = useState();
  const [defaultKey, setDefaultKey] = useState();

  const menuClick = useCallback(
    (arr) => {
      setDisplay(true);
      setStpFn(props.tableData[parseInt(arr.key)]);
      setDefaultKey(arr.key.toString());
      window.localStorage.setItem("selectedStepFunction", arr.key);
      return;
    },
    [props]
  );

  useEffect(() => {
    const selectedStepFunctionLocal = window.localStorage.getItem(
      "selectedStepFunction"
    );
    if (selectedStepFunctionLocal === null) {
      for (var e in props.tableData) {
        if (props.tableData[e].loggingConfiguration.level !== "OFF") {
          menuClick({ key: e });
          window.localStorage.setItem("selectedStepFunction", e);
          break;
        }
      }
    } else {
      if (props.tableData.length >= parseInt(selectedStepFunctionLocal)) {
        menuClick({ key: selectedStepFunctionLocal });
      } else menuClick({ key: 0 });
    }
  }, [props.tableData, menuClick]);

  const createMenu = (data) => {
    return (
      <Menu
        style={{
          height: "calc(100vh - (72px + 24px + 24px))",
          overflow: "scroll",
        }}
        selectable={true}
        mode="inline"
        onClick={(data) => {
          menuClick(data);
          window.location.reload();
        }}
        selectedKeys={defaultKey}
      >
        {data.map((e, ind) => {
          return (
            <Menu.Item
              style={{ paddingTop: "28px", paddingBottom: "28px" }}
              key={ind}
            >
              {<>{e.name}</>}
            </Menu.Item>
          );
        })}
      </Menu>
    );
  };

  return (
    <Row>
      <Col
        span={4}
        // push={6}
        // style={{ width: "256px" }}
      >
        {createMenu(props.tableData)}
      </Col>
      {display === false ? (
        <Col
          span={20}
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "19%",
          }}
        >
          Click on the Step Function Name on the left to load the executions
        </Col>
      ) : (
        <Col
          span={20}
          // style={{ width: "calc(100vw - 256px)" }}
        >
          <ProcessStepFunction awsInfo={props.awsInfo} data={stpFn} />
        </Col>
      )}
    </Row>
  );
};

export { ListStepFunctions };
