import { GraphQLScalarType } from "graphql";
import { authorizeWithGithub } from "./auth.js";
const users = [
  { githubLogin: "@magcho", name: "magcho" },
  { githubLogin: "@magchoa", name: "magchoa" },
  { githubLogin: "@magchob", name: "magchob" },
];

let _id = 4;
const photos = [
  {
    id: "1",
    name: "magcho",
    description: "aaaa",
    category: "PORTRAT",
    githubUser: "@magcho",
    created: "2021/11/13",
  },
  {
    id: "2",
    name: "magcho",
    description: "aaaa",
    category: "PORTRAT",
    githubUser: "@magcho",
    created: "2021/11/13",
  },
  {
    id: "3",
    name: "magchob",
    description: "aaaa",
    category: "PORTRAT",
    githubUser: "@magchob",
    created: "2021/11/13",
  },
];

const tags = [
  {
    photoId: "1",
    userId: "@magchoa",
  },
  {
    photoId: "2",
    userId: "@magcho",
  },
  {
    photoId: "2",
    userId: "@magchoa",
  },
  {
    photoId: "2",
    userId: "@magchob",
  },
];

export const resolvers = {
  Query: {
    totalPhotos: (parent, args, { db }) => {
      return db.collection("photos").estimatedDocumentCount();
    },
    allPhotos: (parent, args, { db }) => {
      return db.collection("photos").find().toArray();
    },
    totalUsers: (parent, args, { db }) => {
      return db.collection("users").estimatedDocumentCount();
    },
    allUsers: (parent, args, { db }) => {
      return db.collection("users").find().toArray();
    },
  },
  Mutation: {
    postPhoto(parent, args) {
      const newPhoto = {
        id: _id++,
        ...args.input,
        created: new Date(),
      };
      photos.push(newPhoto);
      return newPhoto;
    },
    async githubAuth(parent, { code }, { db }) {
      let { message, access_token, avatar_url, login, name } =
        await authorizeWithGithub({
          client_id: process.env.C_ID,
          client_secret: process.env.C_SECRET,
          code,
        });

      if (message) {
        throw new Error(message);
      }

      const latestUserInfo = {
        name,
        githubLogin: login,
        githubToken: access_token,
        avator: avatar_url,
      };

      await db.collection("users").replaceOne(
        {
          githubLogin: login,
        },
        latestUserInfo,
        { upsert: true }
      );

      return { user: latestUserInfo, token: access_token };
    },
  },
  Photo: {
    url: (parent) => `http://example.com/${parent.id}.jpg`,
    postedBy: (parent) => {
      return users.filter((user) => user.githubLogin === parent.githubUser);
    },
    taggedUsers: (parent) => {
      return tags
        .filter((tag) => tag.photoId === parent.id)
        .map((tag) => tag.userId)
        .map((userid) => users.find((user) => user.githubLogin === userid));
    },
  },
  User: {
    postedPhotos: (parent) => {
      return photos.filter((photo) => photo.githubUser === parent.githubLogin);
    },
    inPhotos: (parent) => {
      return tags
        .filter((tag) => tag.userId === parent.githubLogin)
        .map((tag) => tag.photoId)
        .map((photoId) => photos.find((photo) => photo.id === photoId));
    },
  },
  DateTime: new GraphQLScalarType({
    name: "DateTime",
    description: "A valid date time value",
    parseValue: (value) => new Date(value),
    serialize: (value) => new Date(value).toISOString(),
    parseLiteral: (ast) => ast.value,
  }),
};
