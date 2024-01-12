FROM node:20

WORKDIR /src/app

COPY . .

RUN npm install

RUN npm run build

USER node

CMD ["npm", "run", "start"]