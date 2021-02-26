const authMiddleware = require('../middlewares/auth.middleware')

module.exports = (app) => {
    const user = require('../controllers/user.controller')
    const auth = require('../middlewares/auth.middleware')
    app.post('/register', user.register)
    app.post('/login', user.login)
    app.get('/auth', auth.authenticateToken, user.authenticate)
    app.get('/users', auth.authenticateToken, user.users)
}