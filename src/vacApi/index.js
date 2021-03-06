import axios from 'axios';

const API_ENDPOINT = 'http://localhost:8080';

const login = function (username, password) {
    return axios({
        method: 'post',
        url: API_ENDPOINT + '/login',
        data: {
            "username": username,
            "password": password
        }
    });
};
const register = function (username, password) {
    return axios({
        method: 'post',
        url: API_ENDPOINT + '/register',
        data: {
            "username": username,
            "password": password
        }
    });
};
const logout = function () {
    return axios({
        method: 'post',
        url: API_ENDPOINT + '/logout',
        headers: {
            'X-Auth-Token': localStorage.getItem('token')
        }
    });
};

const saveCompetition = function (data) {
    return axios({
        method: (data.id ? 'put' : 'post'),
        url: API_ENDPOINT + '/competition' + (data.id ? '/' + data.id : ''),
        headers: {
            'X-Auth-Token': localStorage.getItem('token')
        },
        data: {
            name: data.name,
            topic: data.topic,
            startDate: new Date(data.startDate),
            endDate: data.endDate,
            votingStartDate: new Date(new Date(data.startDate).getTime() + data.votingStartDate * 60000),
            votingEndDate: new Date(new Date(data.startDate).getTime() + data.votingStartDate * 60000 + data.votingEndDate * 60000)
        }
    }).then(response => {
        const competition = response.data.data;
        if (Array.isArray(competition)) {
            return [
                {
                    ...data
                }
            ];
        }

        return [
            {
                ...competition,
                id: Number.parseInt(competition.id, 10),
                startDate: new Date(competition.startDate),
                votingStartDate: (new Date(competition.votingStartDate) - new Date(competition.startDate)) / 60000,
                votingEndDate: (new Date(competition.votingEndDate) - new Date(competition.votingStartDate)) / 60000,
            }
        ];
    });
};

const loadCompetitions = function (params = {}) {
    const query = Object.keys(params).reduce((accumulator, current) => {
        accumulator = accumulator === '' ? '?' : accumulator += '&';
        return accumulator + current + '=' + params[current];
    }, '');

    return axios({
        method: 'get',
        url: API_ENDPOINT + '/competition' + query,
        headers: {
            'X-Auth-Token': localStorage.getItem('token')
        }
    }).then(response => {
        const data = response.data.data;
        const competitions = Object.keys(data).map(objectKey => {
            const competition = data[objectKey];
            let startDate = new Date(competition.startDate);
            return {
                ...competition,
                id: Number.parseInt(competition.id, 10),
                startDate: startDate,
                votingStartDate: (new Date(competition.votingStartDate) - new Date(competition.startDate)) / 60000,
                votingEndDate: (new Date(competition.votingEndDate) - new Date(competition.votingStartDate)) / 60000,
            };
        });

        return competitions;
    });
};

const checkJoinedCompetitions = function () {
    return new Promise((resolve, reject) => {
        // setTimeout(() => {
        //     resolve([
        //         {
        //             competitionName: 'Competition Name 1',
        //             competitionPlace: 15,
        //             drawingName: 'Drawing name 1'
        //         },
        //         {
        //             competitionName: 'Competition Name 2',
        //             competitionPlace: 15,
        //             drawingName: 'Drawing name 2'
        //         },
        //         {
        //             competitionName: 'Competition Name 3',
        //             competitionPlace: 15,
        //             drawingName: 'Drawing name 3'
        //         },
        //         {
        //             competitionName: 'Competition Name 4',
        //             competitionPlace: 15,
        //             drawingName: 'Drawing name 4'
        //         }
        //     ]);
        // }, 1500)
    });
}

const saveDrawing = function (data) {
    return axios({
        method: 'post',
        url: API_ENDPOINT + '/drawing',
        headers: {
            'X-Auth-Token': localStorage.getItem('token')
        },
        data: {
            name: data.name,
            shapes: data.shapes,
            competitionId: data.competitionId
        }
    });
};

const getUsers = function (offset, limit) {
    return axios({
        method: 'get',
        url: API_ENDPOINT + '/user/' + offset + '/' + limit,
        headers: {
            'X-Auth-Token': localStorage.getItem('token')
        }
    }).then(response => {
        const data = response.data.data;
        const users = data.map(item => {
            let drawing = null;
            if (item.drawings.length) {
                drawing = item.drawings[0];
                if (typeof (drawing.shapes) === 'string') {
                    drawing.shapes = JSON.parse(drawing.shapes);
                }
            }
            let user = { id: item.id, username: item.username, drawing: drawing };
            return user;
        });

        return users;
    });
};

const getAllDrawings = function () {
    return axios({
        method: 'get',
        url: API_ENDPOINT + '/drawing',
        headers: {
            'X-Auth-Token': localStorage.getItem('token')
        }
    });
};

const getCompetitions = function (offset, limit) {
    return axios({
        method: 'get',
        url: API_ENDPOINT + '/getCompetitions/' + offset + '/' + limit,
        headers: {
            'X-Auth-Token': localStorage.getItem('token')
        }
    }).then(response => {
        const data = response.data.data;
        const competitions = data.map(item => {
            let drawing = null;
            if (item.drawings.length) {
                drawing = item.drawings[0];
                if (typeof (drawing.shapes) === 'string') {
                    drawing.shapes = JSON.parse(drawing.shapes);
                }
            }
            let competition = { ...item, drawing: drawing };
            return competition;
        });

        return competitions;
    });
};

const getUserGallery = function (data) {
    return axios({
        method: 'get',
        url: API_ENDPOINT + '/getUserGallery/' + data.userId + '/' + data.offset + '/' + data.limit,
        headers: {
            'X-Auth-Token': localStorage.getItem('token')
        }
    }).then(response => {
        const data = response.data.data;
        let competition = { ...data };

        return competition;
    });
};

const getCompetitionGallery = function (data) {
    return axios({
        method: 'get',
        url: API_ENDPOINT + '/getCompetitionGallery/' + data.competitionId + '/' + data.offset + '/' + data.limit,
        headers: {
            'X-Auth-Token': localStorage.getItem('token')
        }
    }).then(response => {
        const data = response.data.data;
        let competition = { ...data };
        let drawings = competition.drawings.map(item => {
            let drawing = { ...item };
            drawing.numberOfPoints = item.votes.length ? item.votes.reduce((accumulator, currentValue) => accumulator + currentValue.value, 0) : 0;
            return drawing;
        });
        competition.drawings = drawings;

        if (competition.action === 'VOTE') {
            competition.drawings.sort(function (a, b) {
                return a.id - b.id;
            });
        } else {
            competition.drawings.sort(function (a, b) {
                return b.numberOfPoints - a.numberOfPoints;
            });
        }

        return competition;
    });
};

const getUserVotesForCompetition = function (competitionId) {
    return axios({
        method: 'get',
        url: 'http://localhost:8080/getUserVotesForCompetition/' + competitionId,
        headers: {
            'X-Auth-Token': localStorage.getItem('token')
        }
    });
};

const saveVote = function (data) {
    return axios({
        method: 'post',
        url: 'http://localhost:8080/vote',
        headers: {
            'X-Auth-Token': localStorage.getItem('token')
        },
        data: {
            drawingId: data.drawingId,
            value: data.value,
            competitionId: data.competitionId
        }
    });
};

const deleteVote = function (data) {
    return axios({
        method: 'get',
        url: 'http://localhost:8080/vote/' + data.drawingId + '/' + data.competitionId,
        headers: {
            'X-Auth-Token': localStorage.getItem('token')
        }
    });
};

const getCompetitionsInVotePhase = function (offset, limit) {
    return axios({
        method: 'get',
        url: API_ENDPOINT + '/getCompetitionsInVotePhase/' + offset + '/' + limit,
        headers: {
            'X-Auth-Token': localStorage.getItem('token')
        }
    });
};

const getUserNotifications = function () {
    return axios({
        method: 'get',
        url: API_ENDPOINT + '/getUserNotifications',
        headers: {
            'X-Auth-Token': localStorage.getItem('token')
        }
    }).then(response => {
        const notifications = response.data.data;
        let numberOfNewNotifications = getNumberOfNewNotifications(notifications);
        return { notifications, numberOfNewNotifications };
    });
};

const updateNotifications = function () {
    return axios({
        method: 'get',
        url: 'http://localhost:8080/updateNotifications',
        headers: {
            'X-Auth-Token': localStorage.getItem('token')
        }
    }).then(response => {
        const notifications = response.data.data;
        let numberOfNewNotifications = getNumberOfNewNotifications(notifications);
        return { notifications, numberOfNewNotifications };
    });
};

export {
    register,
    login,
    logout,
    saveCompetition,
    loadCompetitions,
    saveDrawing,
    getUsers,
    getAllDrawings,
    getCompetitions,
    getUserGallery,
    getCompetitionGallery,
    getUserVotesForCompetition,
    saveVote,
    deleteVote,
    checkJoinedCompetitions,
    getCompetitionsInVotePhase,
    getUserNotifications,
    updateNotifications

};

function getNumberOfNewNotifications(notifications) {
    let numberOfNewNotifications = notifications.length ? notifications.reduce((counter, item) => {
        if (!item.isDisplayed) {
            return ++counter;
        }
        return counter;
    }, 0) : 0;

    return numberOfNewNotifications;
};