FROM node:16.15.0

LABEL version="1.0"
#create project dir
WORKDIR /usr/src/app

#copy any package files from project
COPY package.json ./

#install dependancy
RUN npm install

#copy code
COPY . .

#expose port
EXPOSE 8080

#start main
CMD [ "npm","start" ]