import { RouteConst } from "commons/consts";
import React from "react";
import { Link } from "react-router-dom";
// import style from "../errors-shared-styles.module.scss";
const style = {};
export const Error404 = () => {
  return (
    <div className={style.errors}>
      <div className={`${style.container} pl-5 pr-5 pt-5 pb-5 mb-auto text-dark font-size-30`}>
        <div className="font-weight-bold mb-3">Page not found</div>
        <div>This page is deprecated, deleted, or does not exist at all</div>
        <div className="font-weight-bold font-size-70 mb-1">404</div>
        <Link to={`${RouteConst.HOME_ROUTE}`} className="btn btn-outline-primary dtc-min-width-100">
          Go Back
        </Link>
      </div>
    </div>
  );
};
