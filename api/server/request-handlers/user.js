const User = require('../database-setup').User;
const errs = require('restify-errors');


async function list(req, res, next) {
    let offset = req.params.offset;
    let limit = req.params.limit;
    const users = await User.findAll({ offset, limit, attributes: ['id', 'username']});
    console.log()
    res.send({ code: "Success", data: users });
    return next();
}

module.exports.list = list;