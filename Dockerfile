FROM node:latest

WORKDIR /project/

COPY ./package*.json ./ /project/
RUN npm install

COPY . ..

EXPOSE 3000
CMD ["node", "index.js"]
