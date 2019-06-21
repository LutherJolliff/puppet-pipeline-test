FROM node:12

# Install & start Mongodb
# RUN apt-get update
# RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
# RUN echo "deb http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.2 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-3.2.list
# RUN apt-get update
# RUN apt-get install -y mongodb-org
# RUN systemctl start mongod

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied         
# where available (npm@5+)
# COPY package*.json ./
COPY package*.json /app/

RUN npm install

COPY . .

# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
# COPY . /app

# Run tests
# RUN ng test

EXPOSE 4200
CMD [ "npm", "start" ]