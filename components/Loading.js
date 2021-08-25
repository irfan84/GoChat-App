import { BounceLoader } from "react-spinners";

function Loading() {
  return (
    <center style={{ display: "grid", placeItems: "center", height: "100vh" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img
          src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c543.png"
          alt=""
          style={{ marginBottom: 20 }}
          height={200}
        />
        <BounceLoader size={60} color="green" />
      </div>
    </center>
  );
}

export default Loading;
