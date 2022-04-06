const express = require('express');
const { json } = require('express/lib/response');

const fs = require('fs');
const url = require('url');

const app = express();
const bodyparser = require('body-parser')

const Sequelize = require('sequelize');
const sequelize = require('./baza.js');
const vjezba = require('./modeli/vjezba.js');
const student = require('./modeli/student.js');

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.text());


//sad idu moji modeli
const Vjezba = require("./modeli/vjezba.js")(sequelize);
const Grupa = require("./modeli/grupa.js")(sequelize);
const Zadatak = require("./modeli/zadatak.js")(sequelize);
const Student = require("./modeli/student.js")(sequelize);

Vjezba.hasMany(Zadatak);
Grupa.hasMany(Student);

sequelize.sync( {force : false} );

app.use(express.static('public'));

app.use(express.static(__dirname+'/public/html/'));
app.use(express.static(__dirname+'/public/css/'));
app.use(express.static(__dirname+'/public/js/'));

app.get('/vjezbe', (req, res) => {
    Vjezba.findAll().then((nizVjezbi) => {
        
        const brojVjezbi = nizVjezbi.length;

        Promise.all(nizVjezbi.map(vjezba => {
            return Zadatak.findAll( { where: { VjezbaId: vjezba.id }})
                .then((nizZadataka) => { return nizZadataka.length })
        })
        ).then((result) => {
            const json = { brojVjezbi: brojVjezbi, brojZadataka: result };
            res.send(json);
        });
    })
});

app.post('/vjezbe', (req, res) => {
    let json = req.body;

    if(!provjeraVjezbiObjekta(json, res)) {
        return;
    }

    let stringGreske = provjeraVjezbiSadrzaja(json);
    
    if(stringGreske.length !== 0) {
        let jsonGreske = {
            status:"error",
            data:`Pogrešan parametar ${stringGreske}`
        };
        res.send(jsonGreske);
        return;
    }

    const brojVjezbi = parseInt(json.brojVjezbi);
    const brojZadataka = json.brojZadataka;

    let str = brojVjezbi.toString();

    for(let broj of brojZadataka)
        str += ", " + broj;


    Zadatak.destroy({truncate: { cascade: true, restartIdentity:true }}).then(() => {
        Vjezba.destroy({truncate: { cascade: true, restartIdentity:true }}).then(() => {

            let listaobecanjavjezbi = [];
            let listaobecanjazadataka = [];
            let listaVjezbiZaDodati = [];
            brojZadataka.forEach((br, i) =>{ listaVjezbiZaDodati.push({ naziv: `Vjezba${i+1}`}); });

            Vjezba.bulkCreate(listaVjezbiZaDodati).then((listavjezbi) => {

                for(let i = 0; i < listavjezbi.length; i++) {
                    let vjezba = listavjezbi[i];
                    
                    for(let j = 0; j < brojZadataka[i]; j++) {
                        listaobecanjazadataka.push(
                            Zadatak.create( { naziv:`Zadatak${j+1}` } ).then((zadatak) => {
                                vjezba.addZadatak([zadatak]);
                                return new Promise(function(resolve,reject){ resolve(zadatak);});
                            })
                        );
                    }
                }

                Promise.all(listaobecanjazadataka).then((z) => { res.send(json) })
            })
        })
    });
});

app.post('/student', (req, res) => {
    let json = req.body;
    if(provjeraStudentObjekta(json)) {
       // console.log('Imamo gresku sa jsonom');
        res.send({ status: 'error: poslan je neispravan json' });
        return;
    }

    Student.findAll( { where: { index: json.index }} ).then((studenti) => {
        if(studenti.length != 0) {
            res.send({ status: `Student sa indexom ${json.index} već postoji!` });
            return;
        }

        
        Grupa.findAll( { where: { naziv: json.grupa }} ).then((grupe) => {
            if(grupe.length == 0) {
                Grupa.create({ naziv: json.grupa }).then((grupa) => {
                    Student.create({ ime: json.ime, prezime: json.prezime, index: json.index, grupa: json.grupa})
                        .then((student) =>{
                            grupa.addStudent([student]).then(() => {
                                res.send({ status: "Kreiran student!" })
                            })
                        })
                });
                return;
           }
           let grupa = grupe[0];
           Student.create({ ime: json.ime, prezime: json.prezime, index: json.index, grupa: json.grupa})
                .then((student) =>{
                    grupa.addStudent([student]).then(() => {
                        res.send({ status: "Kreiran student!" })
                    })
                })
        })
    })
})

app.put('/student/:index', (req, res) => {
    let json = req.body;
    let index = req.params.index;

    if(typeof json.grupa === 'undefined') {
        //console.log('Problem sa jsonom');
        res.send({ status:'error: poslan je neispravan json' });
        return;
    }

    Student.findOne({ where: { index: index } }).then((student) => {
        if(student == null) {
            res.send( { status:`${index} ne postoji`} );
            return;
        }
        Grupa.findOne({ where: { naziv: json.grupa } }).then((grupa) => {
            if(grupa != null) {
                student.update({ grupa: json.grupa }).then(() => {
                    grupa.addStudent([student]).then(() => {
                        res.send( {status: `Promjenjena grupa studentu ${index}`} );
                    })
                })
                return;
            }
            Grupa.create({ naziv: json.grupa }).then((novaGrupa) => {
                student.update({ grupa: json.grupa }).then(() => {
                    novaGrupa.addStudent([student]).then(() => {
                        res.send( {status: `Promjenjena grupa studentu ${index}`} );
                    })
                })
            })
        })
    });

})

app.post('/batch/student', (req, res) => {
    let csv = req.body;
    var niz_stringova = csv.toString('utf-8').split(/[\r\n,]/).filter(s => s.length > 0);
    if(niz_stringova.length % 4 != 0) {
        //console.log('Problem s csv nesto fali');
        res.send({ status:'error: poslan je neispravan csv' });
        return;
    }

    let postojeciStudenti = [];
    let dodajStudenti = [];

    Student.findAll().then((sviStudenti) =>  {
        for(let i = 0; i < niz_stringova.length; i += 4) {
            const studentJson = {
                ime:niz_stringova[i],
                prezime:niz_stringova[i+1],
                index:niz_stringova[i+2],
                grupa:niz_stringova[i+3]
            }

            let postoji = false;
            for(let s of sviStudenti) {
                if(s.index === studentJson.index) {
                    postoji = true;
                    postojeciStudenti.push(s);
                    break;
                }
            }
            if(!postoji) {
                let x = dodajStudenti.find((ds) => { return ds.index === studentJson.index })
                if(x == null) 
                    dodajStudenti.push(studentJson);
                else {
                    postojeciStudenti.push(studentJson);
                }
                    
            }
        }

        let dodajGrupe = [];

        Grupa.findAll().then((sveGrupe) => {
            for(let s of dodajStudenti) {
                let nePostoji = true;
                for(let g of sveGrupe) {
                    if(s.grupa == g.naziv) {
                        nePostoji = false;
                        break;
                    }
                }
                if(nePostoji) {
                    dodajGrupe.push({ naziv:s.grupa });
                }
            }
            for(let i = 0; i < dodajGrupe.length; i++) {
                for(let j = i + 1; j < dodajGrupe.length; j++) {
                    if(dodajGrupe[i].naziv === dodajGrupe[j].naziv) {
                        dodajGrupe.splice(j, 1);
                    }
                }
            }

            Grupa.bulkCreate(dodajGrupe).then(() => {
                Grupa.findAll().then((sveGrupeNovo) => {

                    Student.bulkCreate(dodajStudenti).then((dodaniStudenti) => {
                        dodaniStudenti.forEach((s) => {
                            studentovaGrupa = sveGrupeNovo.find((g) => { return g.naziv === s.grupa; });
                            studentovaGrupa.addStudent([s]);
                        });
                        if(postojeciStudenti.length === 0) {
                            res.send({status: `Dodano ${dodaniStudenti.length} studenata!`});
                            return;
                        }
                        let indexi = postojeciStudenti[0].index;
                        for(let i = 1; i < postojeciStudenti.length; i++)
                            indexi += ", " + postojeciStudenti[i].index;
                        res.send({status: `Dodano ${dodaniStudenti.length} studenata, a studenti ${indexi} već postoje!`});

                    })
                })
            })
        })
    })  
})

const port = 3000 | process.env.PORT;

const server = app.listen(port, () => { console.log(`Slusam na portu: ${port}`); });
module.exports = server;

function provjeraVjezbiObjekta(json, res) {
    if(typeof json.brojVjezbi === 'undefined') {
        let jsonGreske = {
            status:"error",
            data:`Pogrešan parametar brojVjezbi`
        };

        res.send(jsonGreske);
        return false;
    }
    else if(typeof json.brojZadataka === 'undefined') {        
        let jsonGreske = {
            status:"error",
            data:`Pogrešan parametar brojZadataka`
        };

        res.send(jsonGreske);
        return false;
    }
    return true;
}

function provjeraVjezbiSadrzaja(json) {
    let stringGreske = "";
    const brojVjezbi = parseInt(json.brojVjezbi);

    if(!(brojVjezbi >= 1 && brojVjezbi <= 15)) {
        if(stringGreske.length == 0) 
            stringGreske = "brojVjezbi"
        else 
            stringGreske += ",brojVjezbi";
    }

    const brojZadataka = json.brojZadataka;

    

    for(let i = 0; i < brojZadataka.length; i++) {
        let broj = parseInt(brojZadataka[i]);
        if(!(broj >= 0 && broj <= 10)) {
            greska = true;
            if(stringGreske.length == 0) 
                stringGreske = "z" + i;
            else 
                stringGreske += ",z" + i;
        }
    }

    if(brojVjezbi != brojZadataka.length) {
        if(stringGreske.length == 0) 
            stringGreske = "brojZadataka"
        else 
            stringGreske += ",brojZadataka";
    }

    return stringGreske.trim();
}

function provjeraStudentObjekta(json) {
    return typeof json.ime === 'undefined' 
        || typeof json.prezime === 'undefined' 
        || typeof json.index === 'undefined' 
        || typeof json.grupa === 'undefined';
}

