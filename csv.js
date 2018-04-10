const months = ['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov', 'dec'];

const request = require('request');
const fs = require("fs");
const csv = require("fast-csv");
const fileName = 'data.csv';

var fetchCsv = () => {
  var file = fs.createWriteStream(fileName);
  var meta = JSON.parse(fs.readFileSync('url.json'));

  return new Promise((resolve, reject) => {
    request(meta.url, (err, res, body) => {
      if(err){
        reject('Eror Fetching From URL');
      }
    }).pipe(file);

    file.on("finish", () => { resolve(true) });
    file.on("error", (e) => {reject({msg:'Error writing the fetched file',err:e})});
  });
}

var readCsv = (processData, end) => {
  fetchCsv()
  .then((res)=>{
    if(res){
      var stream = fs.createReadStream(fileName);
      csv
       .fromStream(stream, {headers : true,headers : ["email", "division", "duration", "start", "end"]})
       .on("data", processData)
       .on("end", end);
    }
  })
  .catch((e) => {
    console.log(e);
  });


}

var getLost = (month) => {
  var currentMonth = month;
  var totalEnded = 0;

  return new Promise((resolve, reject) => {
    var processData = (data) => {
      if(data.end.toLowerCase().includes(currentMonth)){
        totalEnded++ //started this month
      }
    };

    var end = (data) => {
      resolve(totalEnded)
    };

    readCsv(processData, end); // read cv and process data according to defined here
  });
}

var getGained = (month) => {
  var currentMonth = month;
  var totalStarted = 0;

  return new Promise((resolve, reject) => {
    var processData = (data) => {
      if(data.start.toLowerCase().includes(currentMonth)){
        totalStarted++ //started this month
      }
    };

    var end = (data) => {
      resolve(totalStarted)
    };

    readCsv(processData, end); // read cv and process data according to defined here
  });
}

var getDivision = (month, division) => {
  var currentMonth = month.toLowerCase();
  var currentDivision = division.toLowerCase();
  var activeSubscribers = 0;

  return new Promise((resolve, reject) => {
    var processData = (data) => {
      if(data.division.toLowerCase() == currentDivision){
        //find if the subs is active or not.
        var subStartMonth = data.start.toLowerCase().split('/')[1];
        var subEndMonth = data.end.toLowerCase().split('/')[1];

        if((months.indexOf(subStartMonth) <= months.indexOf(currentMonth)) && (months.indexOf(subEndMonth) >= months.indexOf(currentMonth))){
          activeSubscribers++;
        }
      }
    };

    var end = (data) => {
      resolve(activeSubscribers)
    };

    readCsv(processData, end); // read cv and process data according to defined here
  });
}

module.exports = {
  getLost,
  getGained,
  getDivision
}
