const media = require("../controllers/media_controller");
  
var router = require("express").Router();

// Create a new Tutorial
router.get("/", media.findAll);

router.post("/mediaCreation", media.mediaCreation);

router.put("/mediaUpdate/:id", media.mediaUpdate);


module.exports = router;