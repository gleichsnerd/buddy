const { prisma } = require('../generated/prisma-client');

function owner(parent) {
    return prisma.mailbox({id: parent.id}).owner()
}

module.exports = {
    owner
}
