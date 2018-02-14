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
        method: 'post',
        url: API_ENDPOINT + '/competition',
        headers: {
            'X-Auth-Token': localStorage.getItem('token')
        },
        data: {
            name: data.competitionName,
            topic: data.competitionTopic,
            startDate: data.startDateTime,
            endDate: data.competitionDuration,
            votingStartDate: data.drawingTime,
            votingEndDate: data.votingTime,            
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
    saveDrawing
};