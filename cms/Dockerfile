FROM node:20-alpine

WORKDIR /opt/
COPY package.json ./
RUN npm install

WORKDIR /opt/app
COPY . .
ENV PATH=/opt/node_modules/.bin:$PATH

EXPOSE 1337
CMD ["npm", "run", "develop"]
