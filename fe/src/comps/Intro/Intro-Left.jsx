import SEGG from "../../media/SEGG.mp4";
import AntStackLogo from "../../media/antstack-logo.png";

const introLeftCardImage = {
  margin: "0 auto",
  height: "auto",
  width: "70%",
};

const IntroLeft = () => {
  return (
    <>
      <img
        style={introLeftCardImage}
        // height="250"
        src={AntStackLogo}
        alt="AntStack Technologies Pvt Ltd"
      />
      <video height="200" autoPlay muted>
        <source src={SEGG} type="video/mp4" />
      </video>
      <h2 style={{ textAlign: "center", color: "#575757" }}>
        AWS Step Function Express Graph Generator
      </h2>
    </>
  );
};

export { IntroLeft };
