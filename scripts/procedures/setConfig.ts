// This is where any configuration rules related to the configuration would go. These ensure that the user can only create a valid config.

import { compat, types as T } from "../deps.ts";

// deno-lint-ignore require-await
export const setConfig: T.ExpectedExports.setConfig = async (
  effects: T.Effects,
  newConfig: T.Config,
) => {
  // deno-lint-ignore no-explicit-any
  const dependsOnNC: { [key: string]: string[] } = (newConfig as any) ?.mediasources?.find((x: any) => x ===  'nextcloud') ? { "nextcloud": [] } : {};
  // deno-lint-ignore no-explicit-any
  const dependsOnFB: { [key: string]: string[] } = (newConfig as any) ?.mediasources?.find((x: any) => x ===  'filebrowser') ? { "filebrowser": [] } : {};
  
  return compat.setConfig(effects, newConfig, {
    ...dependsOnNC,
    ...dependsOnFB,
  });
};