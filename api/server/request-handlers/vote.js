const Vote = require('../database-setup').Vote;
const Drawing = require('../database-setup').Drawing;
const Competition = require('../database-setup').Competition;
const User = require('../database-setup').User;
const database = require('../database-setup').database;
const Sequelize = require('sequelize');
const errs = require('restify-errors');

// expects vote value and drawing id
async function create(req, res, next) {
    const userId = req.get('userId');
    const voteValue = req.body.value;
    const drawingId = req.body.drawingId;
    const competitionId = req.body.competitionId;
    // check if the vote is valid - one user has only 3 votes per competition,
    // and of different values
    const newVote = { drawingId, userId, value: voteValue };
    const vote = await Vote.create(newVote);

    // TODO vote validation
    // getVotesFor(userId)
    return getUserVotesForCompetition(req, res, next, competitionId)

    /* res.send({ code: 'Success', data: vote });
    return next(); */
}

async function deleteItem(req, res, next) {
    const userId = req.get('userId');
    const drawingId = req.params.drawingId;

    const rowsDeleted = await Vote.destroy({
        where: { drawingId, userId }
    });
    // throw if delete rows is 0 or other than 1 - 404

    if (rowsDeleted === 0) {
        return next(new errs.NotFoundError('Cannot find a vote for this drawing for the active user'));
    }

    res.send({ code: 'Success', data: rowsDeleted });
    return next();
}

async function getVotesFor(userId, drawingId) {
    // get the competition ID for the (userId, drawingId) set
    const subQueryString = `SELECT d.competitionId FROM votes as v
        INNER JOIN drawings as d ON v.drawingId = d.id
        WHERE v.drawingId = 1 AND v.userId = 1
        GROUP BY d.competitionId`;
    const queryString = `SELECT votes.value, drawings.competitionId, drawings.id FROM votes
        INNER JOIN drawings ON drawings.id = votes.drawingId
        WHERE votes.userId = :userId AND drawings.competitionId = (${subQueryString})`;
    return await database.query(queryString, { replacements: { userId, drawingId }, raw: true })
        .catch(e => e);
}

async function getUserVotesForCompetition(req, res, next, compId = null) {
    const userId = req.get('userId');
    let competitionId = compId ? compId : req.params.competitionId;
    const votes = await Vote.findAll({where: {userId}, include: [{model: Drawing, where:{competitionId}}]});
    res.send({ code: "Success", data: votes });
    return next();
}

module.exports.create = create;
module.exports.delete = deleteItem;
module.exports.getUserVotesForCompetition = getUserVotesForCompetition;