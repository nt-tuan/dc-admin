import React from "react";
import styles from "./public-layout.module.scss";
import footer from "assets/images/login/login-right.png";

export const PublicLayout = React.memo(({ children }) => {
  return (
    <section id={styles["public-layout"]}>
      <div className={`row no-gutters vh-100 ${styles.rightBlock}`}>
        <div className="col-md-12 col-lg-5">
          <div id={styles.left} />
        </div>
        <div id={styles.right} className="col-md-12 col-lg-7 justify-content-center">
          <div className="container" style={{ paddingLeft: "10%" }}>
            <img
              id={styles.logo}
              className="ml-2 mb-3 mt-md-5 mt-1"
              src={`${process.env.PUBLIC_URL}/images/logo.png`}
              alt="logo"
            />
            {children}
          </div>
          <a href="https://distichain.com/" className={styles.link}>
            Powered by Distichain Limited
          </a>
          <img className={styles.footer} src={footer} alt="logo" width></img>
        </div>
      </div>
    </section>
  );
});
