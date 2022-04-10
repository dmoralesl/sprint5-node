FROM node:16
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app
RUN npm cache clean --force
RUN npm install
COPY . /usr/src/app
ENTRYPOINT ["/usr/src/app/docker-entrypoint.sh"]
EXPOSE 3000/tcp