import {types} from "node-sass";
import {properties} from "./modules";
import {sassHelper} from "./sass-helper";
import {wrapper} from "./sass-wrapper";
import {getRange, getProp} from "./utilities";

export const bow = {
  properties: properties,
  sassFunctions: wrapper(sassHelper(types)),
  getRange,
  getProp,
}
