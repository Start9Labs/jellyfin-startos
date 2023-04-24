# DESIGNED FOR BUILDING ON ARM64 ONLY
#####################################
# Requires binfm_misc registration
# https://github.com/multiarch/qemu-user-static#binfmt_misc-register
ARG DOTNET_VERSION=6.0
ARG PLATFORM
ARG ARCH

FROM node:lts-alpine as web-builder
ARG JELLYFIN_WEB_VERSION=v10.8.10
RUN apk add curl git zlib zlib-dev autoconf g++ make libpng-dev gifsicle alpine-sdk automake libtool make gcc musl-dev nasm python3 \
 && curl -L https://github.com/jellyfin/jellyfin-web/archive/${JELLYFIN_WEB_VERSION}.tar.gz | tar zxf - \
 && cd jellyfin-web-* \
 && npm config set fetch-retry-mintimeout 20000 \
 && npm config set fetch-retry-maxtimeout 120000 \
 && npm ci --no-audit --unsafe-perm \
 && mv dist /dist


FROM debian:stable-slim as app

# https://askubuntu.com/questions/972516/debian-frontend-environment-variable
ARG DEBIAN_FRONTEND="noninteractive"
# http://stackoverflow.com/questions/48162574/ddg#49462622
ARG APT_KEY_DONT_WARN_ON_DANGEROUS_USAGE=DontWarn
# https://github.com/NVIDIA/nvidia-docker/wiki/Installation-(Native-GPU-Support)
ENV NVIDIA_DRIVER_CAPABILITIES="compute,video,utility"

# curl: healcheck
RUN apt-get update && apt-get install --no-install-recommends --no-install-suggests -y \
 ffmpeg \
 libssl-dev \
 ca-certificates \
 libfontconfig1 \
 libfreetype6 \
 libomxil-bellagio0 \
 libomxil-bellagio-bin \
 locales \
 curl \
 wget \
 jq \
 && apt-get clean autoclean -y \
 && apt-get autoremove -y \
 && rm -rf /var/lib/apt/lists/* \
 && mkdir -p /cache /config /media \
 && chmod 777 /cache /config /media \
 && sed -i -e 's/# en_US.UTF-8 UTF-8/en_US.UTF-8 UTF-8/' /etc/locale.gen && locale-gen

# ENV DOTNET_SYSTEM_GLOBALIZATION_INVARIANT=1
ENV LC_ALL en_US.UTF-8
ENV LANG en_US.UTF-8
ENV LANGUAGE en_US:en

FROM mcr.microsoft.com/dotnet/sdk:${DOTNET_VERSION} as builder
ARG PLATFORM
ARG ARCH

WORKDIR /repo
COPY ./jellyfin/. .
ENV DOTNET_CLI_TELEMETRY_OPTOUT=1
# Discard objs - may cause failures if exists
RUN find . -type d -name obj | xargs -r rm -r
# Build
RUN dotnet publish Jellyfin.Server --configuration Release --output="/jellyfin" --self-contained --runtime linux-${ARCH} -p:DebugSymbols=false -p:DebugType=none

FROM app
ARG PLATFORM
RUN wget -qO /usr/local/bin/yq https://github.com/mikefarah/yq/releases/latest/download/yq_linux_${PLATFORM} && chmod +x /usr/local/bin/yq

ENV HEALTHCHECK_URL=http://localhost:8096/health

COPY --from=builder /jellyfin /jellyfin
COPY --from=web-builder /dist /jellyfin/jellyfin-web

ADD docker_entrypoint.sh /usr/local/bin/docker_entrypoint.sh
RUN chmod +x /usr/local/bin/docker_entrypoint.sh

EXPOSE 8096
VOLUME /cache /config

HEALTHCHECK --interval=30s --timeout=30s --start-period=10s --retries=3 \
     CMD curl -Lk "${HEALTHCHECK_URL}" || exit 1

# health check
ADD ./check-web.sh /usr/local/bin/check-web.sh
RUN chmod a+x /usr/local/bin/check-web.sh