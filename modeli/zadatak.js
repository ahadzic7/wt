const Sequelize = require("sequelize");
const sequelize = require(__dirname+"/../baza");

module.exports = function (sequelize, DataTypes) {
    const Zadatak = 
    sequelize.define('Zadatak', 
    {
        naziv: Sequelize.STRING
   });
   return Zadatak;
};