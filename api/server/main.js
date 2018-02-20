const restify = require('restify');
const corsMiddleware = require('restify-cors-middleware');

// REQUEST HANDLERS IMPORT
const AuthHandlers = require('./request-handlers/auth');
const DrawingHandlers = require('./request-handlers/drawing');
const CompetitionHandlers = require('./request-handlers/competiton');
const UserHandlers = require('./request-handlers/user');
const VotingHandlers = require('./request-handlers/vote');

// SERVER SETUP
const cors = corsMiddleware({
    origins: ['*'],
    allowHeaders: ['content-type', 'x-auth-token']
});

const server = restify.createServer({ name: 'vac-api' })
    .pre(cors.preflight)
    .pre(restify.plugins.pre.dedupeSlashes())
    .pre(restify.plugins.pre.context())
    .use(cors.actual)
    .use(restify.plugins.bodyParser({ mapParams: true }))
    .use(restify.plugins.queryParser({ mapParams: true }))
    .use(restify.plugins.gzipResponse())
    .use(AuthHandlers.authFilter); // AUTH CHECK


// LOGIN, LOGOUT AND REGISTER
server.post('/register', AuthHandlers.register);
server.post('/login', AuthHandlers.login);
server.post('/logout', AuthHandlers.logout);

// DRAWING
server.head('/drawing', DrawingHandlers.list);
server.get('/drawing', DrawingHandlers.list);
server.post('/drawing', DrawingHandlers.create);
server.put('/drawing/:id', DrawingHandlers.update);
server.del('/drawing/:id', DrawingHandlers.delete);
server.get('/getDrawingsByUserId/:userId/:offset/:limit', DrawingHandlers.getDrawingsByUserId);
server.get('/getDrawingsByCompetitionId/:competitionId/:offset/:limit', DrawingHandlers.getDrawingsByCompetitionId); 

// COMPETITION
server.head('/competition/:status', CompetitionHandlers.list);
server.get('/competition/:status', CompetitionHandlers.list);
server.post('/competition', CompetitionHandlers.create);
server.put('/competition/:id', CompetitionHandlers.update);
server.del('/competition/:id', CompetitionHandlers.delete);
server.get('/competition/:offset/:limit', CompetitionHandlers.getCompetitions);
server.get('/competition/:id', CompetitionHandlers.getCompetitionById);

// VOTE
server.post('/vote', VotingHandlers.create);
server.del('/vote/:drawingId', VotingHandlers.delete);


// USER
server.get('/user/:id', UserHandlers.getUserById);
server.head('/user/:offset/:limit', UserHandlers.list);
server.get('/user/:offset/:limit', UserHandlers.list);

// INIT SERVER
server.listen(8080, () => console.log('%s listening at %s', server.name, server.url));
