import React from "react";
import classNames from "classnames";
import styles from "./loader-comp.module.scss";
import PropTypes from "prop-types";

export const Loader = ({ spinning, fullScreen }) => (
  <div
    className={classNames(styles.loader, {
      [styles.hidden]: !spinning,
      [styles.fullScreen]: fullScreen
    })}
  />
);

Loader.propTypes = {
  spinning: PropTypes.bool,
  fullScreen: PropTypes.string
};

Loader.defaultProps = {
  spinning: true
};
