module.exports = app => {

  // Base URLS
  app.use("/", require('./index.routes'))
  app.use("/monuments", require("./monuments.routes"))
  app.use("/activities", require("./activities.routes"))
  app.use("/profile", require("./profile.routes"))
  app.use("/", require('./auth.routes'))
  app.use("/api", require('./api.routes.js'))
  app.use("/axios", require("./axios.routes.js"))
}
