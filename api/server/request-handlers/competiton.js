const Competition = require('../database-setup').Competition;
const errs = require('restify-errors');


async function list(req, res, next) {
    const userId = req.params.userId;
    const filter = {};

    if (userId) {
        filter.where = {
            userId: userId
        }
    }

    const competitions = await Competition.findAll();
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

module.exports.list = list;
module.exports.create = create;
module.exports.update = update;
module.exports.delete = deleteItem;
