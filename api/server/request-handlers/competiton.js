const Sequelize = require('sequelize');
const Op = require('sequelize').Op;
const Competition = require('../database-setup').Competition;
const User = require('../database-setup').User;
const Drawing = require('../database-setup').Drawing;
const database = require('../database-setup').database;
const errs = require('restify-errors');

function returnQuery(params) {
    switch (params.status) {
        case 'draw': {
            return {
                where: {
                    userId: {
                        [Op.ne]: params.userId
                    },
                    startDate: {
                        [Op.lt]: new Date()
                    },
                    votingStartDate: {
                        [Op.gt]: new Date()
                    }
                },
                include: [{
                    model: Drawing,
                    required: false,
                    where: {
                        competitionId: {
                            [Op.eq]: null
                        }
                    }
                }]
            };
        }

        case 'vote': {
            return {
                where: {
                    userId: {
                        [Op.ne]: params.userId
                    },
                    votingStartDate: {
                        [Op.lt]: new Date()
                    },
                    votingEndDate: {
                        [Op.gt]: new Date()
                    }
                }
            };
        }

        case 'joined': {
            return {
                where: {
                    userId: {
                        [Op.ne]: params.userId
                    },
                    votingStartDate: {
                        [Op.lt]: new Date()
                    },
                    id: {
                        [Op.eq]: Sequelize.col('drawings.competitionId')
                    }
                },
                include: [{
                    model: Drawing,
                    required: false,
                    where: {
                        competitionId: {
                            [Op.ne]: null
                        }
                    }
                }]
            };
        }

        case 'own': {
            return {
                where: {
                    userId: {
                        [Op.eq]: params.userId
                    }
                }
            };
        }

        default:
            return {};
    }
}

async function list(req, res, next) {
    const filter = returnQuery({ ...req.params, userId: req.get('userId') });
    const competitions = await Competition.findAll(filter);
    console.log(competitions.length)
    res.send({ code: "Success", data: competitions });
    return next();
}

async function create(req, res, next) {
    const userId = req.get('userId');
    const newCompetition = { ...req.body, userId };
    const competition = await Competition.create(newCompetition);
    res.send({ code: 'Success', data: competition });
    return next();
}

async function update(req, res, next) {
    const userId = req.get('userId');
    const competitionID = req.params.id;
    const updatedCompetitionData = {
        ...req.body
    };

    const updatedCompetition = await Competition.update(updatedCompetitionData, {
        where: { id: competitionID, userId }
    });

    res.send({ code: 'Success', data: updatedCompetition });
    return next();
}

async function deleteItem(req, res, next) {
    const userId = req.get('userId');
    const competitionID = req.params.id;

    const resData = await Competition.destroy({
        where: { id: competitionID, userId }
    });

    res.send({ code: 'Success', data: resData });
    return next();
}

async function getCompetitions(req, res, next) {
    let offset = req.params.offset;
    let limit = req.params.limit;
    const competitions = await Competition.findAll({include:[{model: Drawing}], limit, offset});
    res.send({ code: "Success", data: competitions });
    return next();
}

async function getCompetitionById(req, res, next) {
    let competitionId = req.params.id;
    const competition = await Competition.findAll({where: {id: competitionId}});
    res.send({ code: "Success", data: competition[0] });
    return next();
}


module.exports.list = list;
module.exports.create = create;
module.exports.update = update;
module.exports.delete = deleteItem;
module.exports.getCompetitions = getCompetitions;
module.exports.getCompetitionById = getCompetitionById;
