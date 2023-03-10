PKG_ID := $(shell yq e ".id" manifest.yaml)
PKG_VERSION := $(shell yq e ".version" manifest.yaml)
TS_FILES := $(shell find ./ -name \*.ts)
JELLYFIN_SRC := $(shell find ./jellyfin -name \*.cs)

# delete the target of a rule if it has changed and its recipe exits with a nonzero exit status
.DELETE_ON_ERROR:

all: verify

verify: $(PKG_ID).s9pk
	embassy-sdk verify s9pk $(PKG_ID).s9pk

install: $(PKG_ID).s9pk
	embassy-cli package install $(PKG_ID).s9pk

clean:
	rm -rf docker-images
	rm -f image.tar
	rm -f $(PKG_ID).s9pk
	rm -f scripts/*.js

scripts/embassy.js: $(TS_FILES)
	deno bundle scripts/embassy.ts scripts/embassy.js

# for rebuilding just the arm image. will include docker-images/x86_64.tar into the s9pk if it exists
arm: docker-images/aarch64.tar scripts/embassy.js
	embassy-sdk pack

# for rebuilding just the x86 image. will include docker-images/aarch64.tar into the s9pk if it exists
x86: docker-images/x86_64.tar scripts/embassy.js
	embassy-sdk pack

docker-images/aarch64.tar: Dockerfile docker_entrypoint.sh $(JELLYFIN_SRC)
# ifeq ($(ARCH),aarch64)
	mkdir -p docker-images
	docker buildx build --no-cache --tag start9/$(PKG_ID)/main:$(PKG_VERSION) --build-arg ARCH=aarch64 --build-arg PLATFORM=arm64 --build-arg ARCHVERSION=arm64v8 --platform=linux/arm64 -o type=docker,dest=docker-images/aarch64.tar .
# endif

docker-images/x86_64.tar: Dockerfile docker_entrypoint.sh $(JELLYFIN_SRC)
# # ifeq ($(ARCH),aarch64)
	mkdir -p docker-images
	docker buildx build --no-cache --tag start9/$(PKG_ID)/main:$(PKG_VERSION) --build-arg ARCH=amd64 --build-arg PLATFORM=amd64 --build-arg ARCHVERSION=amd64 --platform=linux/amd64 -o type=docker,dest=docker-images/x86_64.tar -f Dockerfile.amd64 .
# endif

$(PKG_ID).s9pk: manifest.yaml instructions.md icon.png LICENSE scripts/embassy.js docker-images/aarch64.tar docker-images/x86_64.tar
	embassy-sdk pack
