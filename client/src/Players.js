import React, { Component } from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Player from "./Player";

class Players extends Component {
  render() {
    const query = gql`
    {
      team(city: "${this.props.city}") {
        city
        name
        players {
          name
          position
          goals
        }
      }
    }
    `;

    return (
      <Query query={query}>
        {({loading, error, data}) => {
          if(loading) return <p>Loading players...</p>;
          if(error) return <p><strong>PLAYER ERROR!</strong> {error}</p>;

          return (
            <div> 
              <h2>{data.team.city} {data.team.name}</h2>
              {data.team.players.map(player => <Player key={player.id} player={player} changePlayer={this.props.changePlayer} />)}
            </div>
          );
        }}
      </Query>
    );
  }
}

export default Players;
