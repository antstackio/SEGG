import "antd/dist/antd.css";

import WavyDots1000Comp from "../../media/wavy-dots-1000-comp.mp4";
import { Row, Col } from "antd";
import { IntroMid } from "./Intro-Mid";
import { IntroRight } from "./Intro-Right";
import { IntroLeft } from "./Intro-Left";

const introLeft = {
  height: "100vh",
  // width: "36vw",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
};

const introRight = {
  height: "100vh",
  overflow: "hidden",
};

const bgVideo = {
  position: "fixed",
  zIndex: "-1",
  height: "calc((100vw/3)*2)",
};

const introRightCol = {
  // width: "32vw",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const Intro = () => {
  return (
    <div style={{ display: "flex" }}>
      {/* intro left */}
      <Col style={introLeft} span={8}>
        <IntroLeft />
      </Col>
      {/* intro right */}
      <Col span={16}>
        <div style={introRight}>
          <video style={bgVideo} autoPlay muted loop>
            <source src={WavyDots1000Comp} type="video/mp4" />
          </video>
          <Row>
            <Col span={12} style={introRightCol}>
              <IntroMid />
            </Col>
            <Col span={12} style={introRightCol}>
              <IntroRight />
            </Col>
          </Row>
        </div>
      </Col>
    </div>
  );
};

export { Intro };
