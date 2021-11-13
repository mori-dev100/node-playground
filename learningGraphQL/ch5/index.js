import { ApolloServer } from "apollo-server";
import { importSchema } from "graphql-import";

const typeDefs = importSchema("./schema.graphql");

const users = [
  { githubLogin: "@magcho", name: "magcho" },
  { githubLogin: "@magchoa", name: "magchoa" },
  { githubLogin: "@magchob", name: "magchob" },
];

let _id = 0;
const photos = [
  {
    id: "1",
    name: "magcho",
    description: "aaaa",
    category: "PORTRAT",
    githubUser: "@magcho",
  },
  {
    id: "2",
    name: "magcho",
    description: "aaaa",
    category: "PORTRAT",
    githubUser: "@magcho",
  },
  {
    id: "3",
    name: "magchob",
    description: "aaaa",
    category: "PORTRAT",
    githubUser: "@magchob",
  },
];

const resolvers = {
  Query: {
    totalPhotos: () => photos.length,
    allPhotos: () => photos,
    allUsers: () => users,
  },
  Mutation: {
    postPhoto(parent, args) {
      const newPhoto = {
        id: _id++,
        ...args.input,
      };
      photos.push(newPhoto);
      return newPhoto;
    },
  },
  Photo: {
    url: (parent) => `http://example.com/${parent.id}.jpg`,
    postedBy: (parent) => {
      return users.filter((user) => user.githubLogin === parent.githubUser);
    },
  },
  User: {
    postedPhotos: (parent) => {
      return photos.filter((photo) => photo.githubUser === parent.githubLogin);
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`GraphQL service running on ${url}`);
});
