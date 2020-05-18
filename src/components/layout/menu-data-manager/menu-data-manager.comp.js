import React from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import MENU_ACTIONS from "redux/menu/actions";

export const MenuDataManager = () => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  React.useEffect(() => {
    const dispatchSetMenuData = (pathname) => {
      return dispatch({ type: MENU_ACTIONS.SET_USER_DATA });
    };
    dispatchSetMenuData(location.pathname);
    const unlisten = history.listen((location) => dispatchSetMenuData(location.pathname));
    return unlisten;
  }, [dispatch, history, location.pathname]);

  return null;
};
