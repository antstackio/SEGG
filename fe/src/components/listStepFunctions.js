import { Menu, Col, Row } from "antd";
import { useEffect, useState, useCallback } from "react";

import ProcessStepFunction from "./processStepFunction";

const ListStepFunctions = (props) => {
  const [display, setDisplay] = useState(false);
  const [stpFn, setStpFn] = useState();
  const [defaultKey, setDefaultKey] = useState("0");

  const menuClick = useCallback(
    (arr) => {
      setDisplay(true);
      setStpFn(props.tableData[parseInt(arr.key)]);
      setDefaultKey(arr.key.toString());
      return;
    },
    [props]
  );

  useEffect(() => {
    for (var e in props.tableData) {
      if (props.tableData[e].loggingConfiguration.level !== "OFF") {
        menuClick({ key: e });
        break;
      }
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
        onClick={menuClick}
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
      <Col style={{ width: "256px" }}>{createMenu(props.tableData)}</Col>
      {display === false ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "19%",
            width: "80vw",
          }}
        >
          Click on the Step Function Name on the left to load the executions
        </div>
      ) : (
        <Col style={{ width: "calc(100vw - 256px)" }}>
          <ProcessStepFunction awsInfo={props.awsInfo} data={stpFn} />
        </Col>
      )}
    </Row>
  );
};

export { ListStepFunctions };
