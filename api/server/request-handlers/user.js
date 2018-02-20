const User = require('../database-setup').User;
const Drawing = require('../database-setup').Drawing;
const Competition = require('../database-setup').Competition;
const database = require('../database-setup').database;
const Sequelize = require('sequelize');
const errs = require('restify-errors'); 

async function list(req, res, next) {
    let offset = req.params.offset;
    let limit = req.params.limit;
    const users = await User.findAll({attributes: ['id', 'username'], include:[{model: Drawing, include: [{model: Competition}]}], limit, offset});
    res.send({ code: "Success", data: users });
    return next();
}

async function getUserById(req, res, next) {
    let userId = req.params.id;
    const user = await User.findAll({where: {id: userId}});
    res.send({ code: "Success", data: user[0] });
    return next();
}

module.exports.list = list;
module.exports.getUserById = getUserById;