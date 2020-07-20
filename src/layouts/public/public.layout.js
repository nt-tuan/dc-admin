import React from "react";
import styles from "./public-layout.module.scss";

export const PublicLayout = React.memo(({ children }) => {
  return (
    <section id={styles["public-layout"]}>
      <div className="row no-gutters vh-100">
        <div className="col-md-12 col-lg-6">
          <div id={styles.left} />
        </div>
        <div id={styles.right} className="col-md-12 col-lg-6 justify-content-center">
          <div className="container">
            <img
              id={styles.logo}
              className="ml-2 mb-3 mt-md-5 mt-1"
              src={`${process.env.PUBLIC_URL}/images/logo.png`}
              alt={`${process.env.REACT_APP_COMPANY_NAME} logo`}
            />
            {children}
          </div>
        </div>
      </div>
    </section>
  );
});
