module.exports = (sequelize, Sequelize) => {
    const pokemon = sequelize.define("pokemon", {
        index: {
            type: Sequelize.STRING
        },
        image: {
            type: Sequelize.STRING
        },
        name: {
            type: Sequelize.STRING
        },
        counter: {
            type: Sequelize.INTEGER,
            defaultValue: '0'
        }
    });
    return pokemon;
};