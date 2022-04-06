let assert = chai.assert

describe('TestoviParser', function () {
  describe('TestoviParser.dajTacnost()', function () {
    it('JSON je neispravnog formata1', function () {
      var obj = TestoviParser.dajTacnost("macka presla preko tastature");
      assert.equal(obj.tacnost, "0%", `Promjena je ${0} jer je greska u formatu jsona`);
      assert.equal(obj.greske[0], "Testovi se ne mogu izvršiti", "Greska u jsonu");
    });
    it('JSON je neispravnog formata2', function () {
      var rezultat1 = `{
          "statistike":{
             "suites":3,
             "tests":3,
             "passes":3,
             "pending":0,
             "failures":0,
             "start":"2021-11-16T20:24:55.817Z",
             "end":"2021-11-16T20:24:55.829Z",
             "duration":12
          },
          "testovi":[
             {
                "title":"test1",
                "fullTitle":"test1",
                "file":null,
                "duration":1,
                "currentRetry":0,
                "speed":"fast",
                "err":{
                   
                }
             },
             {
                "title":"test2",
                "fullTitle":"test2",
                "file":null,
                "duration":0,
                "currentRetry":0,
                "speed":"fast",
                "err":{
                   
                }
             },
             {
                "title":"test3",
                "fullTitle":"test3",
                "file":null,
                "duration":0,
                "currentRetry":0,
                "speed":"fast",
                "err":{
                   
                }
             }
          ],
          "pending":[
             
          ],
          "failures":[
             
          ],
          "passes":[
             {
                "title":"test1",
                "fullTitle":"test1",
                "file":null,
                "duration":1,
                "currentRetry":0,
                "speed":"fast",
                "err":{
                   
                }
             },
             {
                "title":"test2",
                "fullTitle":"test2",
                "file":null,
                "duration":1,
                "currentRetry":0,
                "speed":"fast",
                "err":{
                   
                }
             },
             {
                "title":"test3",
                "fullTitle":"test3",
                "file":null,
                "duration":1,
                "currentRetry":0,
                "speed":"fast",
                "err":{
                   
                }
             }
          ]
       }`
      var obj = TestoviParser.dajTacnost(rezultat1);
      assert.equal(obj.tacnost, "0%", `Promjena je ${0} jer je greska u formatu jsona`);
      assert.equal(obj.greske[0], "Testovi se ne mogu izvršiti", "Greska u jsonu");
    });
    it('pola pada pola prolazi', function () {
      const test1 =
        `{
    "stats": {
      "suites": 2,
      "tests": 2,
      "passes": 1,
      "pending": 0,
      "failures": 1,
      "start": "2021-11-05T15:00:26.343Z",
      "end": "2021-11-05T15:00:26.352Z",
      "duration": 9
    },
  
    "tests": [
      {
        "title": "should draw 3 rows when parameter are 2,3",
        "fullTitle": "Tabela crtaj() should draw 3 rows when parameter are 2,3",
        "file": null,
        "duration": 1,
        "currentRetry": 0,
        "speed": "fast",
        "err": {}
      },
      {
        "title": "should draw 2 columns in row 2 when parameter are 2,3",
        "fullTitle": "Tabela crtaj() should draw 2 columns in row 2 when parameter are 2,3",
        "file": null,
        "duration": 0,
        "currentRetry": 0,
        "speed": "fast",
        "err": {}
      }
    ],
  
    "pending": [],
  
    "failures": [
      {
        "title": "should draw 3 rows when parameter are 2,3",
        "fullTitle": "Tabela crtaj() should draw 3 rows when parameter are 2,3",
        "file": null,
        "duration": 1,
        "currentRetry": 0,
        "speed": "fast",
        "err": {}
      }
      
    ],
    
    "passes": [
      {
        "title": "should draw 2 columns in row 2 when parameter are 2,3",
        "fullTitle": "Tabela crtaj() should draw 2 columns in row 2 when parameter are 2,3",
        "file": null,
        "duration": 0,
        "currentRetry": 0,
        "speed": "fast",
        "err": {}
      }
    ]
  }`
      const obj = TestoviParser.dajTacnost(test1);
      assert.equal(obj.tacnost, '50%', 'pola pada pola prolazi');
      assert.equal(obj.greske.length, 1, 'jedan od dva polaze')

    }
    );
    it('0 od 4 = 0%', function () {
      const test1 =
        `{
    "stats": {
      "suites": 4,
      "tests": 4,
      "passes": 0,
      "pending": 0,
      "failures": 1,
      "start": "2021-11-05T15:00:26.343Z",
      "end": "2021-11-05T15:00:26.352Z",
      "duration": 9
    },
  
    "tests": [
      {
        "title": "t1",
        "fullTitle": "t1",
        "file": null,
        "duration": 1,
        "currentRetry": 0,
        "speed": "fast",
        "err": {}
      },
      {
        "title": "t2",
        "fullTitle": "t2",
        "file": null,
        "duration": 0,
        "currentRetry": 0,
        "speed": "fast",
        "err": {}
      },
      {
        "title": "t3",
        "fullTitle": "t3",
        "file": null,
        "duration": 1,
        "currentRetry": 0,
        "speed": "fast",
        "err": {}
      },
      {
        "title": "t4",
        "fullTitle": "t4",
        "file": null,
        "duration": 0,
        "currentRetry": 0,
        "speed": "fast",
        "err": {}
      }
    ],
  
    "pending": [],
  
    "failures": [
      {
        "title": "t1",
        "fullTitle": "t1",
        "file": null,
        "duration": 1,
        "currentRetry": 0,
        "speed": "fast",
        "err": {}
      },
      {
        "title": "t2",
        "fullTitle": "t2",
        "file": null,
        "duration": 0,
        "currentRetry": 0,
        "speed": "fast",
        "err": {}
      },
      {
        "title": "t3",
        "fullTitle": "t3",
        "file": null,
        "duration": 1,
        "currentRetry": 0,
        "speed": "fast",
        "err": {}
      },
      {
        "title": "t4",
        "fullTitle": "t4",
        "file": null,
        "duration": 0,
        "currentRetry": 0,
        "speed": "fast",
        "err": {}
      }
      
    ],
    
    "passes": []
  }`
      const obj = TestoviParser.dajTacnost(test1);
      assert.equal(obj.tacnost, '0%', '0/4');
      assert.equal(obj.greske.length, 4, '0/4')

    }
    );
    it('1 od 9 = 11.1%', function () {
      const test1 =
        `{
    "stats": {
      "suites": 9,
      "tests": 9,
      "passes": 1,
      "pending": 0,
      "failures": 8,
      "start": "2021-11-05T15:00:26.343Z",
      "end": "2021-11-05T15:00:26.352Z",
      "duration": 9
    },
  
    "tests": [
      {
        "title": "t1",
        "fullTitle": "t1",
        "file": null,
        "duration": 1,
        "currentRetry": 0,
        "speed": "fast",
        "err": {}
      },
      {
        "title": "t2",
        "fullTitle": "t2",
        "file": null,
        "duration": 0,
        "currentRetry": 0,
        "speed": "fast",
        "err": {}
      },
      {
        "title": "t3",
        "fullTitle": "t3",
        "file": null,
        "duration": 1,
        "currentRetry": 0,
        "speed": "fast",
        "err": {}
      },
      {
        "title": "t4",
        "fullTitle": "t4",
        "file": null,
        "duration": 0,
        "currentRetry": 0,
        "speed": "fast",
        "err": {}
      },
      {
        "title": "t5",
        "fullTitle": "t5",
        "file": null,
        "duration": 1,
        "currentRetry": 0,
        "speed": "fast",
        "err": {}
      },
      {
        "title": "t6",
        "fullTitle": "t6",
        "file": null,
        "duration": 0,
        "currentRetry": 0,
        "speed": "fast",
        "err": {}
      },
      {
        "title": "t7",
        "fullTitle": "t7",
        "file": null,
        "duration": 1,
        "currentRetry": 0,
        "speed": "fast",
        "err": {}
      },
      {
        "title": "t8",
        "fullTitle": "t8",
        "file": null,
        "duration": 0,
        "currentRetry": 0,
        "speed": "fast",
        "err": {}
      },
      {
        "title": "t9",
        "fullTitle": "t9",
        "file": null,
        "duration": 0,
        "currentRetry": 0,
        "speed": "fast",
        "err": {}
      }
    ],
  
    "pending": [],
  
    "failures": [
      {
        "title": "t1",
        "fullTitle": "t1",
        "file": null,
        "duration": 1,
        "currentRetry": 0,
        "speed": "fast",
        "err": {}
      },
      {
        "title": "t2",
        "fullTitle": "t2",
        "file": null,
        "duration": 0,
        "currentRetry": 0,
        "speed": "fast",
        "err": {}
      },
      {
        "title": "t3",
        "fullTitle": "t3",
        "file": null,
        "duration": 1,
        "currentRetry": 0,
        "speed": "fast",
        "err": {}
      },
      {
        "title": "t4",
        "fullTitle": "t4",
        "file": null,
        "duration": 0,
        "currentRetry": 0,
        "speed": "fast",
        "err": {}
      },
      {
        "title": "t5",
        "fullTitle": "t5",
        "file": null,
        "duration": 1,
        "currentRetry": 0,
        "speed": "fast",
        "err": {}
      },
      {
        "title": "t6",
        "fullTitle": "t6",
        "file": null,
        "duration": 0,
        "currentRetry": 0,
        "speed": "fast",
        "err": {}
      },
      {
        "title": "t7",
        "fullTitle": "t7",
        "file": null,
        "duration": 1,
        "currentRetry": 0,
        "speed": "fast",
        "err": {}
      },
      {
        "title": "t8",
        "fullTitle": "t8",
        "file": null,
        "duration": 0,
        "currentRetry": 0,
        "speed": "fast",
        "err": {}
      }
      
    ],
    
    "passes": [
      {
        "title": "t9",
        "fullTitle": "t9",
        "file": null,
        "duration": 0,
        "currentRetry": 0,
        "speed": "fast",
        "err": {}
      }
    ]
  }`
      const obj = TestoviParser.dajTacnost(test1);
      assert.equal(obj.tacnost, '11.1%', '1/9');
      assert.equal(obj.greske.length, 8, '1/9')

    }
    );
    it('1 od 4 = 25%', function () {
      const test1 =
        `{
    "stats": {
      "suites": 4,
      "tests": 4,
      "passes": 1,
      "pending": 0,
      "failures": 3,
      "start": "2021-11-05T15:00:26.343Z",
      "end": "2021-11-05T15:00:26.352Z",
      "duration": 9
    },
  
    "tests": [
      {
        "title": "t1",
        "fullTitle": "t1",
        "file": null,
        "duration": 1,
        "currentRetry": 0,
        "speed": "fast",
        "err": {}
      },
      {
        "title": "t2",
        "fullTitle": "t2",
        "file": null,
        "duration": 0,
        "currentRetry": 0,
        "speed": "fast",
        "err": {}
      },
      {
        "title": "t3",
        "fullTitle": "t3",
        "file": null,
        "duration": 1,
        "currentRetry": 0,
        "speed": "fast",
        "err": {}
      },
      {
        "title": "t4",
        "fullTitle": "t4",
        "file": null,
        "duration": 0,
        "currentRetry": 0,
        "speed": "fast",
        "err": {}
      }
    ],
  
    "pending": [],
  
    "failures": [
      {
        "title": "t1",
        "fullTitle": "t1",
        "file": null,
        "duration": 1,
        "currentRetry": 0,
        "speed": "fast",
        "err": {}
      },
      {
        "title": "t2",
        "fullTitle": "t2",
        "file": null,
        "duration": 0,
        "currentRetry": 0,
        "speed": "fast",
        "err": {}
      },
      {
        "title": "t3",
        "fullTitle": "t3",
        "file": null,
        "duration": 1,
        "currentRetry": 0,
        "speed": "fast",
        "err": {}
      }
      
    ],
    
    "passes": [
      {
        "title": "t4",
        "fullTitle": "t4",
        "file": null,
        "duration": 0,
        "currentRetry": 0,
        "speed": "fast",
        "err": {}
      }
    ]
  }`
      const obj = TestoviParser.dajTacnost(test1);
      assert.equal(obj.tacnost, '25%', '1/4');
      assert.equal(obj.greske.length, 3, '1/4')

    }
    );
    it('2 od 3 = 66.7%', function () {
      const test1 =
        `{
    "stats": {
      "suites": 3,
      "tests": 3,
      "passes": 2,
      "pending": 0,
      "failures": 1,
      "start": "2021-11-05T15:00:26.343Z",
      "end": "2021-11-05T15:00:26.352Z",
      "duration": 9
    },
  
    "tests": [
      {
        "title": "t1",
        "fullTitle": "t1",
        "file": null,
        "duration": 1,
        "currentRetry": 0,
        "speed": "fast",
        "err": {}
      },
      {
        "title": "t2",
        "fullTitle": "t2",
        "file": null,
        "duration": 0,
        "currentRetry": 0,
        "speed": "fast",
        "err": {}
      },
      {
        "title": "t3",
        "fullTitle": "t3",
        "file": null,
        "duration": 1,
        "currentRetry": 0,
        "speed": "fast",
        "err": {}
      }
    ],
  
    "pending": [],
  
    "failures": [
      {
        "title": "t1",
        "fullTitle": "t1",
        "file": null,
        "duration": 1,
        "currentRetry": 0,
        "speed": "fast",
        "err": {}
      }
    ],
    
    "passes": [
      {
        "title": "t2",
        "fullTitle": "t2",
        "file": null,
        "duration": 0,
        "currentRetry": 0,
        "speed": "fast",
        "err": {}
      },
      {
        "title": "t3",
        "fullTitle": "t3",
        "file": null,
        "duration": 0,
        "currentRetry": 0,
        "speed": "fast",
        "err": {}
      }
    ]
  }`
      const obj = TestoviParser.dajTacnost(test1);
      assert.equal(obj.tacnost, '66.7%', '2/3');
      assert.equal(obj.greske.length, 1, '2/3')

    }
    );
    it('8 od 9 = 88.9%', function () {
      const test1 =
        `{
    "stats": {
      "suites": 9,
      "tests": 9,
      "passes": 8,
      "pending": 0,
      "failures": 1,
      "start": "2021-11-05T15:00:26.343Z",
      "end": "2021-11-05T15:00:26.352Z",
      "duration": 9
    },
  
    "tests": [
      {
        "title": "t1",
        "fullTitle": "t1",
        "file": null,
        "duration": 1,
        "currentRetry": 0,
        "speed": "fast",
        "err": {}
      },
      {
        "title": "t2",
        "fullTitle": "t2",
        "file": null,
        "duration": 0,
        "currentRetry": 0,
        "speed": "fast",
        "err": {}
      },
      {
        "title": "t3",
        "fullTitle": "t3",
        "file": null,
        "duration": 1,
        "currentRetry": 0,
        "speed": "fast",
        "err": {}
      },
      {
        "title": "t4",
        "fullTitle": "t4",
        "file": null,
        "duration": 0,
        "currentRetry": 0,
        "speed": "fast",
        "err": {}
      },
      {
        "title": "t5",
        "fullTitle": "t5",
        "file": null,
        "duration": 1,
        "currentRetry": 0,
        "speed": "fast",
        "err": {}
      },
      {
        "title": "t6",
        "fullTitle": "t6",
        "file": null,
        "duration": 0,
        "currentRetry": 0,
        "speed": "fast",
        "err": {}
      },
      {
        "title": "t7",
        "fullTitle": "t7",
        "file": null,
        "duration": 1,
        "currentRetry": 0,
        "speed": "fast",
        "err": {}
      },
      {
        "title": "t8",
        "fullTitle": "t8",
        "file": null,
        "duration": 0,
        "currentRetry": 0,
        "speed": "fast",
        "err": {}
      },
      {
        "title": "t9",
        "fullTitle": "t9",
        "file": null,
        "duration": 0,
        "currentRetry": 0,
        "speed": "fast",
        "err": {}
      }
    ],
  
    "pending": [],
  
    "failures": [
      {
        "title": "t9",
        "fullTitle": "t9",
        "file": null,
        "duration": 0,
        "currentRetry": 0,
        "speed": "fast",
        "err": {}
      }
    ],
    
    "passes": [
      {
        "title": "t1",
        "fullTitle": "t1",
        "file": null,
        "duration": 1,
        "currentRetry": 0,
        "speed": "fast",
        "err": {}
      },
      {
        "title": "t2",
        "fullTitle": "t2",
        "file": null,
        "duration": 0,
        "currentRetry": 0,
        "speed": "fast",
        "err": {}
      },
      {
        "title": "t3",
        "fullTitle": "t3",
        "file": null,
        "duration": 1,
        "currentRetry": 0,
        "speed": "fast",
        "err": {}
      },
      {
        "title": "t4",
        "fullTitle": "t4",
        "file": null,
        "duration": 0,
        "currentRetry": 0,
        "speed": "fast",
        "err": {}
      },
      {
        "title": "t5",
        "fullTitle": "t5",
        "file": null,
        "duration": 1,
        "currentRetry": 0,
        "speed": "fast",
        "err": {}
      },
      {
        "title": "t6",
        "fullTitle": "t6",
        "file": null,
        "duration": 0,
        "currentRetry": 0,
        "speed": "fast",
        "err": {}
      },
      {
        "title": "t7",
        "fullTitle": "t7",
        "file": null,
        "duration": 1,
        "currentRetry": 0,
        "speed": "fast",
        "err": {}
      },
      {
        "title": "t8",
        "fullTitle": "t8",
        "file": null,
        "duration": 0,
        "currentRetry": 0,
        "speed": "fast",
        "err": {}
      }
    ]
  }`
      const obj = TestoviParser.dajTacnost(test1);
      assert.equal(obj.tacnost, '88.9%', '8/9');
      assert.equal(obj.greske.length, 1, '8/9')

    }
    );
    it('3 od 3 = 100%', function () {
      const test1 =
        `{
    "stats": {
      "suites": 3,
      "tests": 3,
      "passes": 3,
      "pending": 0,
      "failures": 0,
      "start": "2021-11-05T15:00:26.343Z",
      "end": "2021-11-05T15:00:26.352Z",
      "duration": 9
    },
  
    "tests": [
      {
        "title": "t1",
        "fullTitle": "t1",
        "file": null,
        "duration": 1,
        "currentRetry": 0,
        "speed": "fast",
        "err": {}
      },
      {
        "title": "t2",
        "fullTitle": "t2",
        "file": null,
        "duration": 0,
        "currentRetry": 0,
        "speed": "fast",
        "err": {}
      },
      {
        "title": "t3",
        "fullTitle": "t3",
        "file": null,
        "duration": 1,
        "currentRetry": 0,
        "speed": "fast",
        "err": {}
      }
    ],
  
    "pending": [],
  
    "failures": [],
    
    "passes": [
      {
        "title": "t1",
        "fullTitle": "t1",
        "file": null,
        "duration": 1,
        "currentRetry": 0,
        "speed": "fast",
        "err": {}
      },
      {
        "title": "t2",
        "fullTitle": "t2",
        "file": null,
        "duration": 0,
        "currentRetry": 0,
        "speed": "fast",
        "err": {}
      },
      {
        "title": "t3",
        "fullTitle": "t3",
        "file": null,
        "duration": 1,
        "currentRetry": 0,
        "speed": "fast",
        "err": {}
      }
    ]
  }`
      const obj = TestoviParser.dajTacnost(test1);
      assert.equal(obj.tacnost, '100%', '3/3');
      assert.equal(obj.greske.length, 0, '3/3')

    }
    );

  });
});