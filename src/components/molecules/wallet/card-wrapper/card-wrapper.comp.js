import React from "react";
// import styles from "./styles.module.scss";
import { toCurrency } from "utils/general.util";

const styles = {};
export const CardsWrapper = ({ cards }) => {
  return (
    <div className="row">
      {Object.values(cards).map(({ icon, title, name, value, description }) => (
        <div className="col-12 col-sm-6 px-3 mt-2 mt-sm-0" key={name}>
          <div
            className={`d-flex align-items-center p-3 text-white dtc-br-10 ${styles["small-balance-card-gradient"]}`}
            title={description}
          >
            <div className="my-1 mr-4 font-size-36 flex-shrink-0 ml-2 pr-3 border-right">
              {icon}
            </div>
            <div className="text-center text-xl-left text-uppercase flex-grow-1 text-truncate">
              <div className="font-size-14 text-truncate">{title}</div>
              <div className="font-size-24 text-truncate">{toCurrency(value)}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
