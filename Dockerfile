FROM node:12.16
ARG NODE_ENV
RUN apt-get update
# xvfb requirement for Cypress \
RUN if [ "$NODE_ENV" = "development" ]; \
    then \
      apt-get install -y \
        libgtk2.0-0 \
        libgtk-3-0 \
        libnotify-dev \
        libgconf-2-4 \
        libnss3 \
        libxss1 \
        libasound2 \
        libxtst6 \
        xauth \
        xvfb; \
    fi

WORKDIR /usr/src/app
COPY . /usr/src/app
RUN yarn install
