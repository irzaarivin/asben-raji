(async () => {

    // DECLARE EXPRESSJS
    const config = require('./src/infrastructure/config/config')
    const express = require('express')
    const session = require('express-session')
    const app = express()
    const bodyParser = require('body-parser')
    const jwt = require('jsonwebtoken')
    const SECRET_KEY = config.secret
    const http = require('http')
    const server = http.createServer(app)
    const cors = require('cors')
    const port = config.port || 4444
    const { initSocket, listenToSocketEvents, emitSocketEvent } = require("./src/app/utils/socket")


    // ======================================================================== //
    // ======================================================================== //

    
    // SERVER CONFIG
    app.use(session({ secret: config.secret, resave: true, saveUninitialized: true }))
    app.use(cors({ origin: config.origin }))
    console.log(config.origin)
    // app.use(cors({ origin: false }))
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(express.json());



    // ======================================================================== //
    // ======================================================================== //


    // DATABASE CONFIG
    const { sequelize, Sequelize, Model, DataTypes, mongoose, redis } = require('./src/infrastructure/databases/index')

    // SOURCE FILE CONFIG
    const { model, repository, handler, controller, middlewares, helpers, routes, socket } = require('./src/interchange')

    // MODELS
    const models = await model({ Sequelize, sequelize, Model, DataTypes, mongoose })

    // REPOSITORIES
    const repositories = await repository(models)

    // HANDLERS
    const handlers = await handler({ repositories, helpers, emitSocketEvent, redis })

    // CONTROLLERS
    const controllers = await controller(handlers)


    // ======================================================================== //
    // ======================================================================== //


    // INIT WEBSOCKET
    initSocket(server);
    listenToSocketEvents(socket, controllers, middlewares);


    // ======================================================================== //
    // ======================================================================== //


    // RUNNING SERVER
    await routes(app, controllers, middlewares)

    server.listen(port, () => {
        console.log('Server is running on port', port)
    })

})()
