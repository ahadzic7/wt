
let VjezbeAjax = (
    function() {
        const dodajInputPolja = function (DOM,brojVjezbi) {
            if(brojVjezbi > 15)
                return;
            let htmlString = "";

            for(let i = 0; i < brojVjezbi; i++) {
                htmlString += 
                `<div id="f${i}">
                    <label for="">z${i}</label>
                    <input type="number" name="z${i}" id="z${i}" value="4">
                </div>
                <br>`; 
            }
            DOM.innerHTML = htmlString;
        }

        const posaljiPodatke = function(vjezbeObjekat, callback) {
            const URL = "http://localhost:3000/vjezbe";

            var ajax = new XMLHttpRequest();
            ajax.onreadystatechange = () => {
                if (ajax.readyState == 4 && ajax.responseText.includes("error"))
                    callback(JSON.parse(ajax.responseText)['data'], null);
                else if (ajax.readyState == 4 && ajax.status == 200) {
                    console.log("f: " + ajax.responseText);
                    let json = JSON.parse(ajax.responseText)
                    let stringGreske = "";

                    if(typeof json.brojVjezbi === 'undefined') {
                        stringGreske = `Pogrešan parametar brojVjezbi`
                    }
                    else if(typeof json.brojZadataka === 'undefined') {        
                        stringGreske = `Pogrešan parametar brojZadataka`
                    }
                    else {
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

                    }
                    if(stringGreske.length !== 0)
                        callback("Pogrešan parametar " + stringGreske.trim(), null);

                    callback(null, vjezbeObjekat);
                }
                else if (ajax.readyState == 4 && ajax.status == 404)
                    callback("error", null);
            }
    
            
            ajax.open("POST",URL,true);
            ajax.setRequestHeader("Content-Type", "application/json");
            ajax.send(JSON.stringify(vjezbeObjekat));
        }

        const dohvatiPodatke = function(callback) {
            const URL = "http://localhost:3000/vjezbe";

            var ajax = new XMLHttpRequest();
            ajax.onreadystatechange = function() {                
                if (ajax.readyState == 4 && ajax.responseText.includes("error")) {
                    callback(JSON.parse(ajax.responseText).data, null);
                }
                else if (ajax.readyState == 4 && ajax.status == 200) {
                    let json = JSON.parse(ajax.responseText)
                    let stringGreske = "";

                    if(typeof json.brojVjezbi === 'undefined') {
                        stringGreske = `Pogrešan parametar brojVjezbi`
                    }
                    else if(typeof json.brojZadataka === 'undefined') {        
                        stringGreske = `Pogrešan parametar brojZadataka`
                    }
                    else {
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

                    }
                    if(stringGreske.length !== 0)
                        callback("Pogrešan parametar " + stringGreske.trim(), null);

                    callback(null, json);
                }
                else if (ajax.readyState == 4 && ajax.status == 404) {
                    callback("Greska: nepoznat URL", null);
                }
            }
            ajax.open("GET", URL, true);
            ajax.send();
        }

        const iscrtajVjezbe = function(DOM, json) {
            const brojVjezbi = json.brojVjezbi;
            const brojZadataka = json.brojZadataka;
            let htmlString = "";
            if(brojVjezbi > 15 )
                return;
            if(brojVjezbi != brojZadataka.length)
                return;
            for(let i = 0; i < brojVjezbi; i++) {
                if(!(brojZadataka[i] >= 0 && brojZadataka[i] <= 10))
                    return;
                htmlString += 
                `
                <div class="dugmad" id="d${i}">
                    <input type="button" value="VJEZBA ${i + 1}" class="vb" id="vb${i}" onclick="prikaziZadatke(this)">
                    <div class="v" id="v${i}">
                    </div>
                </div>`;
            }


            DOM.innerHTML = htmlString;

        }
        
        var prikazaniDom;
        const iscrtajZadatke = function(DOM, brojZadataka) {
            if(typeof prikazaniDom != 'undefined') {
                prikazaniDom.style.display = "none";
            }

            prikazaniDom = DOM

            if(typeof prikazaniDom != 'undefined' && prikazaniDom.style.display == "none") {
                prikazaniDom.style.display = "block";
                return;
            }

            let htmlString = ""

            for(let i = 0; i < brojZadataka; i++) {
                htmlString +=
                `<input type="button" class="z" value="ZADATAK ${i + 1}">`;
            }
            prikazaniDom.innerHTML = htmlString;

            prikazaniDom.style.display = "block";
        }

        return{
            dodajInputPolja:dodajInputPolja,
            posaljiPodatke:posaljiPodatke,
            dohvatiPodatke:dohvatiPodatke,
            iscrtajVjezbe:iscrtajVjezbe,
            iscrtajZadatke:iscrtajZadatke
        }
    }()
)

