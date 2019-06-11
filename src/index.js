import {types} from "node-sass";
import * as modules from "./modules";
import {sassConverter} from "./sass-converter";
import {sassWrapper} from "./sass-wrapper";
import * as utilities from "./utilities";

export const bow = {
  modules: modules,
  sassFunctions: sassWrapper(modules, sassConverter(types)),
  utilities: utilities
}
