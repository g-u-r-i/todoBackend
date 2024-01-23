const loginController = require('../controller/loginController');
const routeLogin = require("express").Router();

const loginLimiter = require('../middleware/loginLimiter')

routeLogin.get('/auth',loginLimiter, loginController.login)
// routeLogin.get("/auth", loginController.loginId);
routeLogin.post("/signup", loginController.signup);
routeLogin.get("/forgetpassword", loginController.forgetPassword);


module.exports=routeLogin