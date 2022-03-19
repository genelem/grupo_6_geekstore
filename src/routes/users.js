const express = require("express");
const router = express.Router();
const multer = require ("multer");
const path = require("path");
const { body } = require ("express-validator");
const usersController = require ("../controllers/usersController");
const guestMiddleware = require("../middlewares/guestMiddleware");

const storage = multer.diskStorage({
    destination:(req, file, cb) => {
        let folder = path.join(__dirname, "../public/img/users");
        cb(null, folder);
    },
    filename: (req, file, cb) => {
        console.log(file)
        let imageName = "profilePicture-" + Date.now() + path.extname(file.originalname);
        cb(null, imageName);
    }
});

const upload = multer ({ storage : storage});

const validateNewUser = [
    body("name").notEmpty().withMessage("Escribí tu nombre completo. Ej. Sheldon Cooper"),
    body("email").isEmail().withMessage("Escribí tu email con un formato válido. Ej. sheldon@uncorreo.com"),
    body("user").notEmpty().withMessage("Crea un nombre de usuario. Ej. SheldonCoop"),
    body("adress").notEmpty().withMessage("Escribí tu dirección. Ej. Calle Big Bang 12"),
    body("city").notEmpty().withMessage("Escribí tu ciudad."),
    body("provincia").notEmpty().withMessage("Escribí tu provincia."),
    body("password").isLength({min:8}).withMessage("La contraseña debe tener al menos 8 caracteres."),
    body("password_confirm").isLength({min:8}).withMessage("La contraseña debe tener al menos 8 caracteres."),
]

const login = [
    body("user").notEmpty().withMessage("Nombre de usuario incorrecto."),
    body("password").isLength({min:8}).withMessage("Contraseña incorrecta."),
]

// Lista de usuarios 
router.get("/", usersController.index);

// Formulario de inicio de sesión
router.get("/login", usersController.login);
// Formulario procesamiento de inicio de sesión
router.post("/login", login, usersController.processLogin);

// Formulario de registro
router.get("/registro", guestMiddleware, usersController.create);
// Envío de formulario de registro
router.post("/registro", upload.single("img"),validateNewUser ,usersController.save);

// Detalle de usuario
router.get("/:id", usersController.detail);

// Formulario de edición de usuarios
router.get("/:id/editar", usersController.edit);
// Envío de formulario de edición de usuarios
router.put("/:id/editar", upload.single("img"), usersController.update);

module.exports = router;