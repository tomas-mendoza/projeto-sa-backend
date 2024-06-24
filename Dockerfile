FROM node:20.14
WORKDIR /usr/share/api-classroom/
COPY package*.json ./
COPY . ./
RUN npm install
EXPOSE 8000
CMD ["npm", "run", "dev"]
