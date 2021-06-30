const { response } = require("express");
const express = require("express");
const router = express.Router();

const searchRoutes = (db) => {
  router.post("/", (req, res) => {
    let query = `
    SELECT *
    FROM resources
    WHERE LOWER( category ) LIKE $1
    OR LOWER( description ) LIKE $1;`;
    db.query(query, ["%" + req.body.search.toLowerCase() + "%"])
      .then((response) => {
        templateVars = { resources: response.rows };
        res.render("index", templateVars);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  return router;
};

module.exports = searchRoutes;
