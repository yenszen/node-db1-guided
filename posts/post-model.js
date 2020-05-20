// import a configured instance of knex, then use it below ...
const knex = require("knex");

function getAll() {
  return knex("posts");
}
