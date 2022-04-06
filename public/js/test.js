let assert = chai.assert;
describe('Testovi VjezbeAjax', function () {

    chai.should();
    describe('1. Test posaljiPodatke', function () {
        beforeEach(function () {
            this.xhr = sinon.useFakeXMLHttpRequest();

            this.requests = [];
            this.xhr.onCreate = function (xhr) {
                this.requests.push(xhr);
            }.bind(this);
        });

        afterEach(function () {
            this.xhr.restore();
        });
        it('1. Poslana greska', function (done) {
            let prazniJson = {};
            VjezbeAjax.posaljiPodatke(prazniJson, function (err, data) {
                assert.equal(err, "error", '');
                assert.deepEqual(data, null);
                done();
            });
            this.requests[0].respond(404, { 'Content-Type': 'text/json' }, '{"data": "error"}');
        });
        it('2. Svi podaci ispravni', function (done) {
            let json = { brojVjezbi: 5, brojZadataka: [1,2,3,2,1] };
            let stringJson = JSON.stringify(json);
            VjezbeAjax.posaljiPodatke(json, function (err, data) {
                assert.equal(err, null, '');
                assert.deepEqual(data, { brojVjezbi: 5, brojZadataka: [1,2,3,2,1] });
                done();
            });
            this.requests[0].requestBody.should.equal(stringJson);
            this.requests[0].respond(200, { 'Content-Type': 'text/json' }, stringJson);
        });
        it('3. Podaci neispravni', function (done) {
            let json1 = { "brojVjezbi": -34, "brojZadataka": [1] };
            let json2 = { status: "error", data: "Pogrešan podatak brojVjezbi" };
            let stringJson1 = JSON.stringify(json1);
            let stringJson2 = JSON.stringify(json2);

            VjezbeAjax.posaljiPodatke(json1, function (err, data) {
                assert.deepEqual(data, null);
                done();
            });

            this.requests[0].requestBody.should.equal(stringJson1);
            this.requests[0].respond(200, { 'Content-Type': 'text/json' }, stringJson2);
        });
        it('4. Podaci neispravni', function (done) {
            let json1 = { "brojVjezbi": 2, "brojZadataka": [-1,1] };
            let json2 = { status: "error", data: "Pogrešan podatak z0" };
            let stringJson1 = JSON.stringify(json1);
            let stringJson2 = JSON.stringify(json2);

            VjezbeAjax.posaljiPodatke(json1, function (err, data) {
                assert.deepEqual(data, null);
                done();
            });

            this.requests[0].requestBody.should.equal(stringJson1);
            this.requests[0].respond(200, { 'Content-Type': 'text/json' }, stringJson2);
        });
        
    });

    
    describe('2. Test dohvatiPodatke', function () {
        beforeEach(function () {
            this.xhr = sinon.useFakeXMLHttpRequest();

            this.requests = [];
            this.xhr.onCreate = function (xhr) {
                this.requests.push(xhr);
            }.bind(this);
        });

        afterEach(function () {
            this.xhr.restore();
        });
        it('1. Error', function (done) {
            let error = { status: 404, data: "error" };
            let errorString = JSON.stringify(error);
            VjezbeAjax.dohvatiPodatke(function (err, data) {
                assert.equal(err, "error", '');
                assert.deepEqual(data, null);
                done();
            });
            this.requests[0].respond(404, { 'Content-Type': 'text/json' }, errorString);
        });
        it('2. Error', function (done) {
            VjezbeAjax.dohvatiPodatke(function (err, data) {
                assert.equal(err, "Greska: nepoznat URL", '');
                assert.deepEqual(data, null);
                done();
            });
            this.requests[0].respond(404, { 'Content-Type': 'text/json' }, JSON.stringify({data:"Neka greska koja nije ERROR"}));
        });
        it('3. Svi podaci ispravni', function (done) {
            VjezbeAjax.dohvatiPodatke(function (err, data) {
                assert.equal(err, null, '');
                assert.deepEqual(data, { brojVjezbi: 5, brojZadataka: [1, 2, 3, 4, 5] });
                done();
            });
            this.requests[0].respond(200, { 'Content-Type': 'text/json' }, JSON.stringify({ brojVjezbi: 5, brojZadataka: [1, 2, 3, 4, 5] }));
        });
        it('4. Podaci neispravni', function (done) {
            VjezbeAjax.dohvatiPodatke(function (err, data) {
                assert.equal(err, "Pogrešan parametar brojVjezbi,z0,brojZadataka", '');
                assert.deepEqual(data, null);
                done();
            });
            this.requests[0].respond(200, { 'Content-Type': 'text/json' }, JSON.stringify({brojVjezbi: -123, brojZadataka:[321]}));
        });
        it('5. Podaci neispravni', function (done) {
            VjezbeAjax.dohvatiPodatke(function (err, data) {
                assert.equal(err, "Pogrešan parametar brojZadataka", '');
                assert.deepEqual(data, null);
                done();
            });
            this.requests[0].respond(200, { 'Content-Type': 'text/json' }, JSON.stringify({brojVjezbi: 3, brojZadataka:[]}));
        });
        it('6. Podaci neispravni', function (done) {
            VjezbeAjax.dohvatiPodatke(function (err, data) {
                assert.equal(err, "Pogrešan parametar z1", '');
                assert.deepEqual(data, null);
                done();
            });
            this.requests[0].respond(200, { 'Content-Type': 'text/json' }, JSON.stringify({brojVjezbi: 2, brojZadataka:[3, -1]}));
        });
        it('7. Podaci neispravni', function (done) {
            VjezbeAjax.dohvatiPodatke(function (err, data) {
                assert.equal(err, "Pogrešan parametar brojZadataka", '');
                assert.deepEqual(data, null);
                done();
            });
            this.requests[0].respond(200, { 'Content-Type': 'text/json' }, JSON.stringify({brojVjezbi: 3, brojZadataka:[1]}));
        });
        

    });

    describe('3. Test dodajInputPolja', function () {
        it('1. Broj polja 0', function () {
            let div = document.getElementById("testDiv");
            const brojLabela = 0
            VjezbeAjax.dodajInputPolja(div, brojLabela);
            assert.equal(brojLabela * 3, div.children.length, '');
            div.innerHTML = '';
        });
        it('2. Broj polja korektan', function () {
            let div = document.getElementById("testDiv");
            const brojLabela = 15
            VjezbeAjax.dodajInputPolja(div, brojLabela);
            assert.equal(brojLabela * 2, div.children.length, '');
            div.innerHTML = '';
        });
        it('3. Broj polja veci od 15', function () {
            let div = document.getElementById("testDiv");
            const brojLabela = 17
            VjezbeAjax.dodajInputPolja(div, brojLabela);
            assert.equal(0, div.children.length, '');
            div.innerHTML = '';
        });
        it('4. Broj polja negativan', function () {
            let div = document.getElementById("testDiv");
            const brojLabela = -7
            VjezbeAjax.dodajInputPolja(div, brojLabela);
            assert.equal(0, div.children.length, '');
            div.innerHTML = '';
        });
    });

    describe('4. Test iscrtajVjezbe', function () {
        it('1. brojVjezbi negativan', function () {
            let div = document.getElementById("testDiv");
            let objekat = { brojVjezbi: -5, brojZadataka: [2] };
            VjezbeAjax.iscrtajVjezbe(div, objekat);
            let brojPolja = div.children.length;
            div.innerHTML = '';
            assert.equal(0, brojPolja, '');
        });
        it('2. broj vjezbi nula', function () {
            let div = document.getElementById("testDiv");
            let objekat = { brojVjezbi: 0, brojZadataka: [] };
            VjezbeAjax.iscrtajVjezbe(div, objekat);
            let brojPolja = div.children.length;
            div.innerHTML = '';
            assert.equal(0, brojPolja, '');
        });
        it('3. brojVjezbi prevelik', function () {
            let div = document.getElementById("testDiv");
            let objekat = { brojVjezbi: 32, brojZadataka: [7] };
            VjezbeAjax.iscrtajVjezbe(div, objekat);
            let brojPolja = div.children.length;
            div.innerHTML = '';
            assert.equal(0, brojPolja, '');
        });
        it('4. Razlicit brojVjezbi i velicina brojZadataka', function () {
            let div = document.getElementById("testDiv");
            let objekat = { brojVjezbi: 5, brojZadataka: [4, 3] };
            VjezbeAjax.iscrtajVjezbe(div, objekat);
            let brojPolja = div.children.length;
            div.innerHTML = '';
            assert.equal(0, brojPolja, '');
        });
        it('5. negativan element u brojZadataka', function () {
            let div = document.getElementById("testDiv");
            let objekat = { brojVjezbi: 5, brojZadataka: [1, -2, 3, 4, 5] };
            VjezbeAjax.iscrtajVjezbe(div, objekat);
            let brojPolja = div.children.length;
            div.innerHTML = '';
            assert.equal(0, brojPolja, '');
        });
        it('6. prevelik element u brojZadataka', function () {
            let div = document.getElementById("testDiv");
            let objekat = { brojVjezbi: 5, brojZadataka: [1, 2, 3, 4, 55] };
            VjezbeAjax.iscrtajVjezbe(div, objekat);
            let brojPolja = div.children.length;
            div.innerHTML = '';
            assert.equal(0, brojPolja, 'Broj vjezbi na formi nije nula!');
        });
        it('7. korektan objekatVjezbe', function () {
            let div = document.getElementById("testDiv");
            let objekat = { brojVjezbi: 2, brojZadataka: [1, 2] };
            VjezbeAjax.iscrtajVjezbe(div, objekat);
            let brojPolja = div.children.length;
            div.innerHTML = '';
            assert.equal(objekat.brojVjezbi, brojPolja, '');
        });
    });

    describe('5. Test iscrtajZadatke', function () {
        it('1. brojZadataka negativan', function () {
            let div = document.getElementById("testDiv");
            VjezbeAjax.iscrtajZadatke(div, -1);
            let brojPolja = div.children.length;
            div.innerHTML = '';
            assert.equal(0, brojPolja, '');
        });
        it('2. brojZadataka nula', function () {
            let div = document.createElement('div');
            const brojZadataka = 0;
            VjezbeAjax.iscrtajZadatke(div, brojZadataka);
            let brojPolja = div.children.length;
            div.innerHTML = '';
            assert.equal(brojZadataka, brojPolja, '');
        });
        it('3. brojZadataka prevelik', function () {
            let div = document.getElementById("testDiv");
            VjezbeAjax.iscrtajZadatke(div, 11);
            let brojPolja = div.children.length;
            div.innerHTML = '';
            assert.equal(0, brojPolja, '');
        });
        it('4. korektan brojZadataka', function () {
            let div = document.createElement('div');
            const brojZadataka = 4;
            VjezbeAjax.iscrtajZadatke(div, brojZadataka);
            let brojPolja = div.children.length;
            div.innerHTML = '';
            assert.equal(brojZadataka, brojPolja, '');
        });
        it('5. Test vidljivosti', function () {
            let div = document.createElement('div');
            let div1 = document.createElement('div');
            VjezbeAjax.iscrtajZadatke(div, 2);
            VjezbeAjax.iscrtajZadatke(div1, 3);
            div.innerHTML = '';
            div1.innerHTML = '';
            assert.equal('none', div.style.display, '');
        });
    });
});
