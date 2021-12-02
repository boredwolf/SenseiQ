const queueRouter = require('./queue')

const setUpRoutes = (app) => {
  app.use('/queue' , queueRouter)

}

module.exports = {
    setUpRoutes,
}
