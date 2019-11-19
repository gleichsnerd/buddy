const { prisma } = require('../generated/prisma-client');

function mailboxes(parent) {
    return prisma.user({id: parent.id}).mailboxes()
}

module.exports = {
    mailboxes
}
