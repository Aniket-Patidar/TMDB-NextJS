import React from "react";
import ReactPlayer from "react-player/youtube";

const VideoPopup = ({ show, setShow, videoId, setVideoId }) => {
  const hidePopup = () => {
    setShow(false);
    setVideoId(null);
  };

  const popupStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    position: "fixed",
    top: 0,
    left: 0,
    opacity: 0,
    visibility: "hidden",
    zIndex: 9,
  };

  const opacityLayerStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.25)",
    backdropFilter: "blur(3.5px)",
    WebkitBackdropFilter: "blur(3.5px)",
    opacity: 0,
    transition: "opacity 400ms",
  };

  const videoPlayerStyle = {
    position: "relative",
    width: "800px",
    aspectRatio: "16 / 9",
    backgroundColor: "white",
    transform: "scale(0.2)",
    transition: "transform 250ms",
  };

  const closeBtnStyle = {
    position: "absolute",
    top: "-20px",
    right: 0,
    color: "white",
    cursor: "pointer",
  };

  return (
    <div
      style={
        show ? { ...popupStyle, opacity: 1, visibility: "visible" } : popupStyle
      }
    >
      <div
        style={show ? { ...opacityLayerStyle, opacity: 1 } : opacityLayerStyle}
        onClick={hidePopup}
      ></div>
      <div
        style={
          show
            ? { ...videoPlayerStyle, transform: "scale(1)" }
            : videoPlayerStyle
        }
      >
        <span style={closeBtnStyle} onClick={hidePopup}>
          Close
        </span>
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${videoId}`}
          controls
          width="100%"
          height="100%"
          // playing={true}
        />
      </div>
    </div>
  );
};

export default VideoPopup;
