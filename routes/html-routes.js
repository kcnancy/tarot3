const path = require("path");
const express = require("express");
const router = express.Router();

// Create all our routes and set up logic within those routes where required.
router.get("/", (req, res) => {
  tarot.all(function (data) {
    const obj = {
      tarot: data,
    };
    console.log(obj);
    res.render("index", obj);
  });
});

//to create a new reading in db
router.post("/api/tarot", function (req, res) {
  console.log(res.body);
  tarot.create(
    ["title", "body", "createdAt"],
    [req.body.title, body, createdAt],
    function (result) {
      console.log(result);
      //sends back id of new burger
      res.json({ id: result.insertId });
    }
  );
});

router.delete("/api/tarot/:id", function (req, res) {
  const condition = `id = ${req.params.id}`;

  tarot.delete(condition, function (result) {
    if (result.affectedRows === 0) {
      return res.status(404).end();
    }
    res.status(200).end();
  });
});
//export to server.js
module.exports = router;
