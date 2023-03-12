import { Backups } from "../deps.ts";

export const { createBackup, restoreBackup } = Backups.volumes("main", "cache", "config").build();