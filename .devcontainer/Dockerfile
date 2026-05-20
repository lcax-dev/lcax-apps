FROM ubuntu:24.04
LABEL authors="kongsgaard"

ARG IDE_CODE=WS
ARG IDE_VERSION=2026.1

# Fetch and install IDE dynamically
RUN mkdir -p ~/JetBrains \
    && IDE_URL=$(curl -s "https://data.services.jetbrains.com/products/releases?code=${IDE_CODE}&majorVersion=${IDE_VERSION}&latest=true" | jq -r ".${IDE_CODE}[0].downloads.linux.link") \
    && IDE_NAME=$(curl -s "https://data.services.jetbrains.com/products/releases?code=${IDE_CODE}&majorVersion=${IDE_VERSION}&latest=true" | jq -r ".${IDE_CODE}[0].name") \
    && echo "Installing ${IDE_NAME}..." \
    && wget -q ${IDE_URL} -P /tmp \
    && tar -xzf /tmp/$(basename ${IDE_URL}) -C ~/JetBrains \
    && rm -f /tmp/$(basename ${IDE_URL}) \
    && echo "${IDE_NAME} installed successfully"

USER ubuntu

# Set work directory
WORKDIR /workspaces
