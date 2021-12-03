/**
 * Here are your Resolvers for your Schema. They must match
 * the type definitions in your scheama
 */

module.exports = {
  Query: {
    pets(_, { input }, context) {
      // first arg: info passed from parent query, second arg: arguments, third: context (from apollo server)
      return context.models.Pet.findMany(input);
    },
    pet(_, { input }, context) {
      return context.models.Pet.findOne(input);
    },
  },
  Mutation: {
    pet(_, { input }, context) {
      return context.models.Pet.create(input);
    },
  },
  Pet: {
    img(pet) {
      return pet.type === 'DOG'
        ? 'https://placedog.net/300/300'
        : 'http://placekitten.com/300/300';
    },
  },
  // User: {},
};
