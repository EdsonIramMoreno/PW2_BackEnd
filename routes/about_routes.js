const about = require("../controllers/about_controller");
  
var router = require("express").Router();

// Create a new Tutorial
router.get("/", about.find);

router.post("/aboutUpload", about.aboutUpload);

router.put("/aboutUpdate/:id", about.aboutUpdate);


module.exports = router;