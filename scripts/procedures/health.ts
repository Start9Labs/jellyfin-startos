// import { types as T, checkWebUrl, catchError } from "../deps.ts";

// export const health: T.ExpectedExports.health = {
//     // deno-lint-ignore require-await
//     async "alive"(effects, duration) {
//       return checkWebUrl("http://jellyfin.embassy:8096")(effects, 90000).catch(catchError(effects))
//     },
// };

import { types as T, healthUtil } from "../deps.ts";

export const health: T.ExpectedExports.health = {
  "alive": healthUtil.checkWebUrl("http://jellyfin.embassy:8096")
};
