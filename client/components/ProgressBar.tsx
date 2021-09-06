import React from "react";

const ProgressBar = (props: any) => {
  const { bgcolor, completed } = props;

  const containerStyle = {
    width: "80%",
    backgroundColor: "#e0e0de",
  };

  const fillerStyle = {
    height: "100%",
    width: `${completed}%`,
    backgroundColor: bgcolor,
    borderRadius: "inherit",
  };

  const percentStyle = {
    padding: "5px 5px",
    color: "white",
    marginRight: 10,
  };

  return (
    <div style={containerStyle}>
      <div style={fillerStyle}>
        <div style={percentStyle}>{`${Math.round(completed as number)}%`}</div>
      </div>
    </div>
  );
};

export default ProgressBar;
