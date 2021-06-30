const { response } = require("express");
const express = require("express");
const router = express.Router();

const resourceRoutes = (db) => {
  router.get("/", (req, res) => {
    let query = `SELECT * FROM resources`;
    console.log(query);
    console.log(req.body);
    db.query(query)
      .then((response) => {
        templateVars = { resources: response.rows };
        res.render("index", templateVars);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.get("/myresources", (req, res) => {
    const cookie = req.cookies.user_id;
    if (!cookie) {
      res.redirect("/login");
      return;
    }

    let query = `
    SELECT resources.id, title, description, category, resource, likes.resource_id AS likesId
    FROM resources
    LEFT JOIN likes ON resources.id = likes.resource_id
    WHERE resources.user_id = $1 OR likes.user_id = $2;`;

    db.query(query, [cookie, cookie]).then((response) => {
      templateVars = { resources: response.rows };
      res.render("my_resources", templateVars);
    });
  });
  router.get("/createresource", (req, res) => {
    const cookie = req.cookies.user_id;
    if (!cookie) {
      res.redirect("/login");
      return;
    }

    res.render("create_resource");
  });
  //
  router.post("/myresources", (req, res) => {
    const cookie = req.cookies.user_id;
    if (!cookie) {
      res.redirect("/login");
    }
    let query = `
      INSERT INTO resources (title, description, category, resource, user_id)
      VALUES ($1, $2, $3, $4, $5);`;
    const createSubmit = req.body;
    db.query(query, [
      createSubmit.title,
      createSubmit.description,
      createSubmit.category,
      createSubmit.resource,
      req.cookies.user_id,
    ]).then((response) => {
      const resources = response.rows[0];
      res.redirect("/resources/myresources");
    });
  });

  return router;
};

module.exports = resourceRoutes;
