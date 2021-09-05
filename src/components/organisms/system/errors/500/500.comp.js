import React from "react";
import style from "../errors-shared-styles.module.scss";
import { Button } from "antd";
import { RouteConst } from "commons/consts";

class Error500 extends React.Component {
  render() {
    return (
      <div className={style.errors}>
        <div className={`${style.container} pl-5 pr-5 pt-5 pb-5 mb-auto text-dark font-size-30`}>
          <div className="font-weight-bold mb-3">Server Error</div>
          {/* <div>This page is deprecated, deleted, or does not exist at all</div> */}
          <div className="font-weight-bold font-size-70 mb-1">500</div>
          <Button type="primary" ghost href={RouteConst.HOME_ROUTE}>
            Take me back
          </Button>
        </div>
      </div>
    );
  }
}

export default Error500;
