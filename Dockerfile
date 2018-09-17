FROM node:8.9-alpine
ENV NODE_ENV production
WORKDIR /usr/src
RUN npm install yarn
COPY . .
EXPOSE 8000
CMD yarn install --production=false && yarn prod:start