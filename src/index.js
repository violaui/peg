import * as modules from "./modules";
import * as utilities from "./utilities";
import {convert} from "./converters";
import {sassWrapper} from "./sass-wrapper";

export const peg = {
  modules,
  convert,
  utilities: utilities,
  sassFunctions: sassWrapper(modules),
}
