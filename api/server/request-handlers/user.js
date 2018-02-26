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
    // should be excluded drawings which are submited to competitions if competitions are not finished
    const users = await User.findAll({ limit, offset, attributes: ['id', 'username'], include: [{ model: Drawing, order: [['id', 'DESC']], limit: 1, offset: 0 }], order: [['id', 'DESC']] });
    res.send({ code: "Success", data: users });
    return next();
}

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
    // should be excluded drawings which are submited to competitions if competitions are not finished
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

module.exports.list = list;
module.exports.getUserById = getUserById;
module.exports.getUserGallery = getUserGallery;