const social_media = require("../controllers/social_media_controller");
  
var router = require("express").Router();

// Create a new Tutorial
router.get("/", social_media.findAll);

router.post("/social_media_Upload", social_media.social_media_Upload);

router.put("/social_media_Update/:id", social_media.social_media_Update);


module.exports = router;