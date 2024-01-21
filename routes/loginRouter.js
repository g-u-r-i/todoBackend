const loginController = require('../controller/loginController');
const routeLogin = require("express").Router();


routeLogin.get("/auth", loginController.loginId);
routeLogin.post("/signup", loginController.signup);


module.exports=routeLogin