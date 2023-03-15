// import { types as T } from "../deps.ts";

// export const health: T.ExpectedExports.health = {
//     // deno-lint-ignore require-await
//     async "web"(effects, duration) {
//         return healthWeb(effects, duration);
//     },
// };

// const healthWeb: T.ExpectedExports.health[""] = async (effects, duration) => {
//     await guardDurationAboveMinimum({ duration, minimumTime: 30000 });

//     return await effects.fetch("http://jellyfin.embassy:8096")
//         .then((_) => ok)
//         .catch((e) => {
//             effects.error(`${e}`)
//             return error(`The Jellyfin Web UI is unreachable`)
//         });
// };

// // *** HELPER FUNCTIONS *** //

// // Ensure the starting duration is past a minimum
// const guardDurationAboveMinimum = (
//     input: { duration: number; minimumTime: number },
// ) =>
//     (input.duration <= input.minimumTime)
//         ? Promise.reject(errorCode(60, "Starting"))
//         : null;

// const errorCode = (code: number, error: string) => ({
//     "error-code": [code, error] as const,
// });
// const error = (error: string) => ({ error });
// const ok = { result: null };

import { types as T, healthUtil } from "../deps.ts";

export const health: T.ExpectedExports.health = {
  "alive": healthUtil.checkWebUrl("http://jellyfin.embassy:8096")
};
