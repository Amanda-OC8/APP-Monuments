module.exports = app => {

  // Base URLS
  app.use('/', require('./index.routes'))
 
  app.use("/activities", require("./activities.routes"))
  app.use('/', require('./auth.routes'))
}