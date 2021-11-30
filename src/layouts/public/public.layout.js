import React from "react";
import styles from "./public-layout.module.scss";
import footer from "assets/images/login/login-right.png";
import { getAssetURL } from "utils/config.util";

export const PublicLayout = React.memo(({ children }) => {
  return (
    <section id={styles["public-layout"]}>
      <div className={`row no-gutters vh-100 ${styles.rightBlock}`}>
        <div className="col-md-12 col-lg-5">
          <div
            id={styles.left}
            style={{
              backgroundImage: `url(${getAssetURL("/images/login/login-left.png")})`
            }}
          />
        </div>
        <div id={styles.right} className="col-md-12 col-lg-7 justify-content-center">
          <div className={styles.publicContainer}>
            <div className={styles.publicContent}>
              <img
                id={styles.logo}
                className="ml-n3 mb-3 mt-md-5 mt-1"
                src={getAssetURL("/images/logo.png")}
                alt="logo"
              />
              {children}
            </div>
          </div>
          <img
            className={styles.footer}
            src={getAssetURL("/images/login/login-right.png")}
            alt="logo"
            width
          ></img>
        </div>
      </div>
    </section>
  );
});
