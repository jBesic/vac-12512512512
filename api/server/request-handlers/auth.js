const User = require('../database-setup').User;
const errs = require('restify-errors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const apiSecret = 'VAC-SOME-TOKEN';

// This will check if the request has valid auth token for all except login and register endpoints
async function authFilter(req, res, next) {
    // skip auth check for login
    if (req.url.match(/(login)|(register)/i)) {
        return next();
    }
    // get auth token and bail instantly if it is not provided
    const authToken = req.headers['x-auth-token'];
    if (!authToken) {
        return next(new errs.UnauthorizedError('Auth token is not provided.'));
    }
    // verify token, throw if verification fails, else pass on the user id
    jwt.verify(authToken, apiSecret, function (err, decoded) {
        if (err) {
            return next(new errs.UnauthorizedError('Invalid auth token'));
        }
        const userId = decoded.userId;
        req.set('userId', userId);
        return next();
    });
}


// This will create a new user with the given username and password and returna a valid authToken
async function register(req, res, next) {
    const plainTextPassword = req.body.password;
    const passwordHash = await bcrypt.hash(plainTextPassword, 5);
    const newUser = {
        username: req.body.username,
        password: passwordHash
    };
    const user = await User.create(newUser);
    const authToken = jwt.sign({ userId: user.id }, apiSecret);
    res.send({ code: 'Success', data: authToken });
    await User.update({ authToken }, { where: { id: user.id } });
    return next();
}


// This will return a new auth token provided correct username and password are provided
async function login(req, res, next) {
    const credentials = { ...req.body };
    const user = await User.findOne({ where: { username: credentials.username } });
    const hashedPassword = user && user.password || '';
    var isPasswordValid = await bcrypt.compare(credentials.password, hashedPassword);

    if (!user || !credentials.password || !isPasswordValid) {
        const err = new errs.UnauthorizedError("Invalid credentials");
        return next(err);
    }

    const authToken = jwt.sign({ userId: user.id, iat: 5000 }, apiSecret);
    await User.update({ authToken }, { where: { id: user.id } });
    res.send({ code: "Success", data: authToken });
    return next();
}


// This will clear out the auth token for the active user
async function logout(req, res, next) {
    const userId = req.get('userId');
    await User.update({ authToken: null }, { where: { id: userId } });
    res.send({ code: "Success", message: "Logged out" });
    return next();
}


module.exports.authFilter = authFilter;
module.exports.register = register;
module.exports.login = login;
module.exports.logout = logout;
