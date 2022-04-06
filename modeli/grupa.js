const Sequelize = require("sequelize");
const sequelize = require(__dirname+"/../baza");

module.exports = function (sequelize, DataTypes) {
    const Grupa = 
    sequelize.define('Grupa', 
    {
        naziv: Sequelize.STRING
   });
   return Grupa;
};