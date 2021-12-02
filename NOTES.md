# Introduction

GraphQL - what it is: control what you ask and get from an API. It is just a spec.

Server-side:

* Type definitions (GraphQL is a strongly-typed language)
* Resolvers (aka contorollers, they retrieve data from a data source)
* Query definitions (ask)
* Mutations definitions (modify)
* Composition
* Schema (what all of the above combine)

Client-side:

* Queries (get)
* Mutations (modify)
* Fragments

Where does GraphQL fit in?
* A GraphQL server with a connected DB
* A GraphQL server as a layer in front of many 3rd party services and connects them all with one GraphQL API
* A hybrid approach where a GraphQL server has a connected DB and also communicates with 3rd party services


## Tools
Servers:
* Apollo server
* GraphQL Yoga
* ...

Services: 
* Amplify
* ...

Tools:
* Prisma
* ...

## Schemas
This is the first thing you need to create to start a GraphQL server. We do this by using *schema defintion language (SDL)*. You can also use JS to create schemas.

Basic parts of a schema:
* Types - a construct defining a shape with fields
* Fields - keys on a Type that have a name and a value type
* Scalars - primitive value type built into GraphQL
* Query - type that defines how clients can access data
* Mutation - type that defines how clients can modify or create data

## First example

When making a schema, you must define types. Types are usually wrapped in a GraphQL tag that has types, some of which are data types, and there is always a query type that must be named 'Query'. An exclamation mark next to a value means that the value must not be null.

Example code:
```js
// Create a schema
const gql = require('graphql-tag');
const { ApolloServer } = require('apollo-server');
const typeDefs = gql`
  type User {
    email: String!
    avatar: String!
    friends: [User!]!
  }

  type Query {
    me: User!
  }
`;

const resolvers = {
  Query: {
    me() {
      return {
        email: 'yoda@gmail.com',
        avatar: 'http://yoda.png',
        friends: [],
      };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen(4000).then((message) => {
  console.log(`Listening on port ${message.port}`);
});
```

# Queries & Resolvers

Query type is a special type of types that exposes data; it defines fiels that can be returned to the client upon a request.

Creating queries:
1) Create a *Query* type in the schema using SDL
2) Add fields to the *Query* type
3) Create *Resolvers* that ask for the fields

**Resolvers** - functions responsible for returning values for fields that exist on *Types* in a *Schema*. Resolvers execution is dependent on the incoming client *Query*. 

* Resolvers name must match exactly the fields in type definitions.
* Resolvers must return the value type declared for the matching field
* Resolvers can be async --> can retrieve data from any source

**Schema + Resolvers = Server**
At least 1 query and 1 type in the schema...

## Query types exercise
