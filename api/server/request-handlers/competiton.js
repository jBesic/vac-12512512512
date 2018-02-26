const Sequelize = require('sequelize');
const Op = require('sequelize').Op;
const Competition = require('../database-setup').Competition;
const User = require('../database-setup').User;
const Vote = require('../database-setup').Vote;
const Drawing = require('../database-setup').Drawing;
const database = require('../database-setup').database;
const errs = require('restify-errors');

function returnQuery(params) {
    let filter = {};

    if (params.limit) {
        filter.limit = Number.parseInt(params.limit, 10);
    }

    if (params.offset) {
        filter.offset = Number.parseInt(params.offset, 10);
    }

    switch (params.status) {
        case 'draw': {
            if (params.userId) {
                filter = {
                    ...filter,
                    where: {
                        // userId: {
                        //     [Op.ne]: params.userId
                        // },
                        // id: {
                        //     [Op.notIn]: Sequelize.literal('(SELECT `drawing`.`competitionId` FROM `drawings` AS `drawing` WHERE `drawing`.`competitionId` IS NOT NULL AND `drawing`.`userId` = ' + params.userId + ')')
                        // },
                        id: {
                            [Op.notIn]: Sequelize.literal('(SELECT `drawing`.`competitionId` FROM `drawings` AS `drawing` WHERE `drawing`.`competitionId` IS NOT NULL AND `drawing`.`userId` = ' + params.userId + ')')
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
                    ...filter,
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
            filter = {
                ...filter,
                where: {
                    // userId: {
                    //     [Op.ne]: params.userId
                    // },
                    votingStartDate: {
                        [Op.lt]: new Date()
                    },
                    votingEndDate: {
                        [Op.gt]: new Date()
                    }
                }
            };

            return filter;
        }

        case 'joined': {
            filter = {
                ...filter,
                where: {
                    // userId: {
                    //     [Op.ne]: params.userId
                    // },
                    id: {
                        [Op.in]: Sequelize.literal('(SELECT `drawing`.`competitionId` FROM `drawings` AS `drawing` WHERE `drawing`.`userId` = ' + params.userId + ')')
                    },
                }
            };

            return filter;
        }

        case 'own': {
            filter = {
                ...filter,
                where: {
                    userId: {
                        [Op.eq]: params.userId
                    }
                }
            };

            return filter;
        }

        default:
            return {};
    }
}

async function list(req, res, next) {
    const filter = returnQuery({ ...req.params, ...req.query, userId: req.get('userId') });
    const competitions = await Competition.findAll(filter);
    res.send({ code: "Success", data: competitions });
    return next();
}

async function checkVote(req, res, next) {
    const filter = returnQuery({ ...req.params, ...req.query, userId: req.get('userId') });
    const competitions = await Competition.findAll({
        attributes: ['id', 'name'],
        where: {
            votingEndDate: {
                [Op.gt]: Date.now() - 60000,
                [Op.lt]: Date.now()
            }
        }
    });
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
    let offset = (Number)(req.params.offset);
    let limit = (Number)(req.params.limit);
    const competitions = await Competition.findAll({
        limit, offset,
        where: {
            votingStartDate: {
                [Op.lt]: new Date()
            }
        }, include: [Drawing]
    });
    res.send({ code: "Success", data: competitions });
    return next();
}

async function getCompetitionGallery(req, res, next) {
    let competitionId = req.params.id;
    let offset = (Number)(req.params.offset);
    let limit = (Number)(req.params.limit);
    const userId = req.get('userId');
    const competitionData = await Competition.findAll({
        where: { id: competitionId }, include: [{ model: Drawing, limit, offset, include: [{ model: User, attributes: ['id', 'username'] }, { model: Vote }] }]
    });
    let competition = competitionData[0];
    let currentDate = new Date();
    let votingStartDate = new Date(competition.votingStartDate);
    let votingEndDate = new Date(competition.votingEndDate);
    if (currentDate < votingStartDate && competition.userId === userId) {
        competition.dataValues.action = 'VIEW';
    } else if (currentDate >= votingStartDate && currentDate < votingEndDate) {
        competition.dataValues.action = 'VOTE';
    } else if (currentDate > votingEndDate) {
        competition.dataValues.action = 'VIEW';
    } else {
        competition.dataValues.action = 'NOT-ALLOWED';
    }

    competition.dataValues.loggedUserId = userId;
    res.send({ code: "Success", data: competition });
    return next();
}

async function getCompetitionsInVotePhase(req, res, next) {
    let offset = (Number)(req.params.offset);
    let limit = (Number)(req.params.limit);
    const competitions = await Competition.findAll({
        limit, offset,
        where: {
            votingStartDate: {
                [Op.lt]: new Date()
            },
            votingEndDate: {
                [Op.gt]: new Date()
            }
        }, include: [{ model: Drawing }]
    });
    res.send({ code: "Success", data: competitions });
    return next();
}


module.exports.list = list;
module.exports.checkVote = checkVote;
module.exports.create = create;
module.exports.update = update;
module.exports.delete = deleteItem;
module.exports.getCompetitions = getCompetitions;
module.exports.getCompetitionGallery = getCompetitionGallery;
module.exports.getCompetitionGallery = getCompetitionGallery;
module.exports.getCompetitionsInVotePhase = getCompetitionsInVotePhase;
