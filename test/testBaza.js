const chai = require('chai');
const chaihttp = require('chai-http');
chai.use(chaihttp);
chai.should();
let assert = chai.assert;

const server = require('../index.js');
const Sequelize = require('sequelize');
const sequelize = require('../baza.js');
//const { describe } = require('mocha');

const Vjezba = require("../modeli/vjezba.js")(sequelize);
const Grupa = require("../modeli/grupa.js")(sequelize);
const Zadatak = require("../modeli/zadatak.js")(sequelize);
const Student = require("../modeli/student.js")(sequelize);

Vjezba.hasMany(Zadatak);
Grupa.hasMany(Student);

let studentiBackup = [];
let grupeBackup = [];
let vjezbeBackup = [];
let zadaciBackup = [];

describe('Testovi baze', function() {
    this.timeout(9000);

    this.beforeAll((done) => {
        sequelize.sync().then(() => {
            return Student.findAll()
        }).then((rez) => {
            rez.forEach((s) => {
                studentiBackup.push({ id:s.id, ime:s.ime, prezime:s.prezime, index:s.index, GrupaId:s.GrupaId });
            });
            return Grupa.findAll();
        }).then((rez) => {
            rez.forEach((g) => {
                grupeBackup.push({ id:g.id, naziv:g.naziv });
            });
            return Vjezba.findAll();
        }).then((rez) => {
            rez.forEach((v) => {
                vjezbeBackup.push({ id:v.id, naziv:v.naziv });
            });
            return Zadatak.findAll();
        }).then((rez) => {
            rez.forEach((z) => {
                zadaciBackup.push({ id:z.id, naziv:z.naziv, VjezbaId: z.VjezbaId });
            });
            sequelize.sync({ force:true }).then(() => { done(); });
        });
    });

    this.afterAll((done) => {
        Vjezba.bulkCreate(vjezbeBackup).then(() => {
            return Zadatak.bulkCreate(zadaciBackup);
        }).then(() => {
            return Grupa.bulkCreate(grupeBackup);
        }).then(() => {
            return Student.bulkCreate(studentiBackup);
        }).then(() => {
            done();
        });
    });

    this.afterEach((done) => {
        sequelize.sync( { force:true } ).then(() => { done(); });
    });

    describe('Test POST /student', () => {
        it('1. Test: Dodavanje novog studenta s novom grupom', async () => {
            let student = { ime:"Armin", prezime:"Hadzic", index:"18667", grupa:"Grupa1" };
            let odgovor = await chai.request(server)
                                    .post('/student')
                                    .set('Content-Type', 'application/json')
                                    .send(JSON.stringify(student));

            assert.equal(odgovor.status, 200, 'Greska sa zahtjevom');
            assert.equal(JSON.parse(odgovor.text).status, 'Kreiran student!', 'Status neispravnog jsona');

            let sviStudenti = await Student.findAll();
            assert.equal(sviStudenti.length, 1, 'Pogresan broj studenata u bazi');

            let bazniStudent = sviStudenti[0];
            assert.equal(bazniStudent.ime, student.ime, 'Razlicito ime');
            assert.equal(bazniStudent.prezime, student.prezime, 'Razlicito prezime');
            assert.equal(bazniStudent.index, student.index, 'Razlicit index');

            let sveGrupe = await Grupa.findAll();
            assert.equal(sveGrupe.length, 1, 'Pogresan broj grupa u bazi');
            assert.equal(sveGrupe[0].naziv, student.grupa, 'Razlicita grupa');


        });
        it('2. Test: Dodavanje novog studenta s postojecom grupom', async () => {
            let student1 = { ime:"Armin", prezime:"Hadzic", index:"18667", grupa:"Grupa1" };
            let student2 = { ime:"Muris", prezime:"Sladic", index:"18666", grupa:"Grupa1" };
            let odgovor1 = await chai.request(server)
                                    .post('/student')
                                    .set('Content-Type', 'application/json')
                                    .send(JSON.stringify(student1));

            assert.equal(odgovor1.status, 200, 'Greska sa zahtjevom 1');
            assert.equal(JSON.parse(odgovor1.text).status, 'Kreiran student!', 'Status neispravnog jsona');

            let odgovor2 = await chai.request(server)
                                    .post('/student')
                                    .set('Content-Type', 'application/json')
                                    .send(JSON.stringify(student2));

            assert.equal(odgovor2.status, 200, 'Greska sa zahtjevom 2');
            assert.equal(JSON.parse(odgovor2.text).status, 'Kreiran student!', 'Status neispravnog jsona');


            let sviStudenti = await Student.findAll();
            assert.equal(sviStudenti.length, 2, 'Pogresan broj studenata u bazi');

            let bazniStudent = sviStudenti[1];
            assert.equal(bazniStudent.ime, student2.ime, 'Razlicito ime');
            assert.equal(bazniStudent.prezime, student2.prezime, 'Razlicito prezime');
            assert.equal(bazniStudent.index, student2.index, 'Razlicit index');

            let sveGrupe = await Grupa.findAll();
            assert.equal(sveGrupe.length, 1, 'Pogresan broj grupa u bazi');
            assert.equal(sveGrupe[0].naziv, student1.grupa, 'Razlicita grupa');


        });
        it('3. Test: Dodavanje postojeceg studenta', async () => {
            let student = { ime:"Armin", prezime:"Hadzic", index:"18667", grupa:"Grupa1" };
            let odgovor1 = await chai.request(server)
                                    .post('/student')
                                    .set('Content-Type', 'application/json')
                                    .send(JSON.stringify(student));

            assert.equal(odgovor1.status, 200, 'Greska sa zahtjevom');
            assert.equal(JSON.parse(odgovor1.text).status, 'Kreiran student!', 'Status neispravnog jsona');

            let odgovor2 = await chai.request(server)
                                    .post('/student')
                                    .set('Content-Type', 'application/json')
                                    .send(JSON.stringify(student));

            assert.equal(odgovor2.status, 200, 'Greska sa zahtjevom');
            assert.equal(JSON.parse(odgovor2.text).status, `Student sa indexom ${student.index} već postoji!`, 'Status neispravnog jsona');


            let sviStudenti = await Student.findAll();
            assert.equal(sviStudenti.length, 1, 'Pogresan broj studenata u bazi');

            let bazniStudent = sviStudenti[0];
            assert.equal(bazniStudent.ime, student.ime, 'Razlicito ime');
            assert.equal(bazniStudent.prezime, student.prezime, 'Razlicito prezime');
            assert.equal(bazniStudent.index, student.index, 'Razlicit index');

            let sveGrupe = await Grupa.findAll();
            assert.equal(sveGrupe.length, 1, 'Pogresan broj grupa u bazi');
            assert.equal(sveGrupe[0].naziv, student.grupa, 'Razlicita grupa');


        });
        it('4. Test: Slanje neispravnog json-a', async () => {
            let student = { ime:"Armin", prezime:"Hadzic", index:"18667" };
            let odgovor = await chai.request(server)
                                    .post('/student')
                                    .set('Content-Type', 'application/json')
                                    .send(JSON.stringify(student));

            assert.equal(odgovor.status, 200, 'Greska sa zahtjevom');
            assert.equal(JSON.parse(odgovor.text).status, 'error: poslan je neispravan json', 'Vraceni status nije uredu');

        });
    });

    describe('Test PUT /student/:index', () => {
        it('1. Test: Promjena grupe postojecem studentu', async () => {
            let student = { ime:"Armin", prezime:"Hadzic", index:"18667", grupa:"Grupa1" };
            await chai.request(server)
                        .post('/student')
                        .set('Content-Type', 'application/json')
                        .send(JSON.stringify(student));
            
            let sveGrupePrije = await Grupa.findAll();

            let grupa = { grupa:"Grupa2" };
            let odgovor1 = await chai.request(server)
                                    .put(`/student/${student.index}`)
                                    .set('Content-Type', 'application/json')
                                    .send(JSON.stringify(grupa));

            assert.equal(odgovor1.status, 200, 'Greska sa zahtjevom');
            assert.equal(JSON.parse(odgovor1.text).status, `Promjenjena grupa studentu ${student.index}`, 'Status');

            let sveGrupe = await Grupa.findAll();
            assert.equal(sveGrupe.length, 2, 'Pogresan broj grupa u bazi');
            assert.equal(sveGrupe[1].naziv, grupa.grupa, 'Razlicita grupa');
            assert.equal(sveGrupe.length - sveGrupePrije.length, 1);

        });
        it('2. Test: Promjena grupe nepostojecem studentu', async () => {
            let grupa = { grupa:"Grupa2" };
            let odgovor1 = await chai.request(server)
                                    .put(`/student/55`)
                                    .set('Content-Type', 'application/json')
                                    .send(JSON.stringify(grupa));

            assert.equal(odgovor1.status, 200, 'Greska sa zahtjevom');
            assert.equal(JSON.parse(odgovor1.text).status, `55 ne postoji`, 'Status');

            let sveGrupe = await Grupa.findAll();
            assert.equal(sveGrupe.length, 0, 'Pogresan broj grupa u bazi');

        });
        it('3. Test: Promjena grupe postojecem studentu, dodaje se vec postojeca grupa', async () => {
            let student = { ime:"Armin", prezime:"Hadzic", index:"18667", grupa:"Grupa1" };
            await chai.request(server)
                        .post('/student')
                        .set('Content-Type', 'application/json')
                        .send(JSON.stringify(student));

            let student2 = { ime:"Muris", prezime:"Sladic", index:"18666", grupa:"Grupa2" };
            await chai.request(server)
                        .post('/student')
                        .set('Content-Type', 'application/json')
                        .send(JSON.stringify(student2));

            let sveGrupePrije = await Grupa.findAll();

            let grupa = { grupa:"Grupa2" };
            let odgovor1 = await chai.request(server)
                                    .put(`/student/${student.index}`)
                                    .set('Content-Type', 'application/json')
                                    .send(JSON.stringify(grupa));

            assert.equal(odgovor1.status, 200, 'Greska sa zahtjevom');
            assert.equal(JSON.parse(odgovor1.text).status, `Promjenjena grupa studentu ${student.index}`, 'Status');

            let sveGrupe = await Grupa.findAll();
            assert.equal(sveGrupe.length, 2, 'Pogresan broj grupa u bazi');
            assert.equal(sveGrupe[1].naziv, grupa.grupa, 'Razlicita grupa');
            assert.equal(sveGrupe.length, sveGrupePrije.length);

        });
        it('4. Test: Slanje neispravnog json-a', async () => {
            let grupa = { nazivGrupe:"Grupa55" };
            let odgovor1 = await chai.request(server)
                                    .put(`/student/55`)
                                    .set('Content-Type', 'application/json')
                                    .send(JSON.stringify(grupa));

            assert.equal(odgovor1.status, 200, 'Greska sa zahtjevom');
            assert.equal(JSON.parse(odgovor1.text).status, `error: poslan je neispravan json`, 'Status');
        });
    });

    describe('Test POST /batch/student', () => {
        it('1. Test: Dodavanje jednog studenta preko batch', async () => {
            let csv = `Armin,Hadzic,18667,Grupa1`;
            let odgovor = await chai.request(server)
                        .post('/batch/student')
                        .set('Content-Type', 'text/plain')
                        .send(csv);
            
            assert.equal(odgovor.status, 200, 'Greska sa zahtjevom');
            assert.equal(JSON.parse(odgovor.text).status, `Dodano 1 studenata!`, 'Status');

            let sviStudenti = await Student.findAll();
            assert.equal(sviStudenti.length, 1, 'Pogresan broj studenata u bazi');

            let bazniStudent = sviStudenti[0];
            assert.equal(bazniStudent.ime, 'Armin', 'Razlicito ime');
            assert.equal(bazniStudent.prezime, 'Hadzic', 'Razlicito prezime');
            assert.equal(bazniStudent.index, '18667', 'Razlicit index');

            let sveGrupe = await Grupa.findAll();
            assert.equal(sveGrupe.length, 1, 'Pogresan broj grupa u bazi');
            assert.equal(sveGrupe[0].naziv, 'Grupa1', 'Razlicita grupa');

        });
        it('2. Test: Dodavanje vise novih studenta preko batch', async () => {
            let csv = 
            "Armin,Hadzic,18665,Grupa1\n"
            +"Armin,Hadzic,18666,Grupa2\n"
            +"Armin,Hadzic,18667,Grupa1\n"
            +"Armin,Hadzic,18668,Grupa3\n";
            let odgovor = await chai.request(server)
                        .post('/batch/student')
                        .set('Content-Type', 'text/plain')
                        .send(csv);
            
            assert.equal(odgovor.status, 200, 'Greska sa zahtjevom');
            assert.equal(JSON.parse(odgovor.text).status, `Dodano 4 studenata!`, 'Status');

            let sviStudenti = await Student.findAll();
            assert.equal(sviStudenti.length, 4, 'Pogresan broj studenata u bazi');

            let sveGrupe = await Grupa.findAll();
            assert.equal(sveGrupe.length, 3, 'Pogresan broj grupa u bazi');
        });
        it('3. Test: Dodavanje identicnog studenta preko batch', async () => {
            let csv = 
            "Armin,Hadzic,18665,Grupa1\n"
            +"Armin,Hadzic,18665,Grupa1";
            let odgovor = await chai.request(server)
                        .post('/batch/student')
                        .set('Content-Type', 'text/plain')
                        .send(csv);
            
            assert.equal(odgovor.status, 200, 'Greska sa zahtjevom');
            assert.equal(JSON.parse(odgovor.text).status, "Dodano 1 studenata, a studenti 18665 već postoje!", 'Status');

            let sviStudenti = await Student.findAll();
            assert.equal(sviStudenti.length, 1, 'Pogresan broj studenata u bazi');

            let sveGrupe = await Grupa.findAll();
            assert.equal(sveGrupe.length, 1, 'Pogresan broj grupa u bazi');
        });
        it('4. Test: Dodavanje 2 nova 2 stara studenta', async () => {
            let csv1 = 
            "Armin,Hadzic,18665,Grupa1\n"
            +"Armin,Hadzic,18666,Grupa2\n"
            let odgovor1 = await chai.request(server)
                        .post('/batch/student')
                        .set('Content-Type', 'text/plain')
                        .send(csv1);

            assert.equal(odgovor1.status, 200, 'Greska sa zahtjevom');
            assert.equal(JSON.parse(odgovor1.text).status, `Dodano 2 studenata!`, 'Status');

            let csv2 = 
            "Armin,Hadzic,18665,Grupa1\n"
            +"Armin,Hadzic,18666,Grupa2\n"
            +"Armin,Hadzic,18667,Grupa1\n"
            +"Armin,Hadzic,18668,Grupa3\n";
            let odgovor2 = await chai.request(server)
                        .post('/batch/student')
                        .set('Content-Type', 'text/plain')
                        .send(csv2);
            
            assert.equal(odgovor2.status, 200, 'Greska sa zahtjevom');
            assert.equal(JSON.parse(odgovor2.text).status, `Dodano 2 studenata, a studenti 18665, 18666 već postoje!`, 'Status');

            let sviStudenti = await Student.findAll();
            assert.equal(sviStudenti.length, 4, 'Pogresan broj studenata u bazi');

            let sveGrupe = await Grupa.findAll();
            assert.equal(sveGrupe.length, 3, 'Pogresan broj grupa u bazi');
        });
        it('5. Test: Dodavanje 4 nova 4 stara studenta, izmiksano', async () => {
            let csv1 = 
            "Armin,Hadzic,1,Grupa1\n"
            +"Armin,Hadzic,2,Grupa2\n"
            +"Armin,Hadzic,3,Grupa1\n"
            +"Armin,Hadzic,4,Grupa3\n";
            let odgovor1 = await chai.request(server)
                        .post('/batch/student')
                        .set('Content-Type', 'text/plain')
                        .send(csv1);

            assert.equal(odgovor1.status, 200, 'Greska sa zahtjevom');
            assert.equal(JSON.parse(odgovor1.text).status, `Dodano 4 studenata!`, 'Status');

            let csv2 = 
            "Armin,Hadzic,18665,Grupa1\n"
            +"Armin,Hadzic,1,Grupa2\n"
            +"Armin,Hadzic,18666,Grupa1\n"
            +"Armin,Hadzic,2,Grupa3\n"
            +"Armin,Hadzic,3,Grupa2\n"
            +"Armin,Hadzic,18667,Grupa1\n"
            +"Armin,Hadzic,18668,Grupa3\n"
            +"Armin,Hadzic,4,Grupa3\n";
            let odgovor2 = await chai.request(server)
                        .post('/batch/student')
                        .set('Content-Type', 'text/plain')
                        .send(csv2);
            
            assert.equal(odgovor2.status, 200, 'Greska sa zahtjevom');
            assert.equal(JSON.parse(odgovor2.text).status, `Dodano 4 studenata, a studenti 1, 2, 3, 4 već postoje!`, 'Status');

            let sviStudenti = await Student.findAll();
            assert.equal(sviStudenti.length, 8, 'Pogresan broj studenata u bazi');

            let sveGrupe = await Grupa.findAll();
            assert.equal(sveGrupe.length, 3, 'Pogresan broj grupa u bazi');
        });
        it('6. Test: Greska u csv fali atribut', async () => {
            let csv = `Armin,,18667,Grupa1`;
            let odgovor = await chai.request(server)
                        .post('/batch/student')
                        .set('Content-Type', 'text/plain')
                        .send(csv);
            
            assert.equal(odgovor.status, 200, 'Greska sa zahtjevom');
            assert.equal(JSON.parse(odgovor.text).status, `error: poslan je neispravan csv`, 'Status');

            let sviStudenti = await Student.findAll();
            assert.equal(sviStudenti.length,0, 'Pogresan broj studenata u bazi');

            let sveGrupe = await Grupa.findAll();
            assert.equal(sveGrupe.length, 0, 'Pogresan broj grupa u bazi');
        });
    });

    describe('Test POST /vjezbe', () => {
        it('1. Test: Dodavanje novih vjezbi', async () => {
            let vjezbe = { brojVjezbi: 5, brojZadataka: [1,2,3,2,1] };
            let odgovor = await chai.request(server)
                                    .post('/vjezbe')
                                    .set('Content-Type', 'application/json')
                                    .send(JSON.stringify(vjezbe));

            assert.equal(odgovor.status, 200, 'Greska sa zahtjevom');
            assert.equal(odgovor.text, JSON.stringify(vjezbe), 'Status neispravnog jsona');

            let sveVjezbe = await Vjezba.findAll();
            assert.equal(sveVjezbe.length, 5, 'Pogresan broj studenata u bazi');

            let baznaVjezba = sveVjezbe[0];
            assert.equal(baznaVjezba.naziv, 'Vjezba1', 'Razlicit naziv');
            

            let sviZadaci = await Zadatak.findAll();
            assert.equal(sviZadaci.length, 9, 'Pogresan broj zadataka u bazi');


        });
        it('2. Test: Dodavanje novih vjezbi', async () => {
            let vjezbe = { brojVjezbi: 5, brojZadataka: [1,2,3,2,1] };
            let odgovor = await chai.request(server)
                                    .post('/vjezbe')
                                    .set('Content-Type', 'application/json')
                                    .send(JSON.stringify(vjezbe));

            assert.equal(odgovor.status, 200, 'Greska sa zahtjevom');
            assert.equal(odgovor.text, JSON.stringify(vjezbe), 'Status neispravnog jsona');

            let sveVjezbe = await Vjezba.findAll();
            assert.equal(sveVjezbe.length, 5, 'Pogresan broj studenata u bazi');

            let baznaVjezba = sveVjezbe[0];
            assert.equal(baznaVjezba.naziv, 'Vjezba1', 'Razlicit naziv');
            

            let sviZadaci = await Zadatak.findAll();
            assert.equal(sviZadaci.length, 9, 'Pogresan broj zadataka u bazi');
        });
        it('3. Test: Slanje pogresnih podataka', async () => {
            let vjezbe = { "brojVjezbi": 2, "brojZadataka": [-1,1] };
            let odgovor = await chai.request(server)
                                    .post('/vjezbe')
                                    .set('Content-Type', 'application/json')
                                    .send(JSON.stringify(vjezbe));

            assert.equal(odgovor.status, 200, 'Greska sa zahtjevom');
            assert.equal(odgovor.text, JSON.stringify({ status: "error", data: "Pogrešan parametar z0" }), 'Status neispravnog jsona');

            let sveVjezbe = await Vjezba.findAll();
            assert.equal(sveVjezbe.length, 0, 'Pogresan broj studenata u bazi');
            
            let sviZadaci = await Zadatak.findAll();
            assert.equal(sviZadaci.length, 0, 'Pogresan broj zadataka u bazi');
        });
    });

    describe('Test GET /vjezbe', () => {
        it('1. Test: Provjera stanja baze', async () => {
            let vjezbe = { brojVjezbi: 5, brojZadataka: [1,2,3,2,1] };
            await chai.request(server)
                        .post('/vjezbe')
                        .set('Content-Type', 'application/json')
                        .send(JSON.stringify(vjezbe));

            let odgovor = await chai.request(server)
                                    .get('/vjezbe')
                                    .set('Content-Type', 'application/json')
                                    .send();

            assert.equal(odgovor.status, 200, 'Greska sa zahtjevom');
            
            assert.equal(JSON.parse(odgovor.text).brojVjezbi, 5, 'Status');
            assert.equal(JSON.parse(odgovor.text).brojZadataka.length, 5, 'Status');
        });
        it('2. Test: Provjera stanja prazne baze', async () => {
            let odgovor = await chai.request(server)
                                    .get('/vjezbe')
                                    .set('Content-Type', 'application/json')
                                    .send();

            assert.equal(odgovor.status, 200, 'Greska sa zahtjevom');
            
            assert.equal(JSON.parse(odgovor.text).brojVjezbi, 0, 'Status');
            assert.equal(JSON.parse(odgovor.text).brojZadataka.length, 0, 'Status');
        });
    });
})