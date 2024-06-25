FROM node:alpine
WORKDIR /frontend
COPY . /frontend
RUN npm install -g @angular/cli@15
RUN npm install
EXPOSE 4200
CMD ["ng","serve","--host","0.0.0.0"]