const Drawing = require('../database-setup').Drawing;
const errs = require('restify-errors');


async function list(req, res, next) {
    const drawings = await Drawing.findAll();
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

module.exports.list = list;
module.exports.create = create;
module.exports.update = update;
module.exports.delete = deleteItem;
