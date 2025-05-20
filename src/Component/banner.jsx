import React, { useState } from "react";

const styles = {
  wrapper: {
    background: "black",
    height: "350px",
    borderRadius: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "20px",
    overflow: "hidden",
    position: "relative",
  },

  container: {
    width: "100%",
    height: "80%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "20px",
  },

  bannerInfo: {
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    color: "white",
  },

  img: {
    width: "150px",
    height: "auto",
    borderRadius: "8px",
    objectFit: "contain",
  },

  navBtn: {
    fontSize: "24px",
    backgroundColor: "transparent",
    color: "white",
    border: "none",
    cursor: "pointer",
    width: "30px",
    zIndex: 10,
  },
};

function Banner() {

  return (
    <div style={styles.wrapper}>
    </div>
  );
}

export default Banner;
