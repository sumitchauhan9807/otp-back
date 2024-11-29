const UserRouter = require('./app/User/router')
const adminRouterOnboarding = require('./app/Admin/OnboardingRouter')
const adminRouter = require('./app/Admin/router')
const adminAuthMiddleware = require("./middlewares/adminAuth")

exports.initUserRoutes = (app) =>{
  app.use("/user",UserRouter)
  app.use("/admin",adminRouterOnboarding)
  app.use("/admin/*", adminAuthMiddleware);
  app.use("/admin",adminRouter)

} 