FROM node:20.14
WORKDIR /usr/share/api-classroom/
COPY package*.json ./
COPY .env ./
RUN npm install
COPY . ./
EXPOSE 8000
CMD ["npm", "run", "dev"]