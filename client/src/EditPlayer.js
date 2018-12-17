import React, { Component } from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

const EDIT_PLAYER = gql`
  mutation EditPlayer($name: String!, $position: String!) {
    editPlayer(name: $name, position: $position) {
      id
      name
      position
      goals
    }
  }
`;

class EditPlayer extends Component {
  render() {
    let input;

    return (
      <Mutation mutation={EDIT_PLAYER}>
        {(editPlayer, { data }) => (
          <div>
            <form onSubmit={e => {
              e.preventDefault();
              editPlayer({ variables: { name: input.value, position: "X" }});
              input.value = "";
            }}>
              <input ref={node => {
                input = node;
              }}
              type="text"
              placeholder="Enter Player Name..."
              /><br />
              <button type="submit">Edit Player</button>
            </form>
          </div>
        )}
      </Mutation>
    );
  }
}

export default EditPlayer;
