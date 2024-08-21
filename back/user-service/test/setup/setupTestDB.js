const mongoose = require('mongoose')
const config = require('../../src/config/config')
const logger = require('../../src/config/logger')
const setupTestDB = () => {
    // Se connecter à la base de données avant d'exécuter les tests
    beforeAll(async () => {
        await mongoose.connect(config.mongoose.url).then(() => {
            logger.info('Connected to MongoDB')
        })
          .catch(error =>  {
              logger.info('error when connecting', error)
          })
    } ,30000);

    // Nettoyer la base de données avant chaque test
    beforeEach(async () => {
        await Promise.all(
            Object.values(mongoose.connection.collections).map(async (collection) => collection.deleteMany())
        );
    }, 30000);

    // Se déconnecter de la base de données après avoir exécuté tous les tests
    afterAll(async () => {
        await mongoose.disconnect();
    }, 30000);
};

module.exports = setupTestDB;
