export const SET_STATE = "@@DTC/NOTIFICATION/SET_STATE";
export const PUSH_MESSAGE = "@DTC/NOTIFICATION/PUSH_MESSAGE";
export const INIT = "@@DTC/NOTIFICATION/INIT";
export const INIT_PAGINATED_MESSAGE = "@@DTC/NOTIFICATION/INIT_PAGINATED_MESSAGE";
export const LOAD_MESSAGE = "@@DTC/NOTIFICATION/LOAD_MESSAGE";
export const DEACTIVATE = "@DTC/NOTIFICATION/DEACTIVATE";
export const HAS_VIEW_NEW_MESSAGE = "@DTC/NOTIFICATION/HAS_VIEW_NEW_MESSAGE";
export const LISTEN = "@DTC/NOTIFICATION/LISTEN";

export const setStateAction = (payload) => {
  return {
    type: SET_STATE,
    payload: payload
  };
};

const initialState = {
  popupList: [],
  paginatedList: [],
  isLoadingNewMessage: false,
  isLoadingMore: false,
  totalPages: undefined,
  newMessage: false
};

export default function notificationReducer(state = initialState, action) {
  switch (action.type) {
    case SET_STATE:
      return { ...state, ...action.payload };
    case PUSH_MESSAGE:
      return {
        ...state,
        newMessage: true,
        popupList: [action.payload, ...state.popupList],
        paginatedList: [action.payload, ...state.paginatedList]
      };
    case HAS_VIEW_NEW_MESSAGE:
      return {
        ...state,
        newMessage: false
      };
    default:
      return state;
  }
}

export const selectHasNewMessage = (state) => state.notification.newMessage;
export const selectTotalPage = (state) => state.notification.totalPages;
export const selectNotificationPopupList = (state) => state.notification.popupList;
export const selectNotificationPaginatedList = (state) => state.notification.paginatedList;
export const selectNotificationLoadingState = (state) => ({
  isLoadingNewMessage: state.notification.isLoadingNewMessage,
  isLoadingMore: state.notification.isLoadingMore
});
