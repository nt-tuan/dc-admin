import { NOTIFICATION_TYPE, RouteConst } from "commons/consts";
import React from "react";
import { useHistory } from "react-router-dom";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";

export const withEnhanceNotification = (NotificationItemComp) => {
  return React.memo(({ data }) => {
    const history = useHistory();
    const { notificationType, subjectId } = data;

    const redirectWithNewState = (targetRoute) => {
      if (targetRoute.length) {
        history.push(targetRoute, { value: new Date().getUTCMilliseconds() });
      }
    };

    const handleNavigateToAction = () => {
      let targetRoute = "";
      asyncErrorHandlerWrapper(async () => {
        targetRoute = await getNavigateRoute(notificationType, subjectId);
        redirectWithNewState(targetRoute);
      });
    };

    return <NotificationItemComp data={data} onClick={handleNavigateToAction} />;
  });
};

const getNavigateRoute = async (notificationType, subjectId, callback) => {
  let targetRoute = "";

  switch (notificationType) {
    case NOTIFICATION_TYPE.ADMIN_PROMPT_PCC_PAYMENT_FOR_BUYER: {
      targetRoute = RouteConst.ADD_FUNDS;
      break;
    }
    case NOTIFICATION_TYPE.ADMIN_MARKETPLACE_CREDIT_REQUEST_PCC: {
      targetRoute = RouteConst.CREDIT_REQUEST;
      break;
    }
    case NOTIFICATION_TYPE.ADMIN_ROUTE_ADD_NEW_ADDRESS:
    case NOTIFICATION_TYPE.ADMIN_ROUTE_ADD_NEW_USER: {
      targetRoute = `${RouteConst.ROUTE}?tab=pending`;
      break;
    }
    case NOTIFICATION_TYPE.ADMIN_REBATE_CREDIT_ADD_NEW_USER: {
      const [username, companyId] = subjectId.split("--");
      targetRoute = `${RouteConst.USER_DETAILS}?username=${username}&companyId=${companyId}`;
      break;
    }
    default: {
      break;
    }
  }

  return targetRoute;
};
