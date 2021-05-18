import { LP } from "../utils";
import {
  getBasicGridLandscapeConfig,
  getBasicGridPortraitConfig
} from "./grid/basic-grid-config";
import {
  getBoardGridLandscapeConfig,
  getBoardGridPortraitConfig
} from "./grid/board-grid-config";
import {
  getMainGridLandscapeConfig,
  getMainGridPortraitConfig
} from "./grid/main-grid-config";

export function getMainGridConfig() {
  return LP(getMainGridLandscapeConfig, getMainGridPortraitConfig).call(null);
}

export function getBoardGridConfig() {
  return LP(getBoardGridLandscapeConfig, getBoardGridPortraitConfig).call(null);
}

export function getBasicGridConfig() {
  return LP(getBasicGridLandscapeConfig, getBasicGridPortraitConfig).call(null);
}
