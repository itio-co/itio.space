# Docker compose for next.js
FROM node:18 as base

WORKDIR /app/

ADD . .

ENV YARN_CACHE_FOLDER=/.cache/yarn

# RUN --mount=type=cache,target=/usr/local/share/.cache/yarn,sharing=locked,uid=1000,gid=1000 \
#   yarn install --frozen-lockfile --production --network-timeout 300000
RUN yarn install

CMD [ "yarn", "dev" ]

# Dev layer
FROM base as dev

CMD [ "yarn", "dev" ]

# Build layer
FROM base as build

RUN yarn build

CMD [ "yarn", "start" ]
