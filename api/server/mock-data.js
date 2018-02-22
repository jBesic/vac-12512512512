module.exports.mockUserData = async function mockUserData(UserModel) {
    await UserModel.bulkCreate([
        { username: 'jasmin', password: '$2a$05$WzNbIlzo61Z4WYNF9iGCt..Si0lMROktFy/00Sixvw1.SPs4ZWsXO' },
        { username: 'amer', password: '$2a$05$cry3mTvx/RZjfSHhBr6GMu/RcF3YUIykwqqWchnRbxHr1M61sS8wm' },
        { username: 'vlad', password: '$2a$05$xE/5paGuY2IzMxcp2M.T/ug3FnRrNXdmJYovO3Qrb06KZGWX3P.ny' },
    ]);
}

module.exports.mockDrawingData = async function mockDrawingData(DrawingModel) {
    await DrawingModel.bulkCreate([/* 
        { name: 'Drawing01 C1', competitionId: 1, userId: 1, shapes: [] },
        { name: 'Drawing02 C1', competitionId: 1, userId: 2, shapes: [{ foo: 1 }] },
        { name: 'Drawing03 C1', competitionId: 1, userId: 3 },
        { name: 'Drawing01 C2', competitionId: 2, userId: 1, shapes: [] },
        { name: 'Drawing02 C2', competitionId: 2, userId: 2, shapes: [{ foo: 1 }] },
        { name: 'Drawing03 C2', competitionId: 2, userId: 3 }, */
    ]);
}

module.exports.mockVoteData = async function mockVoteData(VoteModel) {
    await VoteModel.bulkCreate([
        { userId: 1, drawingId: 1, value: 1 },
        { userId: 1, drawingId: 2, value: 2 },
        { userId: 1, drawingId: 3, value: 3 },
        { userId: 1, drawingId: 4, value: 3 },
        { userId: 2, drawingId: 1, value: 1 },
        { userId: 3, drawingId: 1, value: 3 },
    ]);
}

module.exports.mockCompetitionData = async function mockCompetitionData(CompetitionModel) {
     await CompetitionModel.bulkCreate([
        
    ]);}