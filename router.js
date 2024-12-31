const UserRouter = require('./app/User/router')
const adminRouterOnboarding = require('./app/Admin/OnboardingRouter')
const adminRouter = require('./app/Admin/router')
const adminAuthMiddleware = require("./middlewares/adminAuth")
const apiRouter = require('./app/Api/OnboardingRouter')

exports.initUserRoutes = (app) =>{
  app.use("/user",UserRouter)
  app.use("/api",apiRouter)
  app.use("/admin",adminRouterOnboarding)
  app.use("/admin/*", adminAuthMiddleware);
  app.use("/admin",adminRouter)

} 

