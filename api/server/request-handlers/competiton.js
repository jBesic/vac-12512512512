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
            let filter = {};

            if (params.userId) {
                filter = {
                    where: {
                        userId: {
                            [Op.ne]: params.userId
                        },
                        id: {
                            [Op.notIn]: Sequelize.literal('(SELECT `drawing`.`competitionId` FROM `drawings` AS `drawing` WHERE `drawing`.`userId` = ' + params.userId + ')')
                        },
                        startDate: {
                            [Op.lt]: new Date()
                        },
                        votingStartDate: {
                            [Op.gt]: new Date()
                        }
                    }
                };
            } else {
                filter = {
                    where: {
                        startDate: {
                            [Op.lt]: new Date()
                        },
                        votingStartDate: {
                            [Op.gt]: new Date()
                        }
                    }
                };
            }

            return filter;
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
                        [Op.in]: Sequelize.literal('(SELECT `drawing`.`competitionId` FROM `drawings` AS `drawing` WHERE `drawing`.`userId` = ' + params.userId + ')')
                    },
                }
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
    let offset = Number.parseInt(req.params.offset, 10);
    let limit = Number.parseInt(req.params.limit, 10);
    const competitions = await Competition.findAll({ include: [{ model: Drawing }], limit, offset });
    res.send({ code: "Success", data: competitions });
    return next();
}

async function getCompetitionById(req, res, next) {
    let competitionId = req.params.id;
    const competition = await Competition.findAll({ where: { id: competitionId } });
    res.send({ code: "Success", data: competition[0] });
    return next();
}


module.exports.list = list;
module.exports.create = create;
module.exports.update = update;
module.exports.delete = deleteItem;
module.exports.getCompetitions = getCompetitions;
module.exports.getCompetitionById = getCompetitionById;
