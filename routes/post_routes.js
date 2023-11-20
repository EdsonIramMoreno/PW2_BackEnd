const post = require("../controllers/post_controller");
  
var router = require("express").Router();

// Create a new Tutorial
router.get("/", post.findAll);

router.post("/postUpload", post.postUpload);

router.put("/postUpdate/:id", post.postUpdate);


module.exports = router;