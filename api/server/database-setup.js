const Sequelize = require('sequelize');
const dataPopulators = require('./mock-data');

const FORCE_RECREATE_MODELS = false;

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
    username: {
        type: Sequelize.STRING,
        unique: true
    },
    password: Sequelize.STRING,
    authToken: Sequelize.STRING
});

const Competition = database.define('competition', {
    name: Sequelize.STRING,
    topic: Sequelize.STRING,
    startDate: Sequelize.DATE,
    endDate: Sequelize.STRING,
    votingStartDate: Sequelize.DATE,
    votingEndDate: Sequelize.DATE,
    userId: {
        type: Sequelize.INTEGER,
        references: { model: User, key: 'id' }
    }
});

const Drawing = database.define('drawing', {
    name: Sequelize.STRING,
    // shapes: Sequelize.STRING,
    userId: {
        type: Sequelize.INTEGER,
        references: { model: User, key: 'id' }
    },
    competitionId: {
        type: Sequelize.INTEGER,
        references: { model: Competition, key: 'id' }
    }
});

const Vote = database.define('vote', {
    drawingId: {
        type: Sequelize.INTEGER,
        references: { model: Drawing, key: 'id' }
    },
    userId: {
        type: Sequelize.INTEGER,
        references: { model: User, key: 'id' }
    },
    value: Sequelize.TINYINT
});

User.hasMany(Drawing);
User.hasMany(Competition, { foreignKey: 'userId' });
Drawing.belongsTo(User, { foreignKey: 'userId', targetKey: 'id' });
Drawing.belongsTo(Competition, { foreignKey: 'competitionId', targetKey: 'id', defaultValue: null });
Competition.hasMany(Drawing, { foreignKey: 'competitionId' });

// INIT DB ENTITY MODELS
(async function () {
    // Drop tables in order to avoid foregin key constrint issues
    if (FORCE_RECREATE_MODELS) {
        await Vote.drop();
        await Drawing.drop();
        await Competition.drop();
        await User.drop();
    }
    // Sync models
    await User.sync({ force: FORCE_RECREATE_MODELS });
    await Competition.sync({ force: FORCE_RECREATE_MODELS });
    await Drawing.sync({ force: FORCE_RECREATE_MODELS });
    await Vote.sync({ force: FORCE_RECREATE_MODELS });
    // repopulate the db with predefiend data
    if (FORCE_RECREATE_MODELS) {
        dataPopulators.mockUserData(User);
        dataPopulators.mockCompetitionData(Competition);
        dataPopulators.mockDrawingData(Drawing);
        dataPopulators.mockVoteData(Vote);
    }
})();

module.exports.User = User;
module.exports.Drawing = Drawing;
module.exports.Competition = Competition;
module.exports.Vote = Vote;
module.exports.database = database;