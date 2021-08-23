import React from "react";
import styles from "./footer-comp.module.scss";
import { getTermsAndConditionVersion } from "utils/config.util";

const FooterComponent = () => (
  <div className={styles.footerContent}>
    <div>Version: {getTermsAndConditionVersion()}</div>
  </div>
);
export const Footer = React.memo(FooterComponent);
