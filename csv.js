const months = ['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov', 'dec'];

var fs = require("fs");
var csv = require("fast-csv");

var readCsv = (processData, end) => {
  var stream = fs.createReadStream("test.csv");
  csv
   .fromStream(stream, {headers : true,headers : ["email", "division", "duration", "start", "end"]})
   .on("data", processData)
   .on("end", end);
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
