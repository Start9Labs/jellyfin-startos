import { types as T, healthUtil } from "../deps.ts";

export const health: T.ExpectedExports.health = {
  "alive": healthUtil.checkWebUrl("http://jellyfin.embassy:8096/health")
};
