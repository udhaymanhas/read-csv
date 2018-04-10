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
  // var monthIndex = months.indexOf(month);
  // var previousMonth = months[monthIndex-1];
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
  readCsv();
  return month;
}

module.exports = {
  getLost,
  getGained,
  getDivision
}
