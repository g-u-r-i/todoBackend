const loginController = require('../controller/loginController');
const routeLogin = require("express").Router();


routeLogin.post("/auth", loginController.loginId);
routeLogin.post("/signup", loginController.signup);


module.exports=routeLogin