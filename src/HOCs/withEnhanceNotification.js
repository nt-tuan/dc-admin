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
    case NOTIFICATION_TYPE.ADMIN_ROUTE_ADD_NEW_ADDRESS:
    case NOTIFICATION_TYPE.ADMIN_ROUTE_ADD_NEW_USER:
    default: {
      targetRoute = `${RouteConst.ADD_ROUTE}?tab=pending`;
      break;
    }
  }

  return targetRoute;
};
