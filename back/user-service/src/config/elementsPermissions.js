const permissions =  {
    user: ['create', 'read', 'update', 'delete'],
    interface: ['read'],
    patient: ['create', 'read', 'update'],
    ficheSignaletique: ['create', 'update', 'read'],
    actes: ['create', 'update', 'read'],
    forfaitsActes: ['create', 'update', 'read']
    //... la liste doit continuer à voir
}

module.exports = permissions