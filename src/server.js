const Hapi = require('@hapi/hapi');
const routes = require('./routes');
require('dotenv').config();
const { testConnection } = require('./db_query');

const init = async () => {
    const server = Hapi.server({
        port: process.env.PORT || 5000,
        host: 'localhost'
    });

    await server.register(require('@hapi/inert'));
    await server.register(require('@hapi/vision'));

    server.route(routes);

    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);

    // ensuring database connection
    testConnection;
}

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();