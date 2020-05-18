import React from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "commons/consts";
import { getPrefixUrl, removeIdPartFromProductUrl } from "utils";
import { Helmet } from "react-helmet";

const TEXT_ONLY_PATH = [];

const _SubBar = () => {
  const path = location.pathname;
  const prefixUrl = getPrefixUrl(path);
  const resourceNames = path.split("/");
  const title = removeIdPartFromProductUrl(resourceNames[resourceNames.length - 1]); //use the last breadcrumb as title

  const isTextOnlyPath = (link) => {
    const isTextOnly =
      TEXT_ONLY_PATH.some((path) => path.includes(link) || link.includes(path)) && path !== "";
    return isTextOnly;
  };

  const renderHomeBread = (path) => {
    return (
      <Link className="text-capitalize" to={path}>
        <i className="fa fa-home" />
      </Link>
    );
  };

  const renderTextonlyBread = (resource) => {
    return <span className="text-capitalize">{parseRoleText(resource).replace(/-/g, " ")}</span>;
  };

  const renderLinkBread = (resource, path) => {
    return (
      <Link className="text-capitalize" to={path}>
        {parseRoleText(resource).replace(/-/g, " ")}
      </Link>
    );
  };

  const renderRightArrow = (curIndex, resourceNames) => {
    return curIndex + 1 === resourceNames.length ? null : (
      <i className="fe fe-chevron-right mr-2 ml-2" />
    );
  };

  const renderBreadCrumbs = () => {
    return resourceNames.map((resource, index) => {
      const path = routeMapper(resourceNames.slice(0, index + 1).join("/"));
      return (
        <React.Fragment key={resource}>
          {index === 0
            ? renderHomeBread(path)
            : isTextOnlyPath(path)
            ? renderTextonlyBread(resource)
            : renderLinkBread(resource, path)}
          {renderRightArrow(index, resourceNames)}
        </React.Fragment>
      );
    });
  };

  const parseHeader = () => {
    return `${parseRoleText(prefixUrl)} - ${title.replace(/-/g, " ")}`;
  };

  return resourceNames.length === 0 ? null : (
    <nav className="p-3 pb-0 font-size-16">
      <Helmet title={parseHeader()} />
      <div className="air__utils__shadow p-3 dtc-br-10 bg-white">
        <h3 className="text-capitalize">{parseHeader()}</h3>
        {resourceNames.length === 1 ? null : (
          <div className="d-flex flex-wrap align-items-center mr-4">{renderBreadCrumbs()}</div>
        )}
      </div>
    </nav>
  );
};

export const SubBar = React.memo(_SubBar);

const parseRoleText = (roleText) => {
  switch (roleText) {
    case ROUTES.SELLER_PREFIX.replace("/", ""):
    case ROUTES.SELLER_PREFIX:
      return "Sales";
    case ROUTES.BUYER_PREFIX.replace("/", ""):
    case ROUTES.BUYER_PREFIX:
      return "Purchase";
    case ROUTES.ADMIN_PREFIX.replace("/", ""):
    case ROUTES.ADMIN_PREFIX:
      return "Admin";
    default:
      return roleText;
  }
};

const routeMapper = (route) => {
  switch (route) {
    case "/seller":
      return ROUTES.SELLER_DASHBOARD_ROUTE;
    case "/seller/profile":
      return ROUTES.SELLER_TAB_PROFILE_INFO_ROUTE;
    case "/buyer":
      return ROUTES.BUYER_DASHBOARD_ROUTE;
    case "/buyer/profile":
      return ROUTES.BUYER_TAB_PROFILE_INFO_ROUTE;
    default:
      return route;
  }
};
