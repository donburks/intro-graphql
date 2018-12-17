import React, { Component } from 'react';

const styles = {
  teamDiv: {
    border: "1px solid grey",
    padding: "10px",
    margin: "4px",
    borderRadius: "10px",
    cursor: "pointer"
  }
};

class Team extends Component {
  render() {
    const team = this.props.team;

    return (
      <div style={styles.teamDiv} onClick={() => this.props.handleClick(team.city)}>
        <h4>{team.city} {team.name}</h4>
      </div>
    );
  }
}

export default Team;
