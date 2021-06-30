const { response } = require("express");
const express = require("express");
const router = express.Router();

const commentRoutes = (db) => {
  router.get("/:id", (req, res) => {
    const cookie = req.cookies.user_id;
    if (!cookie) {
      res.redirect("/login");
    }
    let query = `
    SELECT * FROM comments
    WHERE resource_id = $1;`;
    db.query(query, [req.params.id])
      .then((response) => {
        console.log(response.rows);
        templateVars = { comments: response.rows };
        res.render("comments", templateVars);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.post("/", (req, res) => {
    const cookie = req.cookies.user_id;
    if (!cookie) {
      res.redirect("/login");
    }

    let query = `
      INSERT INTO comments (resource_id, user_id, comment)
      VALUES ($1, $2, $3);`;
    console.log(query, req.cookies.user_id);
    db.query(query, [req.body.res_id, req.body.u_id, req.body.comments]).then(
      (response) => {
        res.redirect(`/resources/comments/${req.body.res_id}`);
      }
    );
  });

  return router;
};

module.exports = commentRoutes;
