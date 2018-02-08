const Sequelize = require('sequelize');
const dataPopulators = require('./mock-data');

const FORCE_RECREATE_MODELS = true;

const database = new Sequelize('vector_art_champions', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    // dialect: 'sqlite',
    // storage: './server/database.sqlite',
    pool: { max: 5, min: 0, acquire: 30000, idle: 10000 },
    operatorsAliases: false
});

// Model definition
const User = database.define('user', {
    username: Sequelize.STRING,
    password: Sequelize.STRING,
    authToken: Sequelize.STRING
});

const Competition = database.define('competition', {
    name: Sequelize.STRING,
    topic: Sequelize.STRING,
    shapes: Sequelize.JSON,
    startDate: Sequelize.DATE,
    endDate: Sequelize.DATE,
    votingStartDate: Sequelize.DATE,
    votingEndDate: Sequelize.DATE,
    createdBy: {
        type: Sequelize.INTEGER,
        references: { model: User, key: 'id' }
    }
});

const Drawing = database.define('drawing', {
    name: Sequelize.STRING,
    shapes: Sequelize.JSON,
    userId: {
        type: Sequelize.INTEGER,
        references: { model: User, key: 'id' }
    }
});

// INIT DB ENTITY MODELS
(async function () {
    // Drop tables in order to avoid foregin key constrint issues
    if (FORCE_RECREATE_MODELS) {
        Drawing.drop();
        Competition.drop();
        User.drop();
    }
    // Sync models
    await User.sync({ force: FORCE_RECREATE_MODELS });
    await Competition.sync({ force: FORCE_RECREATE_MODELS });
    await Drawing.sync({ force: FORCE_RECREATE_MODELS });
    // repopulate the db with predefiend data
    if (FORCE_RECREATE_MODELS) {
        dataPopulators.mockUserData(User);
        dataPopulators.mockDrawingData(Drawing);
    }
})();

module.exports.User = User;
module.exports.Drawing = Drawing;
module.exports.database = database;