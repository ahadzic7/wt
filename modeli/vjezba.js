const Sequelize = require("sequelize");
const sequelize = require(__dirname+"/../baza");

module.exports = function (sequelize, DataTypes) {
    const Vjezba = 
    sequelize.define('Vjezba', 
    {
        naziv: Sequelize.STRING
   });
   return Vjezba;
};