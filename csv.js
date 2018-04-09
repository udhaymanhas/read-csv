var fs = require("fs");
var csv = require("fast-csv");

var readCsv = () => {

  var stream = fs.createReadStream("test.csv");

  csv
   .fromStream(stream, {headers : ["email", "division", "duration", "start", "end"]})
   .on("data", function(data){
       console.log('Process=====================>\n',data);
   })
   .on("end", function(){
       console.log("done");
   });
}

var getLost = (month) => {
  readCsv();
  return month;
}
var getGained = (month) => {
  readCsv();
  return month;
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
