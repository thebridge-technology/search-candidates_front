FROM node:16.4-alpine3.14

WORKDIR /app

# install and cache app dependencies
COPY package.json /app/package.json

EXPOSE 3000

CMD ["yarn", "dev"]
