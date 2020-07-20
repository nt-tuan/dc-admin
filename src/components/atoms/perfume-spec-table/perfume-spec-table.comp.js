import React from "react";
import styles from "./styles.module.scss";

export const PerfumeSpecTable = React.memo(({ values }) => {
  const showRetailPrice = (currency, retailPrice) => {
    if (currency === undefined || retailPrice === undefined) {
      return "";
    }
    return `${values["Currency"]} ${values["Retail Price"]}`;
  };
  return (
    <div
      role="tabpanel"
      className="tab-pane in active"
      id="detailSpecification"
      aria-expanded="true"
    >
      <div className="specification-list p-0">
        <div className="col-lg-8 col-12">
          <div className={styles["spec-title"]}>BRAND</div>
          <div className={`${styles["spec-row"]} row`}>
            <div className="col-6 font-weight-bold">{values["Brand"]}</div>
          </div>
        </div>
        <div className="col-lg-8 col-12">
          <div className={styles["spec-title"]}>SHORT DESCRIPTION</div>
          <div className={`${styles["spec-row"]} row`}>
            <div className="col-12 font-weight-bold">{values["Short Description"]}</div>
          </div>
        </div>
        <div className="col-lg-8 col-12">
          <div className={styles["spec-title"]}>LONG DESCRIPTION</div>
          <div className={`${styles["spec-row"]} row`}>
            <div className="col-12 font-weight-bold">{values["Long Description"]}</div>
          </div>
        </div>
        <div className="col-lg-8 col-12">
          <div className={styles["spec-title"]}>RETAIL PRICE</div>
          <div className={`${styles["spec-row"]} row`}>
            <div className="col-6 font-weight-bold">
              {showRetailPrice(values["Currency"], values["Retail Price"])}
            </div>
          </div>
        </div>
        <div className="col-lg-8 col-12">
          <div className={styles["spec-title"]}>GENDER</div>
          <div className={`${styles["spec-row"]} row`}>
            <div className="col-6 font-weight-bold">{values["Gender"]}</div>
          </div>
        </div>
        <div className="col-lg-8 col-12">
          <div className={styles["spec-title"]}>SIZE</div>
          <div className={`${styles["spec-row"]} row`}>
            <div className="col-6 font-weight-bold">{values["Size"]}</div>
          </div>
        </div>
        <div className="col-lg-8 col-12">
          <div className={styles["spec-title"]}>TYPE</div>
          <div className={`${styles["spec-row"]} row`}>
            <div className="col-6 font-weight-bold">{values["Type"]}</div>
          </div>
        </div>
      </div>
    </div>
  );
});
