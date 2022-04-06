let StudentAjax = (
    function() {
        const dodajStudenta = (student, callback) => {
            const URL = "http://localhost:3000/student";

            var ajax = new XMLHttpRequest();
            ajax.onreadystatechange = () => {
                if (ajax.readyState == 4 && ajax.responseText.includes("error")) {
                    callback(JSON.parse(ajax.responseText)['data'], null);
                }
                else if (ajax.readyState == 4 && ajax.status == 200) {
                    let json = student;
                    if(typeof json.ime === 'undefined' 
                        || typeof json.prezime === 'undefined' 
                        || typeof json.index === 'undefined' 
                        || typeof json.grupa === 'undefined') {
                            callback("error: greska u json student nema atributa", null);
                            return;
                    }
                    
                    if(json.ime.legth === 0 
                        || json.prezime.legth === 0 
                        || json.index.legth === 0 
                        || json.grupa.legth === 0) {
                            callback("error: greska u json student prazno polje", null);
                            return;
                    }
                    
                    callback(null, JSON.parse(ajax.responseText));
                }
                else if (ajax.readyState == 4 && ajax.status == 404)
                    callback("error", null);
            }
            ajax.open("POST", URL, true);
            ajax.setRequestHeader("Content-Type", "application/json");
            ajax.send(JSON.stringify(student));
        }

        const postaviGrupu = (index, grupa, callback) => {
            const URL = `http://localhost:3000/student/${index}`;

            var ajax = new XMLHttpRequest();
            ajax.onreadystatechange = () => {
                if (ajax.readyState == 4 && ajax.responseText.includes("error"))
                    callback(JSON.parse(ajax.responseText)['data'], null);
                else if (ajax.readyState == 4 && ajax.status == 200) {
                    if(grupa.legth === 0) {
                        callback("error: greska u stringu grupa", null);
                        return;
                    }

                    callback(null, JSON.parse(ajax.responseText));
                }
                else if (ajax.readyState == 4 && ajax.status == 404)
                    callback("error", null);
            }
            let jsonGrupa = { grupa:grupa }

            ajax.open("PUT", URL, true);
            ajax.setRequestHeader("Content-Type", "application/json");
            ajax.send(JSON.stringify(jsonGrupa));
        }

        const dodajBatch = (csvStudenti, callback) =>  {
            const URL = `http://localhost:3000/batch/student`;

            var ajax = new XMLHttpRequest();
            ajax.onreadystatechange = () => {
                if (ajax.readyState == 4 && ajax.responseText.includes("error"))
                    callback(JSON.parse(ajax.responseText)['data'], null);
                else if (ajax.readyState == 4 && ajax.status == 200) {
                    var niz_stringova = csvStudenti.toString('utf-8').split(/[\r\n,]/).filter(s => s.length > 0);
                
                    if(niz_stringova.length % 4 != 0) {
                        callback("error: greska sa csv");
                        return;
                    }
                    callback(null, JSON.parse(ajax.responseText));
                }
                else if (ajax.readyState == 4 && ajax.status == 404)
                    callback("error", null);
                
            }
            ajax.open("POST", URL, true);
            ajax.setRequestHeader("Content-Type", "text/plain");
            ajax.send(csvStudenti);
        }

        
        return{
            dodajStudenta:dodajStudenta,
            postaviGrupu:postaviGrupu,
            dodajBatch:dodajBatch,
        }
    
    
    }()
)

