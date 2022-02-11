import React from "react";
// import styles from "./styles.module.scss";
import { DATETIME_FORMAT } from "commons/consts";
import dayjs from "dayjs";

const styles = {};
export const TimePoint = ({ dateTime, children, type }) => {
  const indicatorClass =
    type === "major"
      ? "air__utils__donut air__utils__donut--danger mr-3"
      : `${styles["balloon-child"]} mr-3`;
  return (
    <li className={styles.item}>
      <time className={`${type === "major" ? styles.itemTime : styles.itemTimeChild} mr-3`}>
        {/* <div className="text-nowrap">{dayjs(new Date(dateTime)).format(DATETIME_FORMAT)}</div> */}
        <div>{dayjs(new Date(dateTime)).format(DATETIME_FORMAT)}</div>
      </time>
      <div className={styles.itemSeparator}>
        <div className={indicatorClass} />
      </div>
      <div className={styles.content}>{children}</div>
    </li>
  );
};
