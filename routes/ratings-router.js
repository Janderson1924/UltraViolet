const { response } = require("express");
const express = require("express");
const router = express.Router();

const rateRoutes = (db) => {
  router.post("/", (req, res) => {
    console.log(req.body);
    const cookie = req.cookies.user_id;
    if (!cookie) {
      res.redirect("/login");
      return;
    }

    let query = `
      INSERT INTO ratings (rating, resource_id, user_id)
      VALUES ($1, $2, $3)
      ;`;

    db.query(query, [
      req.body.rating,
      req.body.rate_resource_id,
      req.body.rate_user_id,
    ]).then((response) => {
      console.log(response);
      const resources = response.rows[0];
      res.redirect("/resources");
    });
  });

  router.post("/avg", (req, res) => {
    console.log(req.body);
    const cookie = req.cookies.user_id;
    if (!cookie) {
      res.redirect("/login");
      return;
    }
    console.log(req.body);

    let query = `
      SELECT avg(rating) as avgRatings
      FROM ratings
      WHERE resource_id = $1
      ;`;

    db.query(query, [req.body.id]).then((response) => {
      const resources = response.rows[0];
      res.send(resources);
    });
  });

  return router;
};

module.exports = rateRoutes;
