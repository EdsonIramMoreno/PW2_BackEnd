const visit = require("../controllers/visit_controller");
  
var router = require("express").Router();

// Create a new Tutorial
router.get("/", visit.findAll);

router.post("/visitCount", visit.visitCount);


module.exports = router;