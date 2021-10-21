# syntax=docker/dockerfile:1
FROM node:14-alpine as tm-back
WORKDIR /trend-movies-back
EXPOSE 3009
COPY . .
RUN yarn install && yarn build
CMD ["npm", "run", "start:prod" ]
