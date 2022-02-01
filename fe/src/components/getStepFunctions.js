import React, { useState, useEffect } from "react";
import { ListStepFunctions } from "./listStepFunctions";
import { Col } from "antd";
import { Loading3QuartersOutlined } from "@ant-design/icons";

async function getStepFunctionData(awsInfo) {
  const response = await fetch(
    `https://rvs2lmfae1.execute-api.ap-south-1.amazonaws.com/Prod/getStepFunctionData?type=all&region=${awsInfo.region}&accountId=${awsInfo.accountId}&roleName=${awsInfo.roleName}`
  );
  const responseJson = await response.json();
  responseJson.forEach((element) => {
    element.key = element.creationDate;
  });
  return responseJson;
}

const ListStepFunctionComp = (props) => {
  const [tableData, setTableData] = useState([]);
  const [spin, setSpin] = useState(true);
  // const [cookies2, setCookie2] = useCookies(["stepFunctionData"]);

  useEffect(() => {
    const stepFunctionDataLocal =
      window.localStorage.getItem("stepFunctionData");

    console.log(stepFunctionDataLocal);
    if (stepFunctionDataLocal === null) {
      getStepFunctionData(props.awsInfo).then((data) => {
        setTableData(data);
        setSpin(false);
        window.localStorage.setItem("stepFunctionData", JSON.stringify(data));
      });
    } else {
      setTableData(JSON.parse(stepFunctionDataLocal));
      setSpin(false);
    }
  }, [props]);

  return (
    <>
      {spin === true ? (
        <Col
          span={24}
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "10%",
          }}
        >
          <Loading3QuartersOutlined style={{ fontSize: 24 }} spin />
        </Col>
      ) : (
        <ListStepFunctions awsInfo={props.awsInfo} tableData={tableData} />
      )}
    </>
  );
};
export default ListStepFunctionComp;
