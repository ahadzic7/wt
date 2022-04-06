const Sequelize = require("sequelize");
const sequelize = require(__dirname+"/../baza");

module.exports = function (sequelize, DataTypes) {
    const Student = 
    sequelize.define('Student', 
    {
        ime: Sequelize.STRING,
        prezime: Sequelize.STRING,
        index: { 
            type:Sequelize.STRING, 
            unique: true
        },
        grupa: Sequelize.STRING
   });
   return Student;
};
// {ime:string,prezime:string,index:string,grupa:string}

// brojTelefona: {
        //     type: Sequelize.STRING,
        //     validate: {
        //         is: {
        //             args: [/*/[0-9]{3}\/[0-9]{3}\-[0-9]{3}/*/],
        //             msg: "Nije pravilan format broja telefona"
        //         }
        //     }
        // },
        // datumDodavanja: Sequelize.DATE