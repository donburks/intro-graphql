const { ApolloServer, gql } = require('apollo-server');
const env = process.env.NODE_ENV || 'development';
const knexConfig = require('./knexfile');
const knex = require('knex')(knexConfig[env]);


// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
const typeDefs = gql`
  # Comments in GraphQL are defined with the hash (#) symbol.
  type Player {
    id: ID!
    name: String!
    position: String!
    goals: Int
    team: Team
  }

  type Team {
    id: ID!
    city: String!
    name: String!
    players: [Player]
  }

  type Query {
    players: [Player]
    player(id: ID): Player
    teams: [Team]
    team(city: String): Team
  }

  type Mutation {
    editPlayer(name: String, position: String): Player
    firePlayer(id: ID): Player
  }
`;

// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "books" array above.
const resolvers = {
  Query: {
    players: () => {
      return knex('players');
    },
    teams: () => {
      return knex('teams');
    },
    player: (root, args, context, info) => {
      return knex('players').where('id', Number(args.id)).limit(1).then(player => player[0]);
    },
    team: (root, args) => {
      return knex('teams').where('city', args.city).limit(1).then(team => team[0]);
    }
  },
  Mutation: {
    editPlayer: (root, {name, position}, context, info) => {
      const player = knex('players').update({position}).where('name', name).returning('*').then(player => {
        //For subscription purposes only, would publish new player info
        publish('UPDATE_PLAYERS', player[0]);
        return player[0];
      });
    },
    firePlayer: (root, {id}) => {
      return knex('players').del().where('id', id).returning('*').then(player => player[0]);
    }
  },
  Player: {
    team(player) {
      return knex('teams').where('id', player.team_id).then(team => team[0]);
    }
  },
  Team: {
    players(team) {
      return knex('players').where('team_id', team.id).then(players => players);
    }
  }
};

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new ApolloServer({ typeDefs, resolvers });

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
