<p align="center">
  <img src="icon.png" alt="Project Logo" width="21%">
</p>

# Jellyfin for StartOS

[Jellyfin](https://github.com/jellyfin/jellyfin) is a free and open source media server that enables you to organize, manage, and stream your personal media collection to any device. It serves as a community-driven alternative to proprietary platforms like Emby and Plex, offering full control over your media without tracking or licensing restrictions. This repository creates the `s9pk` package that is installed to run `Jellyfin` on [StartOS](https://github.com/Start9Labs/start-os/).

## Dependencies

Prior to building the `jellyfin.s9pk` package, it's essential to configure your build environment for StartOS services. You can find instructions on how to set up the appropriate build environment in the [Packaging Guide](https://staging.docs.start9.com/packaging-guide/).

- [docker](https://docs.docker.com/get-docker)
- [docker-buildx](https://docs.docker.com/buildx/working-with-buildx/)
- [make](https://www.gnu.org/software/make/)
- [start-cli](https://github.com/Start9Labs/start-cli/)

## Cloning

Clone the Jellyfin package repository locally.

```
git clone https://github.com/Start9Labs/jellyfin-startos.git
cd jellyfin-startos
```

## Building

To build the **Jellyfin** service as a universal package, run the following command:

```
make
```

## Installing (on StartOS)

Before installation, define `host: https://server-name.local` in your `~/.startos/config.yaml` config file then run the following commands to determine successful install:

> :information_source: Change server-name.local to your Start9 server address

```
make install
```

**Tip:** You can also install the jellyfin.s9pk by sideloading it under the **StartOS > Sideload a Service** section.

## Verify Install

Go to your StartOS Services page, select **Jellyfin**, configure and start the service.

**Done!**
