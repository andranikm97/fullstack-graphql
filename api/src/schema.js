const { gql } = require('apollo-server');

/**
 * Type Definitions for our Schema using the SDL.
 */
const typeDefs = gql`
  type User {
    id: ID!
    username: String!
  }

  type Pet {
    id: ID!
    name: String!
    type: String!
    createdAt: String!
    img: String
  }

  input PetInput {
    name: String
    id: ID
    type: String
  }

  input NewPetInput {
    name: String!
    type: String!
    img: String
  }

  type Query {
    pets(input: PetInput): [Pet]!
    pet(input: PetInput): Pet
  }

  type Mutation {
    pet(input: NewPetInput!): Pet!
  }
`;

module.exports = typeDefs;
