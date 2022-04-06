var jsonPodaci;
var prikazaniDom;

function prikaziVjezbe() {
    VjezbeAjax.dohvatiPodatke((err, data) => {
        if(err) {
            console.log("Greska u prikaziVjezbe z2.js: " + err);
        }
        else if(data) {
            jsonPodaci = data;
            console.log("Data:" + data.brojVjezbi);
            VjezbeAjax.iscrtajVjezbe(document.getElementById('odabirVjezbe'), data);
        }
    });
}

function prikaziZadatke(elem) {    
    const ID = elem.id.replace(/\D/g,'');
    prikazaniDom = document.getElementById(`v${ID}`);
    VjezbeAjax.iscrtajZadatke(prikazaniDom, jsonPodaci.brojZadataka[ID]);
}