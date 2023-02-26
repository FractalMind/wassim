FROM ubuntu:jammy-20230126

WORKDIR /var/app/googlemapscraperpro
RUN apt-get update
RUN apt install curl -y
RUN cd ~ && curl -sL https://deb.nodesource.com/setup_16.x -o /tmp/nodesource_setup.sh && bash /tmp/nodesource_setup.sh && apt install nodejs -y
RUN node -v
RUN npm i -g nx
RUN npm i -g @angular/cli
RUN npm i -g @nrwl/cli
RUN npm install -g @ionic/cli native-run cordova-res
RUN apt install nano -y
RUN apt install htop -y
