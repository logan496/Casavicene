// const RBAC = require('rbac').default
const Permissions = require('./elementsPermissions')

const roles = ['admin', 'medecin', 'infirm', 'user']

const grants = {
    //ajouter le reste plus tard
    admin: [
        'user:create', 'user:read', 'user:update', 'user:delete'
    ],
    //globalement il doit accéder aux interfaces médécins
    med: [
        'patient:read', 'interface:read'
    ],
    infirm: [
        'ficheSignaletique:create', 'ficheSignaletique:read', 'ficheSignaletique:update', 'patient:create',
        'patient:read', 'patient:update', 'acte:create', 'acte:update', 'acte:read', 'forfaitActe:create',
        'forfaitActe:update', 'forfaitActe:read'
    ],
    //ceci est une rôle de test et est attribuer aux développeurs
    user: []
}

// const rbac = new RBAC({roles, Permissions, grants})

// module.exports =  rbac
module.exports = {
    roles,
    grants
}