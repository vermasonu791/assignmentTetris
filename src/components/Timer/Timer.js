import React, { useEffect } from "react";
import styles from "./Timer.module.scss";
import logo from "../../assets/clock.png";

export default function Timer({ seconds }) {
  useEffect(() => {
    const elem = document.getElementById("progress-bar");
    /* incerease width by 10% in every 1 second */
    if (elem) elem.style.width = seconds * 10 + "%";
  }, [seconds]);
  return (
    <div className={styles.wrapper}>
      <img className={styles.clock_img} src={logo} alt="clock image" />
      <div className={styles.slide_bar}>
        <div className={styles.progress_bar} id="progress-bar"></div>
        <div className={styles.progress_bar_bg}></div>
      </div>
    </div>
  );
}
