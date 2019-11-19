function users(parent, args, context, info) {
    return context.prisma.users();
}

function isAuthenticated(parent, args, context, info) {
    return context.session.user != null;
}

module.exports = {
    users,
    isAuthenticated
}