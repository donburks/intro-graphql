import React, { Component } from 'react';

const styles = {
  playerDiv: {
    border: "1px solid grey",
    padding: "10px",
    margin: "4px",
    borderRadius: "10px",
    cursor: "pointer"
  }
};

class Player extends Component {
  render() {
    const player = this.props.player;

    return (
      <div style={styles.playerDiv} onClick={() => this.props.changePlayer(player.id)}>
        <h4>{player.name}</h4>
        <p>Position: {player.position}</p>
        <p>Goals: {player.goals}</p>
      </div>
    );
  }
}

export default Player;
