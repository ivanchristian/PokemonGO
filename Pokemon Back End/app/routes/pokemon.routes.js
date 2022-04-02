module.exports = app => {
    const pokemon = require("../controllers/pokemon.controller");

    var router = require("express").Router();

    router.post("/", pokemon.create);
    router.get("/", pokemon.findAll);
    router.put("/:id", pokemon.update);
    router.delete("/:id", pokemon.delete);
    router.get("/:id", pokemon.findOne);

    app.use('/api/pokemon', router);
}