import { NOTIFICATION_TYPE, RouteConst } from "commons/consts";
import React from "react";
import { useHistory } from "react-router-dom";
import { asyncErrorHandlerWrapper } from "utils/error-handler.util";
import { getAllRecordsFromAPI } from "utils/general.util";
import { UserService } from "services/user.service";
import { message } from "antd";
import { OrderService } from "services";

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

const getRelevantUser = async (companyId) => {
  let result;
  try {
    const data = await getAllRecordsFromAPI(UserService.getAllUsers);
    result = data.find((user) => user.id === companyId);
  } catch (error) {
    message.error(error);
  }
  return result;
};

const getTradeRoutePath = async (subjectId) => {
  const order = await OrderService.getOrderById(subjectId);
  return `${RouteConst.CREATE_TRADE_ROUTES}?productType=${order.productType}&productCategory=${order.productCategory}&from=${order.sellerCountry}&to=${order.buyerCountry}`;
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
      const res = await getRelevantUser(subjectId);
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
    default: {
      break;
    }
  }
  return targetRoute;
};
