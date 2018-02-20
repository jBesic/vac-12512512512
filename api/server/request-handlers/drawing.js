const Drawing = require('../database-setup').Drawing;
const Competition = require('../database-setup').Competition;
const User = require('../database-setup').User;
const database = require('../database-setup').database;
const Sequelize = require('sequelize');
const errs = require('restify-errors');


async function list(req, res, next) {
    const drawings = await Drawing.findAll({include: [{model: User, attributes: ['id', 'username']}]});
    res.send({ code: "Success", data: drawings });
    return next();
}

async function create(req, res, next) {
    const userId = req.get('userId');
    const newDrawing = { ...req.body, userId };
    const drawing = await Drawing.create(newDrawing);
    res.send({ code: 'Success', data: drawing });
    return next();
}

async function update(req, res, next) {
    const userId = req.get('userId');
    const drawingID = req.params.id;
    const updatedDrawingData = {
        name: req.body.name,
        shapes: req.body.shapes,
    };

    const updatedDrawing = await Drawing.update(updatedDrawingData, {
        where: { id: drawingID, userId }
    });

    res.send({ code: 'Success', data: updatedDrawing });
    return next();
}

async function deleteItem(req, res, next) {
    const userId = req.get('userId');
    const drawingID = req.params.id;

    const resData = await Drawing.destroy({
        where: { id: drawingID, userId }
    });

    res.send({ code: 'Success', data: resData });
    return next();
}

async function getDrawingsByUserId(req, res, next) {
    let offset = req.params.offset;
    let limit = req.params.limit;
    let userId = req.params.userId;
    const drawings = await Drawing.findAll({where: {userId}, include: [{model: Competition}], limit, offset});
    res.send({ code: "Success", data: drawings });
    return next();
}

async function getDrawingsByCompetitionId(req, res, next) {
    let offset = req.params.offset;
    let limit = req.params.limit;
    let competitionId = req.params.competitionId;
    const drawings = await Drawing.findAll({where: {competitionId}, include: [{model: Competition}], limit, offset});
    res.send({ code: "Success", data: drawings });
    return next();
}

module.exports.list = list;
module.exports.create = create;
module.exports.update = update;
module.exports.delete = deleteItem;
module.exports.getDrawingsByUserId = getDrawingsByUserId;
module.exports.getDrawingsByCompetitionId = getDrawingsByCompetitionId;
