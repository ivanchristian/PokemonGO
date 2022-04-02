const db = require("../models");
const Pokemon = db.pokemon;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {

    const pokemon = {
        index: req.body.index,
        image: req.body.image,
        name: req.body.name
    };

    Pokemon.create(pokemon)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Pokemon."
            });
        });
};

exports.findAll = (req, res) => {
    Pokemon.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "There is no pokemon."
            });
            // console.log(err);
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
    Pokemon.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Tutorial with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Tutorial with id=" + id
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;
    const pokemonPK = [];
    let poke = '';
    let fibo = 0;
    let list = 0;

    Pokemon.findByPk(id)
        .then(data => {
            if (data) {
                console.log(data);
                console.log(JSON.stringify(data.counter));
                poke = JSON.stringify(data.name).slice(1, -1);
                fibo = JSON.stringify(data.counter);
                function listFibonacci(fibo) {
                    var before = 0;
                    var actual = 1;
                    var next = 1;

                    for (let i = 0; i < fibo; i++) {
                        console.log(fibo)
                        before = actual + next;
                        actual = next
                        next = before
                    }
                }
                list = listFibonacci(fibo);
                poke = poke.concat(list);
                //console.log(listFibonacci(fibo));

            } else {
                res.status(404).send({
                    message: `Cannot find Tutorial with id=${id}.`
                });
            }

            let jsonstring = { name: poke, counter: data.counter + 1 };

            Pokemon.update(jsonstring, {
                where: { id: id }
            })
                .then(num => {
                    if (num == 1) {
                        res.send({
                            message: "Pokemon was updated successfully."
                        });
                    } else {
                        res.send({
                            message: `Cannot update Pokemon with id=${id}. Maybe Tutorial was not found or req.body is empty!`
                        });
                    }
                })
                .catch(err => {
                    res.status(500).send({
                        message: err
                    });
                });
        })
        .catch(err => {
            res.status(500).send({
                message: err
            });
        });
    // let obj = new Object();
    // obj.name = poke;
    // let jsonstring = JSON.stringify(obj);
    // console.log(jsonstring);

};

exports.delete = (req, res) => {
    const id = req.params.id;
    Pokemon.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Pokemon was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Pokemon with id=${id}. Maybe Pokemon was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Pokemon with id=" + id
            });
        });
};
