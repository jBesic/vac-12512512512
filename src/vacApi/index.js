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
            startDate: data.startDate,
            endDate: data.endDate,
            votingStartDate: data.votingStartDate,
            votingEndDate: data.votingEndDate,
        }
    });
};

const loadCompetitions = function () {
    return axios({
        method: 'get',
        url: API_ENDPOINT + '/competition',
        headers: {
            'X-Auth-Token': localStorage.getItem('token')
        }
    });
};

const saveDrawing = function (data) {
    console.log(data);
    return axios({
        method: 'post',
        url: API_ENDPOINT + '/drawing',
        headers: {
            'X-Auth-Token': localStorage.getItem('token')
        },
        data: {
            name: data.name,
            shapes: data.shapes
        }
    });
};

export {
    register,
    login,
    logout,
    saveCompetition,
    loadCompetitions,
    saveDrawing
};