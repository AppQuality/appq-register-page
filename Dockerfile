FROM node:14


COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build
RUN npm install -g serve

CMD serve -s build
