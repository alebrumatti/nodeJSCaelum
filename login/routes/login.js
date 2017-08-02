module.exports = (app) => {
  const loginController = new app.controllers.loginController(app)

  app.get('/login/:token', loginController.buscaPorToken.bind(loginController))
}
