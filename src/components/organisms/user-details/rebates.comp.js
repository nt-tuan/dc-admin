import React, { Fragment } from "react";
import { Button, Divider } from "antd";
import { Link } from "react-router-dom";
import { RouteConst } from "commons/consts";

export const RebatesInfo = ({ data, companyName, companyId, username }) => {
  return (
    <Fragment>
      <div className="d-flex">
        <h5 className="text-danger">Rebates</h5>
        <Link
          to={{
            pathname: RouteConst.CREATE_REBATES,
            state: { toCompanyName: companyName, companyId: companyId, username: username }
          }}
        >
          <Button className="px-2 ml-2">
            <i className="fe fe-plus" />
          </Button>
        </Link>
      </div>
      {data.map((rebate) => (
        <div key={rebate.id}>
          <div className="row">
            <b className="col-4">{rebate.brand}</b>
            <div className="col-4 text-center">{rebate.value}%</div>
            <Link
              to={{
                pathname: RouteConst.EDIT_REBATES.replace(":id", `${companyName}`),
                search: `?id=${rebate.id}`,
                state: { pathname: `${location.pathname}${location.search}` }
              }}
            >
              <i className="fe fe-edit-3 col-4 text-center" />
            </Link>
          </div>
          <Divider className="mt-1" />
        </div>
      ))}
    </Fragment>
  );
};
