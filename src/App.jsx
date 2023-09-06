import React from 'react';
import Input from './components/Input';
class App extends React.Component {
  state = {
    location: '',
    isLoading: false,
    weather: {},
    displayLocation: '',
  };

  fetchWeather = async () => {
    try {
      this.setState({
        isLoading: true,
      });
      const res = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${this.state.location}`
      );
      const data = await res.json();
      console.log(data.results);

      if (!data.results) throw new Error('Location not found');

      const { latitude, longitude, timezone, name, country_code } =
        data.results.at(0);

      this.setState({
        displayLocation: `${name} ${country_code}`,
      });
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`
      );
      const weatherData = await weatherRes.json();
      this.setState({ weather: weatherData.daily });
    } catch (err) {
      console.error(err);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  setLocation = (e) => this.setState({ location: e.target.value });

  componentDidMount() {
    this.setState({ location: localStorage.getItem('location') || '' });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.location !== prevState.location) {
      this.fetchWeather();

      localStorage.setItem('location', this.state.location);
    }
  }

  render() {
    return (
      <div className="app">
        <h1>Check Weather!</h1>
        <Input
          location={this.state.location}
          onChangeLocation={this.setLocation}
        />
      </div>
    );
  }
}

export default App;
