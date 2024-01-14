import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const CircleRating = ({ rating }) => {
  const pathColor = rating < 5 ? "red" : rating < 7 ? "orange" : "green";

  const styles = buildStyles({
    pathColor: pathColor,
  });

  return (
    <div
      className="circleRating w-[50px] -mt-10 ml-2 relative"
      style={{
        backgroundColor: "var(--black)",
        borderRadius: "50%",
        padding: "2px",
      }}
    >
      <CircularProgressbar
        value={rating}
        maxValue={10}
        text={rating}
        styles={styles}
      />
    </div>
  );
};

export default CircleRating;
