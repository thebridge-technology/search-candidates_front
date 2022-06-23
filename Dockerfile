FROM node:16.4-alpine3.14

WORKDIR /app

# install and cache app dependencies
COPY package.json /app/package.json

EXPOSE 3002

CMD ["yarn", "dev", "--port", "3002"]
