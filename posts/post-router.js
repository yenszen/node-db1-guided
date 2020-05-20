const express = require("express");

// database access using knex
const knex = require("../data/db-config.js");

const router = express.Router();

// router.get("/", (req, res) => {
//   db("posts")
//     .then(posts => {
//       res.json(posts);
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json({ message: "problem with db", error: err });
//     });
// });

router.get("/", async (req, res) => {
  try {
    const posts = await knex("posts");
    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "problem with db", error: err });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await knex("posts").where({ id });
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "problem with db", error: err });
  }
});

router.post("/", async (req, res) => {
  const postData = req.body;

  try {
    const numPosts = await knex.insert(postData);
    res.status(201).json(numPosts);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "problem with db", error: err });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const newPost = req.body;

  try {
    const count = await knex("posts")
      .update(newPost)
      .where({ id }); // note that { id } actually represents { id: "id"} in javascript!

    if (count) {
      res.status(200).json({ updated: count });
    } else {
      res.status(404).json({ message: "invalid id" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "problem with db", error: err });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const count = await knex("posts")
      .del()
      .where({ id });

    if (count) {
      res.status(200).json({ deleted: count });
    } else {
      res.status(404).json({ message: "invalid id" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "problem with db", error: err });
  }
});

module.exports = router;
