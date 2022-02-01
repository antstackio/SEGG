import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { PageHeader, Divider, Statistic } from "antd";
import ListStepFunctionComp from "../../components/getStepFunctions";
import AntStackLogo from "../../media/antstack-logo.png";
import SEGG from "../../media/SEGG.mp4";

const Layout = () => {
  const [cookies] = useCookies(["awsInfo"]);
  const navigate = useNavigate();

  if (cookies.awsInfo === undefined) navigate("/");

  return (
    <div>
      <PageHeader
        className="site-page-header"
        onBack={() => {
          navigate("/");
          window.localStorage.removeItem("stepFunctionData");
          window.localStorage.removeItem("selectedStepFunction");
        }}
        title={
          <video height="64" autoPlay muted>
            <source src={SEGG} type="video/mp4" />
          </video>
        }
        subTitle="AWS Step Functions Execution Graph Generator"
        avatar={{
          src: AntStackLogo,
          size: 64,
        }}
        style={{ padding: "24px" }}
        extra={[
          <div key={0} style={{ display: "flex", padding: "0 20px" }}>
            <Statistic
              key={0}
              title="AWS Account Id"
              value={cookies.awsInfo.accountId}
              groupSeparator=""
              style={{ padding: "0 20px" }}
            />

            <Statistic
              key={1}
              style={{ padding: "0 20px" }}
              title="AWS Region"
              value={cookies.awsInfo.region}
            />
            <Statistic
              key={2}
              title="AWS IAM Role Name"
              style={{ padding: "0 20px" }}
              value={cookies.awsInfo.roleName}
            />
          </div>,
        ]}
      ></PageHeader>

      <Divider style={{ margin: 0 }} />

      <ListStepFunctionComp awsInfo={cookies.awsInfo} />
    </div>
  );
};

export { Layout };
