import { ROUTES } from "commons/consts";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import MENU_ACTIONS from "redux/menu/actions";
import { getPrefixUrl } from "utils";

export const MenuDataManager = () => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  React.useEffect(() => {
    const dispatchSetMenuData = (pathname) => {
      const urlPrefix = getPrefixUrl(pathname);
      if (urlPrefix === ROUTES.BUYER_PREFIX) {
        return dispatch({ type: MENU_ACTIONS.SET_BUYER_DATA });
      }
      if (urlPrefix === ROUTES.SELLER_PREFIX) {
        return dispatch({ type: MENU_ACTIONS.SET_SELLER_DATA });
      }
      if (urlPrefix === ROUTES.ADMIN_PREFIX) {
        return dispatch({ type: MENU_ACTIONS.SET_ADMIN_DATA });
      }
    };
    dispatchSetMenuData(location.pathname);
    const unlisten = history.listen((location) => dispatchSetMenuData(location.pathname));
    return unlisten;
  }, [dispatch, history, location.pathname]);

  return null;
};
