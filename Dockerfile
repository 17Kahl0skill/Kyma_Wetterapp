FROM node:16.15.0

#create project dir
WORKDIR /usr/src/app

#copy any package files from project
COPY package.json ./

#install dependancy
RUN npm install

#copy code
COPY . .

#expose port
EXPOSE 3000

#start main
CMD [ "npm","start" ]