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
const logout = function (token) {
    return axios({
        method: 'post',
        url: API_ENDPOINT + '/logout',
        headers: {
            'X-Auth-Token': token
        }
    });
};

export {
    register,
    login,
    logout
};