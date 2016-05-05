var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).json({
    sequence: "tctgcctcgttccatcggaagtgctatcatgggt",
    sequenceLength: 34,
    features: [
      {name: "Restriction Site 1", index: 5},
      {name: "Promoter2", index: 26},
      {name: "Promoter1", index: 9},
      {name: "CDS", index: 21},
      {name: "Promoter2", index: 5},
      {name: "CDS2", index: 29},
      {name: "Promoter1", index: 30},
      {name: "Promoter1", index: 0},
      {name: "CDS2", index: 16}
    ]
  });
});

module.exports = router;
