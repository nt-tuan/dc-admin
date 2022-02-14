import { NOTIFICATION_TYPE, RouteConst } from "commons/consts";

import { OrderService } from "services";
import React from "react";
import { UserService } from "services/user.service";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import { getAllRecordsFromAPI } from "utils/general.util";
import { useHistory } from "react-router-dom";
import { useMessage } from "hooks/use-message";

export const withEnhanceNotification = (NotificationItemComp) => {
  return React.memo(({ data, ...rest }) => {
    const message = useMessage();
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
        targetRoute = await getNavigateRoute(notificationType, subjectId, message.error);
        redirectWithNewState(targetRoute);
      });
    };

    return <NotificationItemComp data={data} {...rest} onClick={handleNavigateToAction} />;
  });
};

const getRelevantUser = async (companyId, onError) => {
  let result;
  try {
    const data = await getAllRecordsFromAPI(UserService.getAllUsers);
    result = data.find((user) => user.id === companyId);
  } catch (error) {
    if (onError) {
      onError(error);
    }
  }
  return result;
};

const getTradeRoutePath = async (subjectId) => {
  const order = await OrderService.getOrderById(subjectId);
  return `${RouteConst.CREATE_TRADE_ROUTES}?productType=${order.productType}&productCategory=${order.productCategory}&from=${order.sellerCountry}&to=${order.buyerCountry}`;
};

const getNavigateRoute = async (notificationType, subjectId, onError) => {
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
      const res = await getRelevantUser(subjectId, onError);
      if (!res) break;
      targetRoute = `${RouteConst.USER_DETAILS}?username=${res.username}&companyId=${res.id}`;
      break;
    }
    case NOTIFICATION_TYPE.ADMIN_REBATE_CREDIT_ADD_NEW_USER: {
      const [username, companyId] = subjectId.split("--");
      targetRoute = `${RouteConst.USER_DETAILS}?username=${username}&companyId=${companyId}`;
      break;
    }
    case NOTIFICATION_TYPE.ADMIN_ROUTE_ADD_ORDER: {
      return await getTradeRoutePath(subjectId);
    }
    case NOTIFICATION_TYPE.ADMIN_CONFIRM_EXTERNAL_ORDER: {
      const params = new URLSearchParams();
      params.append("isPastOrders", "1");
      targetRoute = `${RouteConst.ORDERS}?${params.toString()}`;
      break;
    }
    default: {
      break;
    }
  }
  return targetRoute;
};
