# Weatherapp

An app that shows the weather forecast for a few hours from now. The app consists of two services: the backend (Node - Koa) and the frontend (React).

## Quick guide

### Docker-compose
To launch the app using docker-compose, from the main directory run the command below:

`docker-compose up`

### Docker


To run the backend, go to the backend directory and run the command below, providing your api key:

`docker build -t weatherapp_backend . && docker run --rm -i -p 9000:9000 --name weatherapp_backend -e APPID='<APPID_HERE>' -t weatherapp_backend`

To run the frontend, go to the frontend directory and run:

`docker build -t weatherapp_frontend . && docker run --rm -i -p 8000:8000 --name weatherapp_frontend -e ENDPOINT='http://localhost:9000/api' -t weatherapp_frontend`


