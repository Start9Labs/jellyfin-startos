// This is where any configuration rules related to the configuration would go. These ensure that the user can only create a valid config.

import { compat, types as T } from "../deps.ts";

// deno-lint-ignore require-await
export const setConfig: T.ExpectedExports.setConfig = async (
  effects: T.Effects,
  newConfig: T.Config,
) => {
  // deno-lint-ignore no-explicit-any
  const dependsOnNC: { [key: string]: string[] } = (newConfig as any) ?.nextcloud ===  true ? { "nextcloud": [] } : {};
  // deno-lint-ignore no-explicit-any
  const dependsOnFB: { [key: string]: string[] } = (newConfig as any) ?.filebrowser ===  true ? { "filebrowser": [] } : {};

  if (Object.keys(dependsOnNC).length === 0 && Object.keys(dependsOnFB).length === 0) {
    return { error: "Nextcloud or Filebrowser must be enabled"}
  }
  
  return compat.setConfig(effects, newConfig, {
    ...dependsOnNC,
    ...dependsOnFB,
  });
};