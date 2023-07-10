FROM node:14.15.3-slim as node_binaries

FROM ubuntu:20.04

ARG wait_for_it_mirror=https://raw.githubusercontent.com/vishnubob/wait-for-it/81b1373f17855a4dc21156cfe1694c31d7d1792e/wait-for-it.sh
ADD "${wait_for_it_mirror}" /usr/local/bin/wait-for-it
RUN chmod 755 /usr/local/bin/wait-for-it

RUN apt-get update && \
	apt-get install -y \
    openssl && \
  apt-get clean && \
  rm -rf /var/lib/apt/lists/*

RUN groupadd -g 1000 cars && \
	useradd -ms /bin/bash -u 1000 -g 1000 cars && \
	mkdir -p /app && \
	chown cars:cars /app

COPY --from=node_binaries /usr/local/bin/node /usr/local/bin/node
COPY --from=node_binaries /opt/yarn-v1.22.5 /opt/yarn-v1.22.5
RUN ln -s /opt/yarn-v1.22.5/bin/yarn /usr/local/bin/yarn

USER cars
WORKDIR /app

COPY --chown=cars:cars package.json .
COPY --chown=cars:cars yarn.lock .

RUN yarn install --frozen-lockfile && yarn cache clean

COPY --chown=cars:cars src src/

CMD ["yarn", "start"]
