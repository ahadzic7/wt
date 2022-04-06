let assert = chai.assert

describe('TestoviParser', function () {
    describe('TestoviParser.porediRezultate()', function () {
        it('JSON je neispravnog formata1', function () {
            var obj = TestoviParser.porediRezultate("macka presla preko tastature", "neispravan JSON");
            assert.equal(obj.promjena, "0%", `Promjena je ${0} jer je greska u formatu jsona`);
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
            var obj = TestoviParser.porediRezultate(rezultat1, rezultat1);
            assert.equal(obj.promjena, "0%", `Promjena je ${0} jer je greska u formatu jsona`);
            assert.equal(obj.greske[0], "Testovi se ne mogu izvršiti", "Greska u jsonu");
        });
        it('rezultat1 i rezultat2 isti testovi razlicita prolaznost', function () {
            var rezultat1 = `{
                "stats":{
                   "suites":3,
                   "tests":3,
                   "passes":3,
                   "pending":0,
                   "failures":0,
                   "start":"2021-11-16T20:24:55.817Z",
                   "end":"2021-11-16T20:24:55.829Z",
                   "duration":12
                },
                "tests":[
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
            var rezultat2 = `{
                "stats":{
                   "suites":3,
                   "tests":3,
                   "passes":1,
                   "pending":0,
                   "failures":2,
                   "start":"2021-11-16T20:24:55.817Z",
                   "end":"2021-11-16T20:24:55.829Z",
                   "duration":12
                },
                "tests":[
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
                   }
                ]
             }`
            var obj = TestoviParser.porediRezultate(rezultat1, rezultat2);
            assert.equal(obj.promjena, "33.3%", `Promjena je ${33.3} jer nas samo interesuje rezultat2`);
            assert.equal(obj.greske.length, 2, "broj gresaka je 2 ignoriramo rezultat1");
        });
        it('rezultat1 poslan dvaput', function () {
            var rezultat1 = `{
              "stats":{
                 "suites":3,
                 "tests":3,
                 "passes":3,
                 "pending":0,
                 "failures":0,
                 "start":"2021-11-21T20:49:23.113Z",
               "end":"2021-11-21T20:49:23.125Z",
               "duration":12
              },
              "tests":[
                 {
                    "title":"t100",
                    "fullTitle":"t100",
                    "file":null,
                    "duration":1,
                    "currentRetry":0,
                    "speed":"fast",
                    "err":{
                       
                    }
                 },
                 {
                    "title":"t200",
                    "fullTitle":"t200",
                    "file":null,
                    "duration":0,
                    "currentRetry":0,
                    "speed":"fast",
                    "err":{
                       
                    }
                 },
                 {
                    "title":"t300",
                    "fullTitle":"t300",
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
                    "title":"t100",
                    "fullTitle":"t100",
                    "file":null,
                    "duration":1,
                    "currentRetry":0,
                    "speed":"fast",
                    "err":{
                       
                    }
                 },
                 {
                    "title":"t200",
                    "fullTitle":"t200",
                    "file":null,
                    "duration":1,
                    "currentRetry":0,
                    "speed":"fast",
                    "err":{
                       
                    }
                 },
                 {
                    "title":"t300",
                    "fullTitle":"t300",
                    "file":null,
                    "duration":1,
                    "currentRetry":0,
                    "speed":"fast",
                    "err":{
                       
                    }
                 }
              ]
           }`
            var obj = TestoviParser.porediRezultate(rezultat1, rezultat1);
            assert.equal(obj.promjena, "100%", "Promjena = 100 jer ignoriramo rezultat1");
            assert.equal(obj.greske.length, 0, "nema nikakvih gresaka");
        });
        it('rezultat1 i rezultat2 razliciti', function () {
            var rezultat1 = `{
            "stats":{
               "suites":3,
               "tests":3,
               "passes":1,
               "pending":0,
               "failures":2,
               "start":"2021-11-21T20:49:23.113Z",
               "end":"2021-11-21T20:49:23.125Z",
               "duration":12
            },
            "tests":[
               {
                  "title":"t4",
                  "fullTitle":"t4",
                  "file":null,
                  "duration":1,
                  "currentRetry":0,
                  "speed":"fast",
                  "err":{
                     
                  }
               },
               {
                  "title":"t2",
                  "fullTitle":"t2",
                  "file":null,
                  "duration":0,
                  "currentRetry":0,
                  "speed":"fast",
                  "err":{
                     
                  }
               },
               {
                  "title":"t3",
                  "fullTitle":"t3",
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
              {
                "title":"t4",
                "fullTitle":"t4",
                "file":null,
                "duration":1,
                "currentRetry":0,
                "speed":"fast",
                "err":{
                   
                }
             },
             {
              "title":"t2",
              "fullTitle":"t2",
              "file":null,
              "duration":1,
              "currentRetry":0,
              "speed":"fast",
              "err":{
                 
              }
           }
            ],
            "passes":[
               {
                  "title":"t3",
                  "fullTitle":"t3",
                  "file":null,
                  "duration":1,
                  "currentRetry":0,
                  "speed":"fast",
                  "err":{
                     
                  }
               }
            ]
         }`
            var rezultat2 = `{
            "stats":{
               "suites":3,
               "tests":3,
               "passes":1,
               "pending":0,
               "failures":2,
               "start":"2021-11-21T20:49:23.113Z",
               "end":"2021-11-21T20:49:23.125Z",
               "duration":12
            },
            "tests":[
               {
                  "title":"t1",
                  "fullTitle":"t1",
                  "file":null,
                  "duration":1,
                  "currentRetry":0,
                  "speed":"fast",
                  "err":{
                     
                  }
               },
               {
                  "title":"t5",
                  "fullTitle":"t5",
                  "file":null,
                  "duration":0,
                  "currentRetry":0,
                  "speed":"fast",
                  "err":{
                     
                  }
               },
               {
                  "title":"t6",
                  "fullTitle":"t6",
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
              {
                "title":"t1",
                "fullTitle":"t1",
                "file":null,
                "duration":1,
                "currentRetry":0,
                "speed":"fast",
                "err":{
                   
                }
             },
             {
                "title":"t5",
                "fullTitle":"t5",
                "file":null,
                "duration":1,
                "currentRetry":0,
                "speed":"fast",
                "err":{
                   
                }
             }
            ],
            "passes":[
               {
                  "title":"t6",
                  "fullTitle":"t6",
                  "file":null,
                  "duration":1,
                  "currentRetry":0,
                  "speed":"fast",
                  "err":{
                     
                  }
               }
            ]
         }`
            var obj = TestoviParser.porediRezultate(rezultat1, rezultat2);
            assert.equal(obj.promjena, "80%", "4/5 jer (2 + 2)/(2 + 3)");
            assert.equal(obj.greske.length, 4, "gresaka je 4 jer su dvije greske jedinstvene u rezultat1 i dvije ukupno u rezultat2");
            let ocekivanja = ["t2", "t4", "t1", "t5"]
            for (let i = 0; i < 3; i++)
                assert.equal(obj.greske[i], ocekivanja[i], "sortiranje");
        });
        it('rezultat1 i rezultat2 imaju jednu istu i jednu razlicitu gresku', function () {
            var rezultat1 = `{
                "stats":{
                   "suites":3,
                   "tests":3,
                   "passes":1,
                   "pending":0,
                   "failures":2,
                   "start":"2021-11-16T20:24:55.817Z",
                   "end":"2021-11-16T20:24:55.829Z",
                   "duration":12
                },
                "tests":[
                   {
                      "title":"t4",
                      "fullTitle":"t4",
                      "file":null,
                      "duration":1,
                      "currentRetry":0,
                      "speed":"fast",
                      "err":{
                         
                      }
                   },
                   {
                      "title":"t2",
                      "fullTitle":"t2",
                      "file":null,
                      "duration":0,
                      "currentRetry":0,
                      "speed":"fast",
                      "err":{
                         
                      }
                   },
                   {
                      "title":"t3",
                      "fullTitle":"t3",
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
                  {
                    "title":"t4",
                    "fullTitle":"t4",
                    "file":null,
                    "duration":1,
                    "currentRetry":0,
                    "speed":"fast",
                    "err":{
                       
                    }
                 },
                 {
                  "title":"t2",
                  "fullTitle":"t2",
                  "file":null,
                  "duration":1,
                  "currentRetry":0,
                  "speed":"fast",
                  "err":{
                     
                  }
               }
                ],
                "passes":[
                   {
                      "title":"t3",
                      "fullTitle":"t3",
                      "file":null,
                      "duration":1,
                      "currentRetry":0,
                      "speed":"fast",
                      "err":{
                         
                      }
                   }
                ]
             }`
            var rezultat2 = `{
                "stats":{
                   "suites":3,
                   "tests":3,
                   "passes":1,
                   "pending":0,
                   "failures":2,
                   "start":"2021-11-16T20:24:55.817Z",
                   "end":"2021-11-16T20:24:55.829Z",
                   "duration":12
                },
                "tests":[
                   {
                      "title":"t4",
                      "fullTitle":"t4",
                      "file":null,
                      "duration":1,
                      "currentRetry":0,
                      "speed":"fast",
                      "err":{
                         
                      }
                   },
                   {
                      "title":"t5",
                      "fullTitle":"t5",
                      "file":null,
                      "duration":0,
                      "currentRetry":0,
                      "speed":"fast",
                      "err":{
                         
                      }
                   },
                   {
                      "title":"t6",
                      "fullTitle":"t6",
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
                  {
                    "title":"t5",
                    "fullTitle":"t5",
                    "file":null,
                    "duration":1,
                    "currentRetry":0,
                    "speed":"fast",
                    "err":{
                       
                    }
                 },
                 {
                    "title":"t4",
                    "fullTitle":"t4",
                    "file":null,
                    "duration":1,
                    "currentRetry":0,
                    "speed":"fast",
                    "err":{
                       
                    }
                 }
                ],
                "passes":[
                   {
                      "title":"t6",
                      "fullTitle":"t6",
                      "file":null,
                      "duration":1,
                      "currentRetry":0,
                      "speed":"fast",
                      "err":{
                         
                      }
                   }
                ]
             }`
            var obj = TestoviParser.porediRezultate(rezultat1, rezultat2);
            assert.equal(obj.promjena, "75%", "Promjena = 3/4  (1 + 2)/(1 + 3)");
            assert.equal(obj.greske.length, 3, "broj gresaka =  3 jer jedna jedinstvena greska u rezultat1 i dvije u rez2");
            let ocekivanja = ["t2", "t4", "t5"]
            for (let i = 0; i < 3; i++)
                assert.equal(obj.greske[i], ocekivanja[i], "sortiranje");
        });
        it('Sve greske u rezultat1 su u rezultat2', function () {
            var rezultat1 = `{
          "stats":{
             "suites":3,
             "tests":3,
             "passes":1,
             "pending":0,
             "failures":2,
             "start":"2021-11-21T20:49:23.113Z",
               "end":"2021-11-21T20:49:23.125Z",
               "duration":12
          },
          "tests":[
             {
                "title":"t4",
                "fullTitle":"t4",
                "file":null,
                "duration":1,
                "currentRetry":0,
                "speed":"fast",
                "err":{
                   
                }
             },
             {
                "title":"t2",
                "fullTitle":"t2",
                "file":null,
                "duration":0,
                "currentRetry":0,
                "speed":"fast",
                "err":{
                   
                }
             },
             {
                "title":"t3",
                "fullTitle":"t3",
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
            {
              "title":"t4",
              "fullTitle":"t4",
              "file":null,
              "duration":1,
              "currentRetry":0,
              "speed":"fast",
              "err":{
                 
              }
           },
           {
            "title":"t2",
            "fullTitle":"t2",
            "file":null,
            "duration":1,
            "currentRetry":0,
            "speed":"fast",
            "err":{
               
            }
         }
          ],
          "passes":[
             {
                "title":"t3",
                "fullTitle":"t3",
                "file":null,
                "duration":1,
                "currentRetry":0,
                "speed":"fast",
                "err":{
                   
                }
             }
          ]
       }`
            var rezultat2 = `{
          "stats":{
             "suites":3,
             "tests":3,
             "passes":1,
             "pending":0,
             "failures":2,
             "start":"2021-11-21T20:49:23.113Z",
               "end":"2021-11-21T20:49:23.125Z",
               "duration":12
          },
          "tests":[
             {
                "title":"t4",
                "fullTitle":"t4",
                "file":null,
                "duration":1,
                "currentRetry":0,
                "speed":"fast",
                "err":{
                   
                }
             },
             {
                "title":"t2",
                "fullTitle":"t2",
                "file":null,
                "duration":0,
                "currentRetry":0,
                "speed":"fast",
                "err":{
                   
                }
             },
             {
                "title":"t6",
                "fullTitle":"t6",
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
            {
              "title":"t5",
              "fullTitle":"t5",
              "file":null,
              "duration":1,
              "currentRetry":0,
              "speed":"fast",
              "err":{
                 
              }
           },
           {
              "title":"t4",
              "fullTitle":"t4",
              "file":null,
              "duration":1,
              "currentRetry":0,
              "speed":"fast",
              "err":{
                 
              }
           }
          ],
          "passes":[
             {
                "title":"t6",
                "fullTitle":"t6",
                "file":null,
                "duration":1,
                "currentRetry":0,
                "speed":"fast",
                "err":{
                   
                }
             }
          ]
       }`
            var obj = TestoviParser.porediRezultate(rezultat1, rezultat2);
            assert.equal(obj.promjena, "66.7%", "Promjena = 2/3 (0 + 2)/(0 + 3)");
            assert.equal(obj.greske.length, 2, "broj gresaka = 2 jer 0 jedinstvenih gresaka u rezultat11 + 2 u rezultat2");
            let ocekivanja = ["t4", "t5"]
            for (let i = 0; i < 2; i++)
                assert.equal(obj.greske[i], ocekivanja[i], "sortiranje");
        });
        it('Sve greske u rezultat1 su u rezultat2, a svi u rezultat2 prolaze', function () {
            var rezultat1 = `{
        "stats":{
           "suites":3,
           "tests":3,
           "passes":1,
           "pending":0,
           "failures":2,
           "start":"2021-11-21T20:49:23.113Z",
           "end":"2021-11-21T20:49:23.125Z",
           "duration":12
        },
        "tests":[
           {
              "title":"t4",
              "fullTitle":"t4",
              "file":null,
              "duration":1,
              "currentRetry":0,
              "speed":"fast",
              "err":{
                 
              }
           },
           {
              "title":"t2",
              "fullTitle":"t2",
              "file":null,
              "duration":0,
              "currentRetry":0,
              "speed":"fast",
              "err":{
                 
              }
           },
           {
              "title":"t3",
              "fullTitle":"t3",
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
          {
            "title":"t4",
            "fullTitle":"t4",
            "file":null,
            "duration":1,
            "currentRetry":0,
            "speed":"fast",
            "err":{
               
            }
         },
         {
          "title":"t2",
          "fullTitle":"t2",
          "file":null,
          "duration":1,
          "currentRetry":0,
          "speed":"fast",
          "err":{
             
          }
       }
        ],
        "passes":[
           {
              "title":"t3",
              "fullTitle":"t3",
              "file":null,
              "duration":1,
              "currentRetry":0,
              "speed":"fast",
              "err":{
                 
              }
           }
        ]
     }`
            var rezultat2 = `{
        "stats":{
           "suites":3,
           "tests":3,
           "passes":3,
           "pending":0,
           "failures":0,
           "start":"2021-11-16T20:24:55.817Z",
           "end":"2021-11-16T20:24:55.829Z",
           "duration":12
        },
        "tests":[
           {
              "title":"t4",
              "fullTitle":"t4",
              "file":null,
              "duration":1,
              "currentRetry":0,
              "speed":"fast",
              "err":{
                 
              }
           },
           {
              "title":"t2",
              "fullTitle":"t2",
              "file":null,
              "duration":0,
              "currentRetry":0,
              "speed":"fast",
              "err":{
                 
              }
           },
           {
              "title":"t6",
              "fullTitle":"t6",
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
              "title":"t6",
              "fullTitle":"t6",
              "file":null,
              "duration":1,
              "currentRetry":0,
              "speed":"fast",
              "err":{
                 
              }
           },
           {
            "title":"t5",
            "fullTitle":"t5",
            "file":null,
            "duration":1,
            "currentRetry":0,
            "speed":"fast",
            "err":{
               
            }
         },
         {
            "title":"t4",
            "fullTitle":"t4",
            "file":null,
            "duration":1,
            "currentRetry":0,
            "speed":"fast",
            "err":{
               
            }
         }
        ]
     }`
            var obj = TestoviParser.porediRezultate(rezultat1, rezultat2);
            assert.equal(obj.promjena, "0%", "Promjena = 0 (0 + 0)/(0 + 3)");
            assert.equal(obj.greske.length, 0, "broj gresaka = 0 jer imamo ejdinstvenih 0 gresaka u rezultat1 + 0 u rezultat2");
        });


    });
});