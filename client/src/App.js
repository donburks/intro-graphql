import React, { Component } from 'react';
import { ApolloProvider } from "react-apollo";
import Teams from "./Teams";
import Players from "./Players";
import EditPlayer from "./EditPlayer";
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerId: 0,
      city: '' 
    };
  }

  changeCity = (city) => {
    this.setState({city}); 
  }

  changePlayer = (id) => {
    this.setState({playerId: id});
  }

  render() {
    return (
      <ApolloProvider client={this.props.client}>
        <div className="App">
          {this.state.city && <Players city={this.state.city} changePlayer={this.changePlayer.bind(this)} />}
          {this.state.playerId && <EditPlayer id={this.state.playerId} />}
          {!this.state.city && !this.state.playerId && <Teams handleClick={this.changeCity.bind(this)} />}
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
