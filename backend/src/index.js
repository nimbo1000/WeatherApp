const debug = require('debug')('weathermap');

const Koa = require('koa');
const router = require('koa-router')();
const fetch = require('node-fetch');
const cors = require('kcors');

const appId = process.env.APPID || '';
const mapURI = process.env.MAP_ENDPOINT || "http://api.openweathermap.org/data/2.5";
const targetCity = process.env.TARGET_CITY || "Helsinki,fi";
const forecastCnt = process.env.FORECAST_COUNT || "5";

const port = process.env.PORT || 9000;

const app = new Koa();

app.use(cors());

const fetchWeather = async () => {
  const endpoint = `${mapURI}/weather?q=${targetCity}&appid=${appId}&`;
  const response = await fetch(endpoint);

  return response ? response.json() : {}
};

const fetchForecast = async () => {
  const endpoint = `${mapURI}/forecast?q=${targetCity}&&cnt=${forecastCnt}&appid=${appId}&`;
  const response = await fetch(endpoint);

  return response ? response.json() : {}
};

router.get('/api/weather', async ctx => {
  const weatherData = await fetchWeather();
  const forecastData = await fetchForecast();

  ctx.type = 'application/json; charset=utf-8';
  ctx.body = {
    weather: weatherData.weather ? weatherData.weather[0] : {},
    forecast: forecastData.list ? forecastData.list : {}
  };
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(port);

console.log(`App listening on port ${port}`);
