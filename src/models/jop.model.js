const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Jop = sequelize.define("jop", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            defaultValue: 1
        },
        count: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    }, {
        timestamps: false
    });

    return Jop;
};