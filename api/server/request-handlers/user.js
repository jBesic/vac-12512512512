const User = require('../database-setup').User;
const Drawing = require('../database-setup').Drawing;
const Competition = require('../database-setup').Competition;
const database = require('../database-setup').database;
const Sequelize = require('sequelize');
const errs = require('restify-errors');
const Op = require('sequelize').Op;

async function list(req, res, next) {
    let offset = (Number)(req.params.offset);
    let limit = (Number)(req.params.limit);
    const users = await User.findAll({ limit, offset, attributes: ['id', 'username'], include: [{ model: Drawing, where: { competitionId: null }, order: [['id', 'DESC']], limit: 1, offset: 0 }], order: [['id', 'DESC']] });
    res.send({ code: "Success", data: users });
    return next();
}

/* async function list(req, res, next) {
    let offset = (Number)(req.params.offset);
    let limit = (Number)(req.params.limit);
    const queryString = `SELECT u.id, u.username, d.shapes
            FROM users as u
            LEFT JOIN drawings as d
            ON d.userId = u.id
            WHERE d.id = (SELECT MAX(drawings.id) FROM drawings LEFT JOIN competitions ON competitions.id = drawings.competitionId
                          WHERE drawings.competitionId IS NULL OR competitions.votingEndDate < NOW())
            ORDER BY u.id DESC LIMIT ${limit} OFFSET ${offset}`; 
    const users = await database.query(queryString, { type: Sequelize.QueryTypes.SELECT });
    res.send({ code: "Success", data: users });
    return next();
} */

async function getUserById(req, res, next) {
    let userId = req.params.id;
    const user = await User.findAll({ where: { id: userId } });
    res.send({ code: "Success", data: user[0] });
    return next();
}

async function getUserGallery(req, res, next) {
    let userId = req.params.id;
    let offset = (Number)(req.params.offset);
    let limit = (Number)(req.params.limit);
    const userData = await User.findAll({
        attributes: ['id', 'username'],
        where: { id: userId },
        include: [
            {
                model: Drawing, limit, offset, include: [{ model: Competition }]       
            }]
    });
    res.send({ code: "Success", data: userData[0] });
    return next();
}

async function getUserGallery1(req, res, next) {
    let userId = req.params.id;
    let offset = (Number)(req.params.offset);
    let limit = (Number)(req.params.limit);
    const queryString = `SELECT u.id, u.username, GROUP_CONCAT(CONCAT(d.id, ',', d.shapes)) as drawings
            FROM users as u
            LEFT JOIN drawings as d ON d.userId = u.id
            LEFT JOIN competitions as c on c.id = d.competitionId
            WHERE u.id = ${userId} AND (d.competitionId IS NULL OR c.votingEndDate < NOW())
            LIMIT ${limit} OFFSET ${offset}`;
    const user = await database.query(queryString, { type: Sequelize.QueryTypes.SELECT });
    res.send({ code: "Success", data: user[0] });
    return next();
}

module.exports.list = list;
module.exports.getUserById = getUserById;
module.exports.getUserGallery = getUserGallery;