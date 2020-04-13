FROM node:latest
# xvfb requirement for Cypress
RUN apt-get update &&  \
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
    xvfb
COPY . /source_code
WORKDIR /source_code
RUN yarn install
