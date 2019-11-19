const { GraphQLServer } = require('graphql-yoga');
const { prisma } = require('./generated/prisma-client');
const session = require('express-session');
const ms = require('ms');

const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const User = require('./resolvers/User')
const Mailbox = require('./resolvers/Mailbox')

const resolvers = {
  Query,
  Mutation,
  User,
  Mailbox
}
// 3
const server = new GraphQLServer({
  typeDefs: './src/schemas/schema.graphql',
  resolvers,
  context: req => {
    return { 
      ...req,
      session: req.request.session,
      sessionStore: req.request.sessionStore,
      prisma
    };
  }
});

server.express.use(session({
  name: "buddy-auth-token",
  secret: "wowee",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    maxAge: ms("1d")
  }
}))

server.start(() => console.log(`Server is running on http://localhost:4000`))
