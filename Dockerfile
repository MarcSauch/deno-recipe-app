FROM registry.access.redhat.com/ubi9/ubi:latest AS base


ENV container=oci
ENV USER=default

USER root

# COPY .nvmrc .nvmrc

# Check for package update
RUN dnf -y update-minimal --security --sec-severity=Important --sec-severity=Critical && \
    # Install git, nano,
    dnf install unzip git nano -y; \
    # clear cache
    dnf clean all

# install Deno
RUN curl -fsSL https://deno.land/install.sh | DENO_INSTALL=/usr/local sh


# Dev target
FROM base AS dev
COPY .devcontainer/devtools.sh /tmp/devtools.sh
RUN  /tmp/devtools.sh
USER default


# DEPLOYMENT EXAMPLE:
#-----------------------------

# Prod target
FROM base

## Make App folder, copy project into container
WORKDIR /app
## REPLACE: replace this COPY statement with project specific files/folders
COPY . . 

## Install project requirements, build project
RUN deno install lite-server --save-dev; \
    deno build --prod

## clarify permissions
RUN chown -R default:0 /app && \
    chmod -R g=u /app

## Expose port and run app
EXPOSE 8080
USER default
CMD [ "lite-server --baseDir='dist/*/'"  ]

# EXPOSE 3000
#CMD ["/usr/local/nvm/nvm.sh;", "nvm install;", "npm", "install", "--global", "serve;", 'serve']