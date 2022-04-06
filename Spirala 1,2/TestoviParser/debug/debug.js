var rez1 = `{
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
          "title":"test4",
          "fullTitle":"test4",
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
        "title":"test4",
        "fullTitle":"test4",
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
   }
    ],
    "passes":[
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
      var rez2 = `{
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
          "title":"test4",
          "fullTitle":"test4",
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
          "title":"test6",
          "fullTitle":"test6",
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
        "title":"test5",
        "fullTitle":"test5",
        "file":null,
        "duration":1,
        "currentRetry":0,
        "speed":"fast",
        "err":{
           
        }
     },
     {
        "title":"test4",
        "fullTitle":"test4",
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
          "title":"test6",
          "fullTitle":"test6",
          "file":null,
          "duration":1,
          "currentRetry":0,
          "speed":"fast",
          "err":{
             
          }
       }
    ]
 }`
      var x = JSON.parse(rez1);

console.log(x.hasOwnProperty('stats'));