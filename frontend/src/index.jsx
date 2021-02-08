import React from 'react';
import ReactDOM from 'react-dom';

const baseURL = process.env.ENDPOINT;

const getWeatherFromApi = async () => {
  try {
    const response = await fetch(`${baseURL}/weather`);
    return response.json();
  } catch (error) {
    console.error(error);
  }

  return {};
};

class Weather extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      icon: "",
    };
  }

  async componentDidMount() {
    const weatherData = await getWeatherFromApi();
    this.setState({icon: weatherData.weather.icon.slice(0, -1), weather: weatherData.weather, forecast: weatherData.forecast });
  }

  render() {
    const { icon, weather, forecast } = this.state;

    return (
      <div className="container">
        <div className="icon">
          { icon && <div><img src={`/img/${icon}.svg`} /> <h3>{`Currently`}</h3></div>}
        </div>
        <div className="forecast-list">
            {forecast && forecast.map((forecast_item, index) => {
              return <div className="icon" key={index}>
                      <img src={`/img/${forecast_item.weather[0].icon.slice(0, -1)}.svg`} />
                      <h3>{`${forecast_item.dt_txt}`}</h3>
                    </div>
            })}
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Weather />,
  document.getElementById('app')
);
