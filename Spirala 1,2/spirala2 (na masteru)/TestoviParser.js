
let TestoviParser = (
	function () {
		const dajTacnost = function (rezultat) {
			if(!ispravanJson(rezultat))
				return { tacnost: `${0}%`, greske: ["Testovi se ne mogu izvršiti"] };
			const izvjestaj = JSON.parse(rezultat);
			const brojTestova = izvjestaj.stats.tests;
			const brojProlaza = izvjestaj.stats.passes;

			let tacnost = (100 * parseFloat(brojProlaza) / brojTestova);

			if (!Number.isInteger(tacnost))
				tacnost = tacnost.toFixed(1);

			const tacnostString = (tacnost) + "%";

			let json;
			if (tacnost == 100)
				json = { tacnost: tacnostString, greske: [] }
			else {
				let paliTestovi = [];
				for (let i = 0; i < izvjestaj.failures.length; i++) {
					let paliTest = izvjestaj.failures[i];
					paliTestovi.push(paliTest.fullTitle);
				}
				json = { tacnost: tacnostString, greske: paliTestovi }
			}
			//console.log(JSON.stringify(json));
			return json;
		}
		
		const porediNizove = function (testovi1, testovi2, f) {
			if (testovi1.length != testovi2.length)
				return false;
			for (let test1 of testovi1) {
				let postoji = false;
				for (let test2 of testovi2) {
					if (f(test1, test2)) {
						postoji = true;
						break;
					}
				}
				if (!postoji)
					return false;
			}
			return true;
		}

		const brojJedinstvenihTestova = function (testovi1, testovi2) {
			if (testovi2.length == 0)
				return 0;
			let br = 0;
			for (let test1 of testovi1) {
				let postoji = false;
				for (let test2 of testovi2) {
					if (test1.fullTitle == test2.fullTitle) {
						postoji = true;
						break;
					}
					let xxx = 123;
				}
				if (!postoji)
					br++;
			}
			return br;
		}


		const jedinstveneGreske = function (greske1, testovi2) {
			if (testovi2.length == 0)
				return [];
			let jedinstveneGreske = [];

			for (let greska1 of greske1) {
				let postoji = false;
				for (let test2 of testovi2) {
					if (greska1 == test2.fullTitle) {
						postoji = true;
						break;
					}
				}
				if (!postoji) {

					jedinstveneGreske.push(greska1);
				}
			}
			return jedinstveneGreske;
		}

		const ispravanJson = function (str) {
			let obj;
			try {
				obj = JSON.parse(str);
			} catch (e) {
				return false;
			}
			if(obj.hasOwnProperty('stats') && obj.hasOwnProperty('tests') 
				&& obj.hasOwnProperty('failures') && obj.hasOwnProperty('pending') 
					&& obj.hasOwnProperty('passes')) {
				return true;
			}
			return false;
		}

		const porediRezultate = function (rezultat1, rezultat2) {
			if(!ispravanJson(rezultat1))
				return { promjena: `${0}%`, greske: ["Testovi se ne mogu izvršiti"] };
			if(!ispravanJson(rezultat2))
				return { promjena: `${0}%`, greske: ["Testovi se ne mogu izvršiti"] };
			

			const izvjestaj1 = JSON.parse(rezultat1);
			const tacnost1 = dajTacnost(rezultat1);
			const izvjestaj2 = JSON.parse(rezultat2);
			const tacnost2 = dajTacnost(rezultat2);

			let promjena;
			if (porediNizove(izvjestaj1.tests, izvjestaj2.tests, (test1, test2) => { return test1.title === test2.title })) {
				console.log("1");
				promjena = tacnost2.tacnost;
				promjena = promjena.replace('%', '');
				console.log(promjena);
			}
			else {
				let jedinstveni = brojJedinstvenihTestova(izvjestaj1.failures, izvjestaj2.tests);
				console.log("2");
				console.log(`brojnik1 = ${jedinstveni}`);
				console.log(`brojnik2 = ${izvjestaj2.stats.failures}`);
				console.log(`nazivnik1 = ${jedinstveni}`);
				console.log(`nazivnik2 = ${izvjestaj2.stats.tests}`);


				promjena = 100 * (jedinstveni + izvjestaj2.failures.length);
				promjena = parseFloat(promjena) / (jedinstveni + izvjestaj2.tests.length);
				if (!Number.isInteger(promjena))
					promjena = promjena.toFixed(1);
			}

			let greske;
			if (porediNizove(izvjestaj1.tests, izvjestaj2.tests, (t1, t2) => JSON.stringify(t1) == JSON.stringify(t2))) {
				console.log("3");
				greske = tacnost2.greske;
				greske.sort();
				for (let i of greske)
					console.log(i);
			}
			else {
				console.log("4");
				let g1 = jedinstveneGreske(tacnost1.greske, izvjestaj2.tests);
				g1.sort();
				greske = g1;

				console.log(`greske duzina ${greske.length}`)

				let g2 = tacnost2.greske;

				g2.sort();
				greske = greske.concat(g2);
				console.log(`greske duzina ${greske.length}`)


				for (let i of greske)
					console.log(i);
			}


			console.log(`${promjena}%`);
			let json = { promjena: `${promjena}%`, greske: greske };

			return json;
		}
		return {
			dajTacnost: dajTacnost,
			porediRezultate: porediRezultate
		}
	}()
)
