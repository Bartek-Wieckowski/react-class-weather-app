import React from 'react';
import Input from './components/Input';
class App extends React.Component {
  state = {
    location: '',
    isLoading: false,
    weather: {},
    displayLocation: '',
  };

  setLocation = (e) => this.setState({ location: e.target.value });

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
