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

const loadCompetitions = function (status = '') {
    return axios({
        method: 'get',
        url: API_ENDPOINT + '/competition/' + status,
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
    });
};

const getDrawingsByUserId = function (userId, offset, limit) {
    return axios({
        method: 'get',
        url: API_ENDPOINT + '/getDrawingsByUserId/' + userId + '/' + offset + '/' + limit,
        headers: {
            'X-Auth-Token': localStorage.getItem('token')
        }
    });
};

const getDrawingsByCompetitionId = function (competitionId, offset, limit) {
    return axios({
        method: 'get',
        url: API_ENDPOINT + '/getDrawingsByCompetitionId/' + competitionId + '/' + offset + '/' + limit,
        headers: {
            'X-Auth-Token': localStorage.getItem('token')
        }
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
    getDrawingsByUserId,
    getDrawingsByCompetitionId
};