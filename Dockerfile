FROM node:20.0.0

RUN mkdir -p /usr/app
WORKDIR /usr/app

COPY ./ ./

RUN yarn install

EXPOSE 2416

CMD ["npm", "run", "dev"]