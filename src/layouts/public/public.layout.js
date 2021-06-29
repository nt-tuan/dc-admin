import React from "react";
import styles from "./public-layout.module.scss";
import footer from "assets/images/login/login-right.png";
import powerdBy from "assets/images/login/powerd-by.png";

export const PublicLayout = React.memo(({ children }) => {
  return (
    <section id={styles["public-layout"]}>
      <div className={`row no-gutters vh-100 ${styles.rightBlock}`}>
        <div className="col-md-12 col-lg-5">
          <div id={styles.left} />
        </div>
        <div id={styles.right} className="col-md-12 col-lg-7 justify-content-center">
          <div className={styles.publicContainer}>
            <div className={styles.publicContent}>
              <img
                id={styles.logo}
                className="ml-n3 mb-3 mt-md-5 mt-1"
                src={`${process.env.PUBLIC_URL}/images/logo.png`}
                alt="logo"
              />
              {children}
            </div>
            <div className={styles.powerBy}>
              <a href="https://distichain.com/">
                <img src={powerdBy} alt="logo" />
              </a>
            </div>
          </div>
          <img className={styles.footer} src={footer} alt="logo" width></img>
        </div>
      </div>
    </section>
  );
});
