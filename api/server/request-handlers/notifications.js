const Notification = require('../database-setup').Notification;
const Competition = require('../database-setup').Competition;
const database = require('../database-setup').database;
const Sequelize = require('sequelize');
const errs = require('restify-errors');
const Op = require('sequelize').Op;


async function getUserNotifications(req, res, next) {
    const userId = req.get('userId');
    const notifications = await Notification.findAll({
        where: {
            userId: userId,
            notificationDate: {
                [Op.lt]: new Date()
            }
        }, include: [{ model: Competition }],
        order: [['notificationDate', 'DESC']]
    });
    res.send({ code: "Success", data: notifications });
    return next();
}

async function updateNotifications(req, res, next) {
    const userId = req.get('userId');
    await Notification.update(
        { isDisplayed: true },
        {
            where: {
                isDisplayed: false,
                notificationDate: {
                    [Op.lt]: new Date()
                }
            }
        });

    return getUserNotifications(req, res, next);
}

module.exports.getUserNotifications = getUserNotifications;
module.exports.updateNotifications = updateNotifications;
