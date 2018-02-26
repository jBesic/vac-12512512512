const Sequelize = require('sequelize');
const dataPopulators = require('./mock-data');

const FORCE_RECREATE_MODELS = false;

const database = new Sequelize('vector_art_champions', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    //dialect: 'sqlite', 
    //storage: './server/database.sqlite',
    pool: { max: 5, min: 0, acquire: 30000, idle: 10000 },
    operatorsAliases: false
});

// Model definition
const User = database.define('user', {
    username: {
        unique: true,
        type: Sequelize.STRING
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
    shapes: Sequelize.JSON,
    userId: {
        type: Sequelize.INTEGER,
        references: { model: User, key: 'id' }
    },
    competitionId: {
        type: Sequelize.INTEGER,
        references: { model: Competition, key: 'id' }
    }
});

const Notification = database.define('notification', {
    type: Sequelize.STRING,
    notificationDate: Sequelize.DATE,
    isDisplayed: {type: Sequelize.TINYINT, defaultValue: 0},
    userId: {
        type: Sequelize.INTEGER,
        references: { model: User, key: 'id' }
    },
    competitionId: {
        type: Sequelize.INTEGER,
        references: { model: Competition, key: 'id' }
    }
});
Notification.belongsTo(Competition, {foreignKey: 'competitionId', targetKey: 'id'});
Drawing.belongsTo(User, {foreignKey: 'userId', targetKey: 'id'});
Drawing.belongsTo(Competition, {foreignKey: 'competitionId', targetKey: 'id', defaultValue: null})
User.hasMany(Drawing);
Competition.hasMany(Drawing);

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

User.hasMany(Competition, {foreignKey: 'userId'});
Competition.hasMany(Drawing, {foreignKey: 'competitionId'});
User.hasMany(Drawing);
User.hasMany(Competition, { foreignKey: 'userId' });
Drawing.belongsTo(User, { foreignKey: 'userId', targetKey: 'id' });
Drawing.belongsTo(Competition, { foreignKey: 'competitionId', targetKey: 'id', defaultValue: null });
Competition.hasMany(Drawing, { foreignKey: 'competitionId' });
User.hasMany(Vote, {foreignKey: 'userId'});
Drawing.hasMany(Vote, {foreignKey: 'drawingId'});
Vote.belongsTo(Drawing, {foreignKey: 'drawingId', targetKey: 'id'});

// INIT DB ENTITY MODELS
(async function () {
    // Drop tables in order to avoid foregin key constrint issues
   /*  if (FORCE_RECREATE_MODELS) {
        await Vote.drop();
        await Drawing.drop();
        await Competition.drop();
        await User.drop();
    } */
    // Sync models
    await User.sync();
    await Competition.sync();
    await Drawing.sync();
    await Vote.sync();
    await Notification.sync();
    // repopulate the db with predefiend data
    if (FORCE_RECREATE_MODELS) {
        //dataPopulators.mockUserData(User);
        //dataPopulators.mockCompetitionData(Competition);
        //dataPopulators.mockDrawingData(Drawing);
        //dataPopulators.mockVoteData(Vote);
    }
})();

module.exports.User = User;
module.exports.Drawing = Drawing;
module.exports.Competition = Competition;
module.exports.Vote = Vote;
module.exports.Notification = Notification;
module.exports.database = database;