const loginController = require('../controller/loginController');
const routeLogin = require("express").Router();


routeLogin.post("/auth", loginController.loginId);

module.exports=routeLogin