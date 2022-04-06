const Sequelize = require("sequelize");
const sequelize = new Sequelize("wt2118667", "root", "password", {
    host: "localhost",
    dialect: "mysql",
    logging:false
});

//imenik = require('./imenik.js')(sequelize);

module.exports = sequelize;