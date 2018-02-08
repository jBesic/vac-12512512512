module.exports.mockUserData = async function mockUserData(UserModel) {
    await UserModel.bulkCreate([
        { username: 'jasmin', password: '$2a$05$WzNbIlzo61Z4WYNF9iGCt..Si0lMROktFy/00Sixvw1.SPs4ZWsXO' },
        { username: 'amer', password: '$2a$05$cry3mTvx/RZjfSHhBr6GMu/RcF3YUIykwqqWchnRbxHr1M61sS8wm' },
        { username: 'vlad', password: '$2a$05$xE/5paGuY2IzMxcp2M.T/ug3FnRrNXdmJYovO3Qrb06KZGWX3P.ny' },
    ]);
}

module.exports.mockDrawingData = async function mockDrawingData(DrawingModel) {
    await DrawingModel.bulkCreate([
        { name: 'Drawing01', topic: 'random 01', userId: 1, shapes: [] },
        { name: 'Drawing02', topic: 'random 02', userId: 2, shapes: [{foo:1}] },
        { name: 'Drawing03', topic: 'random 03', userId: 3 },
    ]);
}