import * as CONFIGS_ACTIONS from "./configs.duck";
import { put, all, select, takeLatest } from "redux-saga/effects";
import {
  initialState,
  mappingTypeAndKeyStateBranding,
  selectBrandingAssetsData
} from "./configs.duck";
import { getAssetResource } from "@/services/preference.service";
import { getOrganizationName } from "@/services/organization.service";

export function* LOAD_ASSETS() {
  const types = Object.keys(mappingTypeAndKeyStateBranding);
  for (const type of types) {
    yield LOAD_ASSET({ payload: { type } });
  }
}
export function* LOAD_ASSET({ payload }) {
  const { type } = payload;

  const brandingAsset = yield select(selectBrandingAssetsData);
  const key = mappingTypeAndKeyStateBranding[type];

  try {
    const res = yield getAssetResource(type);

    if (res && res.url) {
      yield put({
        type: CONFIGS_ACTIONS.SET_STATE,
        payload: {
          brandingAsset: {
            ...brandingAsset,
            [key]: res.url
          }
        }
      });
    } else {
      yield put({
        type: CONFIGS_ACTIONS.SET_STATE,
        payload: {
          brandingAsset: getDefaultBrandingAsset(brandingAsset, key)
        }
      });
    }
  } catch (error) {
    yield put({
      type: CONFIGS_ACTIONS.SET_STATE,
      payload: {
        brandingAsset: getDefaultBrandingAsset(brandingAsset, key)
      }
    });
  }
}
function getDefaultBrandingAsset(brandingAsset, key) {
  if (initialState.brandingAsset[key]) {
    return {
      ...brandingAsset,
      [key]: initialState.brandingAsset[key]
    };
  }
  return brandingAsset;
}
export function* GET_MARKETPLACE_NAME() {
  try {
    const result = yield getOrganizationName();
    if (result && result.marketplaceName) {
      yield put({
        type: CONFIGS_ACTIONS.SET_STATE,
        payload: {
          marketPlaceName: result.marketplaceName
        }
      });
      localStorage.setItem("REACT_APP_COMPANY_NAME", result.marketplaceName);
    }
  } catch (error) {
    console.error(error);
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(CONFIGS_ACTIONS.LOAD_ASSET, LOAD_ASSET),
    takeLatest(CONFIGS_ACTIONS.LOAD_ASSETS, LOAD_ASSETS),
    takeLatest(CONFIGS_ACTIONS.LOAD_MARKETPLACE_NAME, GET_MARKETPLACE_NAME)
  ]);
}
