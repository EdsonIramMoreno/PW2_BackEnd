const user = require("../controllers/user_controller");
  
var router = require("express").Router();

// Create a new Tutorial
router.get("/", user.findAll);

router.post("/userLogin", user.userLogin);

router.post("/userRegister", user.userRegister);


module.exports = router;