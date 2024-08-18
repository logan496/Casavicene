const mongoose = require('mongoose')
const config = require('../../src/config/config')

const setupTestDB = () => {
    // Se connecter à la base de données avant d'exécuter les tests
    beforeAll(async () => {
        await mongoose.connect(config.mongoose.url)
    });

    // Nettoyer la base de données avant chaque test
    beforeEach(async () => {
        await Promise.all(
            Object.values(mongoose.connection.collections).map(async (collection) => collection.deleteMany())
        );
    });

    // Se déconnecter de la base de données après avoir exécuté tous les tests
    afterAll(async () => {
        await mongoose.disconnect();
    });
};

module.exports = setupTestDB;
