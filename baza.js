const Sequelize = require("sequelize");
const sequelize = new Sequelize("wt2118667", "root", "root", {
    host: "baza_podataka", //localhost
    dialect: "mysql",
    port: "3306",
    logging:false
});

//imenik = require('./imenik.js')(sequelize);

module.exports = sequelize;
