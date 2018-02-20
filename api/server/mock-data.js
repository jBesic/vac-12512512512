module.exports.mockUserData = async function mockUserData(UserModel) {
    await UserModel.bulkCreate([
    ]);
}

module.exports.mockDrawingData = async function mockDrawingData(DrawingModel) {
    await DrawingModel.bulkCreate([]);
}

module.exports.mockVoteData = async function mockVoteData(VoteModel) {
    await VoteModel.bulkCreate([]);
}

module.exports.mockCompetitionData = async function mockCompetitionData(CompetitionModel) {
    await CompetitionModel.bulkCreate([]);
}