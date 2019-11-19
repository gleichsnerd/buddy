const bcrypt = require("bcryptjs");
const { omit } = require("lodash");

async function signup(parent, args, context, info) {
  const password = await bcrypt.hash(args.password, 10);
  const user = omit(await context.prisma.createUser({ ...args, password }), "password");
  context.session.user = user;

  return user;
}

async function login(parent, args, context, info) {
  const user = await context.prisma.user({ email: args.email });
  if (!user) {
    throw new Error('No such user found')
  }

  const valid = await bcrypt.compare(args.password, user.password)
  if (!valid) {
    throw new Error('Invalid password')
  }

  context.session.user = user

  return user;
}

async function createMailbox(parent, args, context, info) {
  if(!context.session.user) {
    throw new Error("You must be signed in to create a user");
  }

  const mailbox = await context.prisma.createMailbox({ ...args, owner: { connect: { id: context.session.user.id } } });

  return mailbox;
}

module.exports = {
  signup,
  login,
  createMailbox
}
