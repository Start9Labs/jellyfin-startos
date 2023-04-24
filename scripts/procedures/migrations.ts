import { compat, matches, types as T } from "../deps.ts";

export const migration: T.ExpectedExports.migration = compat.migrations
    .fromMapping({
        "10.8.9.1": {
            up: compat.migrations.updateConfig(
                (config) => {
                    if (
                        matches.shape({
                            "nextcloud": matches.any,
                            "filebrowser": matches.any,
                            "chromecast": matches.any,
                            "trailers": matches.any
                        }).test(config)
                    ) {
                        delete config.nextcloud;
                        delete config.filebrowser;
                    }
                        return config;
                    },
                false,
                { version: "10.8.9.1", type: "up" },
              ),
              down: () => { throw new Error('Downgrades are prohibited below 10.8.9.1 due to service instabilities below 10.9.8.1') },
            },
        },
    "10.8.10",
);
