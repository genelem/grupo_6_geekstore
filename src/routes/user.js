const express = require("express");
const router = express.Router();
const userController = require ("../controllers/userController");


router.get("/register", userController.crear)

router.get("/login", userController.iniciar)

router.get("/register", userController.guardar)



module.exports=router;