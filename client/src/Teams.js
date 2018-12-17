import React, { Component } from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Team from "./Team";

const query = gql`
{
  teams {
    id
    city
    name
  }
}
`;

class Teams extends Component {
  render() {
    return (
      <Query query={query}>
        {({loading, error, data}) => {
          if(loading) return <p>Loading...</p>;
          if(error) return <p><strong>ERROR!</strong> {error}</p>;

          return data.teams.map(team => <Team key={team.id} team={team} handleClick={this.props.handleClick} />);
        }}
      </Query>
    );
  }
}

export default Teams;
