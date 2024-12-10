FROM jellyfin/jellyfin:10.10.3

ARG DEBIAN_FRONTEND="noninteractive"

RUN apt-get clean autoclean -y \
 && apt-get autoremove -y \
 && rm -rf /var/lib/apt/lists/*

ENV LC_ALL=en_US.UTF-8
ENV LANG=en_US.UTF-8
ENV LANGUAGE=en_US:en

ARG PLATFORM
RUN curl -sLo /usr/local/bin/yq https://github.com/mikefarah/yq/releases/latest/download/yq_linux_${PLATFORM} \
    && chmod +x /usr/local/bin/yq

COPY --chmod=755 ./docker_entrypoint.sh /usr/local/bin/docker_entrypoint.sh
COPY --chmod=755 ./check-web.sh /usr/local/bin/check-web.sh