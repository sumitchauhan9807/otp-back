const UserRouter = require('./app/User/router')

exports.initUserRoutes = (app) =>{
  app.use("/user",UserRouter)
} 